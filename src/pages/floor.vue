<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import AddEditFloorDialog from '@/components/dialogs/AddEditFloorDialog.vue'
import { ref, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const widgetData = ref([
  {
    title: 'Building',
    value: '54',
    icon: 'tabler-building-skyscraper',
  },
  {
    title: 'Floor',
    value: '5',
    icon: 'tabler-database',
  },
  {
    title: 'Unit',
    value: '12',
    icon: 'tabler-building-community',
  },
  {
    title: 'Area',
    value: '12',
    icon: 'tabler-map-pin',
  },
])

const headers = [
  { title: 'Code', key: 'code' },
  { title: 'Name', key: 'name' },
  { title: 'Building', key: 'building' },
  { title: 'View', key: 'view', width: '30' },
  { title: 'Actions', key: 'actions', sortable: false, width: '100', align: 'end' },
]

const buildings = [
  'Foo',
  'Bar',
  'Fizz',
  'Buzz',
]

const searchQuery = ref('')

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const isAddEditFloorDialogVisible = ref(false)

// Mock data for the data table
const allFloors = ref([
  {
    id: 1,
    code: 'VIC-01',
    name: 'Floor 1',
    building: 'Tower Victoria',
    view: avatar1,
  },
  {
    id: 2,
    code: 'LEO-02',
    name: 'Floor 2',
    building: 'Tower Leonida',
    view: avatar2,
  },

  // Add more mock data as needed
])

const floors = ref([])
const totalFloor = ref(allFloors.value.length)

const fetchFloors = () => {
  const start = (page.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value

  floors.value = allFloors.value.slice(start, end)
}

const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
  fetchFloors()
}

watch([page, itemsPerPage], fetchFloors, { immediate: true })

const deleteFloor = id => {
  const index = allFloors.value.findIndex(floor => floor.id === id)
  if (index !== -1) {
    allFloors.value.splice(index, 1)
    totalFloor.value = allFloors.value.length
    fetchFloors()
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
          Floor
        </h4>
        <p>
          A useful tool for managing actor management.
        </p>
      </VCol>
    </VRow>
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
              md="3"
              class="px-6"
            >
              <div
                class="d-flex justify-space-between"
                :class="$vuetify.display.xs ? 'floor-widget' : $vuetify.display.sm ? id < 2 ? 'floor-widget' : '' : ''"
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
    <VCard
      title="Filters"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <!-- Select Building -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              :items="buildings"
              :menu-props="{ transition: 'scroll-y-transition' }"
              label="Selected Building"
              placeholder="Select Building"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VDivider class="my-4" />
      <!-- floors -->
      <VCard>
        <div class="d-flex flex-wrap gap-4 mx-5">
          <div class="d-flex align-center">
            <!-- Search -->
            <AppTextField
              v-model="searchQuery"
              placeholder="Search floor"
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
              prepend-icon="tabler-download"
              @click="isAddEditFloorDialogVisible = true"
            >
              Export
            </VBtn>
            <VBtn
              color="primary"
              prepend-icon="tabler-upload"
              @click="isAddEditFloorDialogVisible = true"
            >
              Import
            </VBtn>
            <VBtn
              color="primary"
              prepend-icon="tabler-plus"
              @click="isAddEditFloorDialogVisible = true"
            >
              Add floor
            </VBtn>
          </div>
        </div>
        <VDivider class="mt-4" />

        <!-- Datatable -->
        <VDataTableServer
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :headers="headers"
          :items="floors"
          :items-length="totalFloor"
          class="text-no-wrap"
          @update:options="updateOptions"
        >
          <!-- Code -->
          <template #item.code="{ item }">
            {{ item.code }}
          </template>
          <!-- Name -->
          <template #item.name="{ item }">
            {{ item.name }}
          </template>
          <!-- Building -->
          <template #item.building="{ item }">
            {{ item.building }}
          </template>
          <!-- View -->
          <template #item.view="{ item }">
            <div class="d-flex align-center gap-x-2">
              <img
                :src="item.view"
                alt="View"
                style="border-radius: 10%; block-size: 36px; inline-size: 55px; object-fit: cover;"
                class="me-3"
              >
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
                    @click="deleteFloor(item.id)"
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
                {{ paginationMeta({ page, itemsPerPage }, totalFloor) }}
              </p>
              <VPagination
                v-model="page"
                :length="Math.ceil(totalFloor / itemsPerPage)"
                :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalFloor / itemsPerPage), 5)"
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
    </VCard>
    <AddEditFloorDialog v-model:is-dialog-visible="isAddEditFloorDialogVisible" />
  </div>
</template>

<style lang="scss" scoped>
.floor-widget {
  border-block-end: 1px solid rgba(var(--v-theme-on-surface), var(--v-border-opacity));
  padding-block-end: 1rem;
}
</style>
