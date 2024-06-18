<script setup>
import AddEditDocumentDialog from '@/components/dialogs/AddEditDocumentDialog.vue'
import { ref } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const widgetData = ref([
  {
    title: 'Gallery',
    value: '54',
    icon: 'tabler-photo',
  },
  {
    title: 'Document',
    value: '5',
    icon: 'tabler-files',
  },
  {
    title: 'Article',
    value: '12',
    icon: 'tabler-file-text',
  },
])

const headers = [
  {
    title: 'Title',
    key: 'title',
  },
  {
    title: 'Category',
    key: 'category',
  },
  {
    title: 'Since',
    key: 'since',
  },
  {
    title: 'Until',
    key: 'until',
  },
  {
    title: 'Attachment',
    key: 'attachment',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const selectedCategory = ref()
const searchQuery = ref('')

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const isAddDocumentDialogVisible = ref(false)

// Mock data for the data table
const documents = ref([
  {
    id: 1,
    title: 'Document 1',
    category: 'Category 1',
    since: '2023-01-01',
    until: '2023-12-31',
    attachment: '10 Attachment',
  },
  {
    id: 2,
    title: 'Document 2',
    category: 'Category 2',
    since: '2023-02-01',
    until: '2023-11-30',
    attachment: '2 Attachment',
  },
  {
    id: 3,
    title: 'Document 3',
    category: 'Category 1',
    since: '2023-01-01',
    until: '2023-12-31',
    attachment: '10 Attachment',
  },
  {
    id: 4,
    title: 'Document 4',
    category: 'Category 2',
    since: '2023-02-01',
    until: '2023-11-30',
    attachment: '2 Attachment',
  },
  {
    id: 5,
    title: 'Document 5',
    category: 'Category 1',
    since: '2023-01-01',
    until: '2023-12-31',
    attachment: '10 Attachment',
  },
  {
    id: 6,
    title: 'Document 6',
    category: 'Category 2',
    since: '2023-02-01',
    until: '2023-11-30',
    attachment: '2 Attachment',
  },
  {
    id: 7,
    title: 'Document 7',
    category: 'Category 1',
    since: '2023-01-01',
    until: '2023-12-31',
    attachment: '10 Attachment',
  },
  {
    id: 8,
    title: 'Document 8',
    category: 'Category 2',
    since: '2023-02-01',
    until: '2023-11-30',
    attachment: '2 Attachment',
  },
  {
    id: 9,
    title: 'Document 9',
    category: 'Category 1',
    since: '2023-01-01',
    until: '2023-12-31',
    attachment: '10 Attachment',
  },
  {
    id: 10,
    title: 'Document 10',
    category: 'Category 2',
    since: '2023-02-01',
    until: '2023-11-30',
    attachment: '2 Attachment',
  },
  {
    id: 11,
    title: 'Document 11',
    category: 'Category 1',
    since: '2023-01-01',
    until: '2023-12-31',
    attachment: '10 Attachment',
  },
  {
    id: 12,
    title: 'Document 12',
    category: 'Category 2',
    since: '2023-02-01',
    until: '2023-11-30',
    attachment: '2 Attachment',
  },

  // Add more mock data as needed
])

const totalDocument = ref(documents.value.length)

const updateOptions = options => {
  // Handle options update logic here
}
</script>

<template>
  <div>
    <!-- Widgets -->
    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <template
            v-for="(data, id) in widgetData"
            :key="id"
          >
            <VCol
              cols="12"
              sm="6"
              md="4"
              class="px-6"
            >
              <div
                class="d-flex justify-space-between"
                :class="$vuetify.display.xs ? 'document-widget' : $vuetify.display.sm ? id < 2 ? 'document-widget' : '' : ''"
              >
                <div class="d-flex flex-column gap-y-1">
                  <div class="text-body-1 font-weight-medium text-capitalize">
                    {{ data.title }}
                  </div>
                  <h4 class="text-h4 my-1">
                    {{ data.value }}
                  </h4>
                  <div class="d-flex">
                    <div class="me-2 text-disabled text-no-wrap">
                      {{ data.desc }}
                    </div>
                    <VChip
                      v-if="data.change"
                      label
                      :color="data.change > 0 ? 'success' : 'error'"
                    >
                      {{ prefixWithPlus(data.change) }}%
                    </VChip>
                  </div>
                </div>
                <VAvatar
                  variant="tonal"
                  rounded
                  size="38"
                >
                  <VIcon
                    :icon="data.icon"
                    size="28"
                  />
                </VAvatar>
              </div>
            </VCol>
            <VDivider
              v-if="$vuetify.display.mdAndUp ? id !== widgetData.length - 1 : $vuetify.display.smAndUp ? id % 2 === 0 : false"
              vertical
              inset
              length="95"
            />
          </template>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Documents -->
    <VCard
      title="Filters"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <!-- Select Category -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedCategory"
              placeholder="Select Category"
              :items="categories"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VDivider class="my-4" />
      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="d-flex align-center">
          <!-- Search -->
          <AppTextField
            v-model="searchQuery"
            placeholder="Search Document"
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
            @click="isAddDocumentDialogVisible = true"
          >
            Add Document
          </VBtn>
        </div>
      </div>
      <VDivider class="mt-4" />

      <!-- Datatable -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        show-select
        :items="documents"
        :items-length="totalDocument"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- Title -->
        <template #item.title="{ item }">
          {{ item.title }}
        </template>
        <!-- Category -->
        <template #item.category="{ item }">
          {{ item.category }}
        </template>
        <!-- Since -->
        <template #item.since="{ item }">
          {{ new Date(item.since).toDateString() }}
        </template>
        <!-- Until -->
        <template #item.until="{ item }">
          {{ new Date(item.until).toDateString() }}
        </template>
        <!-- Attachment -->
        <template #item.attachment="{ item }">
          <span class="text-body-1 font-weight-medium text-high-emphasis">{{ item.attachment }}</span>
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
                  @click="deleteDocument(item.id)"
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
            <VPagination
              v-model="page"
              :length="Math.min(Math.ceil(totalDocument / itemsPerPage), 5)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalDocument / itemsPerPage), 5)"
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
    <AddEditDocumentDialog v-model:is-dialog-visible="isAddDocumentDialogVisible" />
  </div>
</template>

<style lang="scss" scoped>
.document-widget {
  border-block-end: 1px solid rgba(var(--v-theme-on-surface), var(--v-border-opacity));
  padding-block-end: 1rem;
}
</style>
