
<script setup>
import AddEditDocumentDialog from '@/components/dialogs/AddEditDocumentDialog.vue'

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
    key: 'product',
  },
  {
    title: 'Category',
    key: 'category',
  },

  // {
  //   title: 'Stock',
  //   key: 'stock',
  //   sortable: false,
  // },
  {
    title: 'Since',
    key: 'sku',
  },
  {
    title: 'Until',
    key: 'price',
  },
  {
    title: 'Attachment',
    key: 'qty',
  },

  // {
  //   title: 'Status',
  //   key: 'status',
  // },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

// const selectedStatus = ref()
const selectedCategory = ref()

// const selectedStock = ref()
// const searchQuery = ref('')

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const isAddDocumentDialogVisible = ref(false)
</script>


<template>
  <div>
    <!-- 👉 widgets -->
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
              md="3"
              class="px-6"
            >
              <div
                class="d-flex justify-space-between"
                :class="$vuetify.display.xs
                  ? 'product-widget'
                  : $vuetify.display.sm
                    ? id < 2 ? 'product-widget' : ''
                    : ''"
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
              v-if="$vuetify.display.mdAndUp ? id !== widgetData.length - 1
                : $vuetify.display.smAndUp ? id % 2 === 0
                  : false"
              vertical
              inset
              length="95"
            />
          </template>
        </VRow>
      </VCardText>
    </VCard>

    <!-- 👉 products -->
    <VCard
      title="Filters"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <!-- 👉 Select Status -->
          <!--
            <VCol
            cols="12"
            sm="4"
            >
            <AppSelect
            v-model="selectedStatus"
            placeholder="Select Category"
            :items="status"
            clearable
            clear-icon="tabler-x"
            />
            </VCol> 
          -->

          <!-- 👉 Select Category -->
          
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
         

          <!-- 👉 Select Stock Status -->
          <!--
            <VCol
            cols="12"
            sm="4"
            >
            <AppSelect
            v-model="selectedStock"
            placeholder="Stock"
            :items="stockStatus"
            clearable
            clear-icon="tabler-x"
            />
            </VCol> 
          -->
        </VRow>
      </VCardText>
      <VDivider class="my-4" />

      <div class="d-flex flex-wrap gap-4 mx-5">
        <div class="d-flex align-center">
          <!-- 👉 Search  -->
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
          <!-- 👉 Export button -->
          <!--
            <VBtn
            variant="tonal"
            color="secondary"
            prepend-icon="tabler-upload"
            >
            Export
            </VBtn> 
          -->

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

      <!-- 👉 Datatable  -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        show-select
        :items="products"
        :items-length="totalProduct"
        class="text-no-wrap"
        @update:options="updateOptions"
      />
      <template #item.product="{ item }">
        <div class="d-flex align-center gap-x-2">
          <!--
            <VAvatar
            v-if="item.image"
            size="38"
            variant="tonal"
            rounded
            :image="item.image"
            /> 
          -->
          <div class="d-flex flex-column">
            <span class="text-body-1 font-weight-medium">{{ item.productName }}</span>
            <span class="text-sm text-disabled">{{ item.productBrand }}</span>
          </div>
        </div>
      </template>
    </VCard>
    <AddEditDocumentDialog v-model:is-dialog-visible="isAddDocumentDialogVisible" />
  </div>
</template>
