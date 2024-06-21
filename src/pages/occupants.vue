<script setup>
import { ref, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'

const widgetData = ref([
  {
    title: 'Online Users',
    value: '54',
    icon: 'tabler-world',
    iconColor: 'info',
  },
  {
    title: 'Active Users',
    value: '5',
    icon: 'tabler-user-check',
    iconColor: 'success',
  },
  {
    title: 'Pending Users',
    value: '12',
    icon: 'tabler-user-exclamation',
    iconColor: 'warning',
  },
  {
    title: 'Inactive Users',
    value: '54',
    icon: 'tabler-user-x',
    iconColor: 'error',
  },
])

const headers = [
  {
    title: 'User',
    key: 'user',
  },
  {
    title: 'Role',
    key: 'role',
  },
  {
    title: 'Status',
    key: 'status',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

//category options
const selectedCategory = ref()
const searchQuery = ref('')
const selectedStatus = ref()

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const allUsers = ref([
  {
    id: 1,
    user: 'user 1',
    email: 'user1@email.com',
    role: 'Owner',
    status: 'Active',
    avatar: avatar1,
    card: avatar1,
  },
  {
    id: 2,
    user: 'user 2',
    email: 'user2@email.com',
    role: 'Tenant',
    status: 'Inactive',
    avatar: avatar2,
    card: avatar2,
  },

  // Add more mock data as needed
])

const users = ref([])
const totalUser = ref(allUsers.value.length)

const fetchUsers = () => {
  const start = (page.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value

  users.value = allUsers.value.slice(start, end)
}

const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
  fetchUsers()
}

watch([page, itemsPerPage], fetchUsers, { immediate: true })

const deleteDocument = id => {
  const index = allUsers.value.findIndex(doc => doc.id === id)
  if (index !== -1) {
    allUsers.value.splice(index, 1)
    totalUser.value = allUsers.value.length
    fetchUsers()
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
            sm="6"
          >
            <AppSelect
              v-model="selectedCategory"
              placeholder="Select Category"
              :items="categories"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <AppSelect
              v-model="selectedCategory"
              placeholder="Select Status"
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
        </div>
      </div>
      <VDivider class="mt-4" />
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        show-select
        :items="users"
        :items-length="totalUser"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- User -->
        <template #item.user="{ item }">
          <div class="d-flex align-items-center">
            <VAvatar
              :src="item.avatar"
              size="20"
              class="me-3"
            />
            <img
              :src="item.card"
              alt="Rectangle"
              style=" block-size: 36px;inline-size: 50px; object-fit: cover;"
              class="me-3"
            >
            <div class="d-flex flex-column">
              <span>{{ item.user }}</span>
              <span class="text-sm text-muted">{{ item.email }}</span>
            </div>
          </div>
        </template>
        <!-- Role -->
        <template #item.role="{ item }">
          {{ item.role }}
        </template>
        <!-- Status -->
        <template #item.status="{ item }">
          <VChip
            :color="item.status === 'Active' ? 'success' : 'error'"
            label
          >
            {{ item.status }}
          </VChip>
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
            <p class="text-sm text-medium-emphasis mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalUser) }}
            </p>
            
            <VPagination
              v-model="page"
              :length="Math.ceil(totalUser / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalUser / itemsPerPage), 5)"
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
    </vcard>
  </div>
</template>
