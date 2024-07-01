<script setup>
import AddEditCategoryDialog from '@/components/dialogs/AddEditCategoryDialog.vue'
import { ref, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const headers = [
  { title: 'Identity', key: 'identity', width: '30' },
  { title: 'Subject', key: 'subject' },
  { title: 'Name', key: 'name' },
  { title: 'Actions', key: 'actions', sortable: false, width: '70', align: 'end' },
]

const searchQuery = ref('')

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const isAddEditCategoryDialogVisible = ref(false)

// Mock data for the data table
const allCategories = ref([
  {
    id: 1,
    identity: '20231212.003',
    subject: 'Event',
    name: 'Article',
  },
  {
    id: 2,
    identity: '20231212.001',
    subject: 'Document',
    name: 'Rules & Regulation',
  },

  // Add more mock data as needed
])

const categories = ref([])
const totalCategory = ref(allCategories.value.length)

const fetchCategories = () => {
  const start = (page.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value

  categories.value = allCategories.value.slice(start, end)
}

const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
  fetchCategories()
}

watch([page, itemsPerPage], fetchCategories, { immediate: true })

const deleteCategory = id => {
  const index = allCategories.value.findIndex(actor => actor.id === id)
  if (index !== -1) {
    allCategories.value.splice(index, 1)
    totalCategory.value = allCategories.value.length
    fetchCategories()
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
          Category
        </h4>
        <p>
          A useful tool for managing actor management.
        </p>
      </VCol>
    </VRow>
    <!-- categories -->
    <VCard>
      <VCardText />
      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="d-flex align-center">
          <!-- Search -->
          <AppTextField
            v-model="searchQuery"
            placeholder="Search Actor"
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
            @click="isAddEditCategoryDialogVisible = true"
          >
            Add Category
          </VBtn>
        </div>
      </div>
      <VDivider class="mt-4" />

      <!-- Datatable -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        :items="categories"
        :items-length="totalCategory"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- Code -->
        <template #item.identity="{ item }">
          {{ item.identity }}
        </template>
        <!-- Name -->
        <template #item.subject="{ item }">
          {{ item.subject }}
        </template>
        <!-- Name -->
        <template #item.name="{ item }">
          {{ item.name }}
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
                  @click="deleteCategory(item.id)"
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
              {{ paginationMeta({ page, itemsPerPage }, totalCategory) }}
            </p>
            <VPagination
              v-model="page"
              :length="Math.ceil(totalCategory / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalCategory / itemsPerPage), 5)"
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
    <AddEditCategoryDialog v-model:is-dialog-visible="isAddEditCategoryDialogVisible" />
  </div>
</template>
