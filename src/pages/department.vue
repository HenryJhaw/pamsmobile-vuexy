<script setup>
import AddEditDepartmentDialog from '@/components/dialogs/AddEditDepartmentDialog.vue'
import { ref, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const headers = [
  {
    title: '',
    key: 'data-table-expand',
    width: '5',
  },
  {
    title: 'Identity',
    key: 'identity',
    width: '15',
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Categories',
    key: 'category',
    width: '80',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
    align: 'end',
  },
]

// category options
const selectedDepartment = ref()
const searchQuery = ref('')
const selectedStatus = ref()

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()
const isAddEditActorDialogVisible = ref(false)

const allDepartments = ref([
  {
    id: 1,
    identity: 'FIN',
    name: 'Finance and Accounting',
    category: '3 category',
  },
  {
    id: 2,
    identity: 'SEC',
    name: 'Security',
    category: '3 category',

  },

  // Add more mock data as needed
])

const departments = ref([])
const totalDepartment = ref(allDepartments.value.length)

const fetchDepartments = () => {
  const start = (page.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value

  departments.value = allDepartments.value.slice(start, end)
}

const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
  fetchDepartments()
}

watch([page, itemsPerPage], fetchDepartments, { immediate: true })

const deleteDepartment = id => {
  const index = allDepartments.value.findIndex(doc => doc.id === id)
  if (index !== -1) {
    allDepartments.value.splice(index, 1)
    totalDepartment.value = allDepartments.value.length
    fetchDepartments()
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
          Departments
        </h4>
        <p>
          A useful tool for managing departments management.
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
            placeholder="Search Occupant"
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
            @click="isAddEditActorDialogVisible = true"
          >
            Add Department
          </VBtn>
        </div>
      </div>
      <VDivider class="mt-4" />
      
      <!-- // 👉 (Table) -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        :items="departments"
        :items-length="totalDepartment"
        expand-on-click
        @update:options="updateOptions"
      >
        <!-- Expanded Row Data -->
        <template #expanded-row="slotProps">
          <tr class="v-data-table__tr">
            <td :colspan="headers.length">
              <div class="d-flex flex-wrap">
                <VChip class="mx-1 my-1">
                  Unit 1 {{ slotProps.item.city }}
                </VChip>
                <VChip class="mx-1 my-1">
                  Unit 2 {{ slotProps.item.experience }}
                </VChip>
                <VChip class="mx-1 my-1">
                  Unit 3 {{ slotProps.item.post }}
                </VChip>
              </div>
            </td>
          </tr>
        </template>
        
        <!-- Role -->
        <template #item.identity="{ item }">
          {{ item.identity }}
        </template>
        <!-- Role -->
        <template #item.name="{ item }">
          {{ item.name }}
        </template>
        <!-- Role -->
        <template #item.categories="{ item }">
          {{ item.categories }}
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
                  @click="deleteDepartment(item.id)"
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
              {{ paginationMeta({ page, itemsPerPage }, totalDepartment) }}
            </p>
            
            <VPagination
              v-model="page"
              :length="Math.ceil(totalDepartment / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalDepartment / itemsPerPage), 5)"
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
  <AddEditDepartmentDialog v-model:is-dialog-visible="isAddEditActorDialogVisible" />
</template>
