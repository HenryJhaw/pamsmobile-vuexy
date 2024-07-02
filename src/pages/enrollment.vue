<script setup>
import EditEnrollmentDialog from '@/components/dialogs/EditEnrollmentDialog.vue'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import { ref, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const widgetData = ref([
  {
    title: 'All Enrollment',
    value: '54',
    icon: 'tabler-user',
    iconColor: 'info',
  },
  {
    title: 'Registered Enrollment',
    value: '5',
    icon: 'tabler-user-plus',
    iconColor: 'gray',
  },
  {
    title: 'Accepted Enrollment',
    value: '12',
    icon: 'tabler-user-exclamation',
    iconColor: 'warning',
  },
  {
    title: 'Approved Enrollment',
    value: '54',
    icon: 'tabler-user-check',
    iconColor: 'success',
  },
])

const headers = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Phone',
    key: 'phone',
  },
  {
    title: 'Activity',
    key: 'activity',
    width: '5',
  },
  {
    title: 'Updated at',
    key: 'updated',
    width: '5',
  },
  {
    title: 'Card',
    key: 'card',
    sortable: false,
    width: '5',
  },
  {
    title: 'Face',
    key: 'face',
    sortable: false,
    width: '5',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
    width: '5',
    align: 'end',
  },
]

// category options
const selectedActivity = ref()
const searchQuery = ref('')
const selectedStatus = ref()

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const isEditEnrollmentDialogVisible = ref(false)

const allEnrollments = ref([
  {
    id: 1,
    name: 'name 1',
    email: 'user1@email.com',
    phone: '081234567891',
    activity: 'Register',
    updated: '2023-01-01',
    card: avatar1,
    face: avatar1,
  },
  {
    id: 2,
    name: 'name 2',
    email: 'user2@email.com',
    phone: '081234567891',
    activity: 'Active',
    updated: '2023-01-01',
    card: avatar2,
    face: avatar2,
  },

  // Add more mock data as needed
])

const activity = [
  'Foo',
  'Bar',
  'Fizz',
  'Buzz',
]

const enrollments = ref([])
const totalEnrollment = ref(allEnrollments.value.length)

const fetchEnrollments = () => {
  const start = (page.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value

  enrollments.value = allEnrollments.value.slice(start, end)
}

const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
  fetchEnrollments()
}

watch([page, itemsPerPage], fetchEnrollments, { immediate: true })

const deleteEnrollment = id => {
  const index = allEnrollments.value.findIndex(doc => doc.id === id)
  if (index !== -1) {
    allEnrollments.value.splice(index, 1)
    totalEnrollment.value = allEnrollments.value.length
    fetchEnrollments()
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
          Enrollment
        </h4>
        <p>
          A useful tool for managing occupants enrollment.
        </p>
      </VCol>
    </VRow>
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
                  :color="data.iconColor"
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
    
    <!-- Select Category -->
    <VCard
      title="Filters"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedActivity"
              placeholder="Select Activity"
              :items="activity"
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
        </div>
      </div>
      <VDivider class="mt-4" />
      
      <!-- // 👉 (Table) -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        :items="enrollments"
        :items-length="totalEnrollment"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- Name -->
        <template #item.name="{ item }">
          <div class="d-flex align-items-center">
            <div class="d-flex flex-column">
              <span>{{ item.name }}</span>
              <span class="text-sm text-muted">{{ item.email }}</span>
            </div>
          </div>
        </template>
        <!-- Phone -->
        <template #item.phone="{ item }">
          {{ item.phone }}
        </template>
        <!-- Activity -->
        <template #item.activity="{ item }">
          <VChip
            :color="item.activity === 'Active' ? 'success' : 'error'"
            label
          >
            {{ item.activity }}
          </VChip>
        </template>
        <!-- Updated At -->
        <template #item.updated="{ item }">
          {{ new Date(item.updated).toDateString() }}
        </template>
        <!-- Card -->
        <template #item.card="{ item }">
          <img
            :src="item.card"
            alt="Card"
            style=" border-radius: 5%; block-size: 36px; inline-size: 55px; object-fit: cover;"
            class="me-3"
          >
        </template>
        <!-- Face -->
        <template #item.face="{ item }">
          <img
            :src="item.face"
            alt="Avatar"
            style=" border-radius: 50%; block-size: 36px; inline-size: 36px; object-fit: cover;"
            class="me-3"
          >
        </template>
        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn>
            <VIcon
              icon="tabler-edit" 
              @click="isEditEnrollmentDialogVisible = true"
            />
          </IconBtn>
          <IconBtn>
            <VIcon icon="tabler-dots-vertical" />
            <VMenu activator="parent">
              <VList>
                <VListItem
                  value="delete"
                  prepend-icon="tabler-trash"
                  @click="deleteEnrollment(item.id)"
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
              {{ paginationMeta({ page, itemsPerPage }, totalEnrollment) }}
            </p>
            
            <VPagination
              v-model="page"
              :length="Math.ceil(totalEnrollment / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalEnrollment / itemsPerPage), 5)"
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
    <EditEnrollmentDialog v-model:is-dialog-visible="isEditEnrollmentDialogVisible" />
  </div>
</template>
