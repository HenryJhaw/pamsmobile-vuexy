<script setup>
import AddEditSequenceDialog from '@/components/dialogs/AddEditSequenceDialog.vue'
import { ref, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const headers = [
  {
    title: '',
    key: 'data-table-expand',
    width: '10',
  },
  {
    title: 'Sequence',
    key: 'sequence',
  },
  {
    title: 'Category',
    key: 'category',
  },
  {
    title: 'Feature',
    key: 'feature',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
    align: 'end',
  },
]

// feature options
const searchQuery = ref('')

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()
const isAddEditSequenceDialogVisible = ref(false)

const allSequences = ref([
  {
    id: 1,
    sequence: 'Owner Keluar Barang',
    category: 'Permit',
    feature: 'Moving Out',
    register: 'ANY: Register',
    accepted: 'TRO: Accepted',
    approved: 'PMO: Approved',
  },
  {
    id: 2,
    sequence: 'Owner Masuk Barang',
    category: 'Permit',
    feature: 'Moving In',
    register: 'ANY: Register',
    accepted: 'TRO: Accepted',
    approved: 'PMO: Approved',
  },

  // Add more mock data as needed
])

const sequences = ref([])
const totalSequence = ref(allSequences.value.length)

const fetchSequences = () => {
  const start = (page.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value

  sequences.value = allSequences.value.slice(start, end)
}

const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
  fetchSequences()
}

watch([page, itemsPerPage], fetchSequences, { immediate: true })

const deleteSequence = id => {
  const index = allSequences.value.findIndex(doc => doc.id === id)
  if (index !== -1) {
    allSequences.value.splice(index, 1)
    totalSequence.value = allSequences.value.length
    fetchSequences()
  }
}

// Define the paginationMeta function
const paginationMeta = (pagination, totalItems) => {
  const { page, itemsPerPage } = pagination
  const start = itemsPerPage * (page - 1) + 1
  const end = Math.min(itemsPerPage * page, totalItems)
  
  return `Showing ${start} to ${end} of ${totalItems} entries`
}
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <h4 class="text-h4">
          Sequence
        </h4>
        <p>
          A useful tool for managing sequences management.
        </p>
      </VCol>
    </VRow>
    
    <!-- Filters -->
    <VCard
      title="Filters"
      class="mb-6"
    >
      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="d-flex align-center">
          <!-- Search -->
          <AppTextField
            v-model="searchQuery"
            placeholder="Search Sequence"
            density="compact"
            style="inline-size: 200px;"
            class="me-3"
          />
        </div>
        <VSpacer />
        <div class="d-flex gap-4 flex-wrap align-center">
          <AppSelect
            v-model="itemsPerPage"
            :items="[5, 10, 20, 25, 50]"
          />
          <VBtn
            color="primary"
            prepend-icon="tabler-plus"
            @click="isAddEditSequenceDialogVisible = true"
          >
            Add Sequence
          </VBtn>
        </div>
      </div>
      <VDivider class="mt-4" />
      
      <!-- // 👉 (Table) -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        :items="sequences"
        :items-length="totalSequence"
        expand-on-click
        @update:options="updateOptions"
      >
        <!-- Expanded Row Data -->
        <template #expanded-row="slotProps">
          <tr class="v-data-table__tr">
            <td :colspan="headers.length">
              <div class="d-flex flex-wrap align-center">
                <VChip
                  class="mx-1 my-1"
                  color="info"
                >
                  {{ slotProps.item.register }}
                </VChip>
                <VIcon
                  icon="tabler-arrow-right"
                  class="mx-1"
                />
                <VChip
                  class="mx-1 my-1"
                  color="warning"
                >
                  {{ slotProps.item.accepted }}
                </VChip>
                <VIcon
                  icon="tabler-arrow-right"
                  class="mx-1"
                />
                <VChip
                  class="mx-1 my-1"
                  color="success"
                >
                  {{ slotProps.item.approved }}
                </VChip>
              </div>
            </td>
          </tr>
        </template>
        
        <!-- Role -->
        <template #item.sequence="{ item }">
          {{ item.sequence }}
        </template>
        <!-- Role -->
        <template #item.category="{ item }">
          {{ item.category }}
        </template>
        <!-- Role -->
        <template #item.feature="{ item }">
          {{ item.feature }}
        </template>
        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn>
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn>
            <VIcon icon="tabler-dots-vertical" />
            <VMenu activator="parent">
              <VList>
                <VListItem
                  value="delete"
                  prepend-icon="tabler-trash"
                  @click="deleteSequence(item.id)"
                >
                  Delete
                </VListItem>
              </VList>
            </VMenu>
          </IconBtn>
        </template>

        <template #bottom>
          <VDivider />
          
          <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-medium-emphasis mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalSequence) }}
            </p>
            
            <VPagination
              v-model="page"
              :length="Math.ceil(totalSequence / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalSequence / itemsPerPage), 5)"
            >
              <template #prev="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Previous
                </VBtn>
              </template>
              <template #next="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Next
                </VBtn>
              </template>
            </VPagination>
          </div>
        </template>
      </VDataTableServer>
    </VCard>
  </div>
  <AddEditSequenceDialog v-model:is-dialog-visible="isAddEditSequenceDialogVisible" />
</template>
