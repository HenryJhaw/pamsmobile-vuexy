<script setup>
import AddEditGalleryDialog from '@/components/dialogs/AddEditGalleryDialog.vue'
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
    title: 'Descriptions',
    key: 'descriptions',
  },
  {
    title: 'Filename',
    key: 'filename',
  },
  {
    title: 'Gallery',
    key: 'gallery',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const searchQuery = ref('')

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const isAddGalleryDialogVisible = ref(false)

// Mock data for the data table
const galleries = ref([
  {
    id: 1,
    descriptions: 'Beautiful landscape',
    filename: 'landscape.jpg',
    gallery: 'Nature',
  },
  {
    id: 2,
    descriptions: 'City skyline',
    filename: 'city.jpg',
    gallery: 'Urban',
  },

  // Add more mock data as needed
])

const totalGallery = ref(galleries.value.length)

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
                :class="$vuetify.display.xs ? 'gallery-widget' : $vuetify.display.sm ? id < 2 ? 'gallery-widget' : '' : ''"
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

    <!-- Galleries -->
    <VCard>
      <VCardText />
      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="d-flex align-center">
          <!-- Search -->
          <AppTextField
            v-model="searchQuery"
            placeholder="Search Gallery"
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
            @click="isAddGalleryDialogVisible = true"
          >
            Add Gallery
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
        :items="galleries"
        :items-length="totalGallery"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- Descriptions -->
        <template #item.descriptions="{ item }">
          {{ item.descriptions }}
        </template>
        <!-- Filename -->
        <template #item.filename="{ item }">
          {{ item.filename }}
        </template>
        <!-- Gallery -->
        <template #item.gallery="{ item }">
          <div class="d-flex align-center gap-x-2">
            <VAvatar
              v-if="item.image"
              size="38"
              variant="tonal"
              rounded
              :image="item.image"
            />
          </div>
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
                  @click="deleteGallery(item.id)"
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
              :length="Math.min(Math.ceil(totalGallery / itemsPerPage), 5)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalGallery / itemsPerPage), 5)"
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
    <AddEditGalleryDialog v-model:is-dialog-visible="isAddGalleryDialogVisible" />
  </div>
</template>

<style lang="scss" scoped>
.gallery-widget {
  border-block-end: 1px solid rgba(var(--v-theme-on-surface), var(--v-border-opacity));
  padding-block-end: 1rem;
}
</style>
