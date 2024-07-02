<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import {
  useDropZone,
  useFileDialog,
  useObjectUrl,
} from '@vueuse/core'
import { ref, watch } from 'vue'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  enrollmentName: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:enrollmentName',
])

const dropZoneRef = ref()
const fileData = ref([])
const { open, onChange } = useFileDialog({ accept: '*' })
function onDrop(DroppedFiles) {
  DroppedFiles?.forEach(file => {
    fileData.value.push({
      file,
      url: useObjectUrl(file).value ?? '',
    })
  })
}

onChange(selectedFiles => {
  if (!selectedFiles)
    return
  for (const file of selectedFiles) {
    fileData.value.push({
      file,
      url: useObjectUrl(file).value ?? '',
    })
  }
})
useDropZone(dropZoneRef, onDrop)


const currentEnrollmentName = ref('')
const category = ref('')
const content = ref('')
const isDefaultChipVisible = ref(true)

const onReset = () => {
  emit('update:isDialogVisible', false)
  currentEnrollmentName.value = ''
  category.value = ''
  EndDate.value = ''
  content.value = ''
}

const onSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('update:enrollmentName', currentEnrollmentName.value)
}

watch(props, () => {
  currentEnrollmentName.value = props.enrollmentName
})
</script>

<template>
  <VDialog
    v-model="props.isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
  >
    <!-- 👉 dialog close btn -->
    <DialogCloseBtn @click="onReset" />

    <VCard class="pa-sm-8 pa-5">
      <!-- 👉 Title -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h5">
          {{ props.enrollmentName ? 'Edit' : 'Timeline' }} Enrollment
        </VCardTitle>
        <VCardSubtitle>
          {{ props.enrollmentName ? 'Edit' : 'Tiimeline' }} Enrollment as per your requirements.
        </VCardSubtitle>
      </VCardItem>

      <!-- //👉 - Enrollment Name and Identity -->
      <VCardText class="mt-1">
        <VForm>
          <div
            class="d-flex align-end gap-3 mb-3"
            style="display: flex; inline-size: 100%;"
          >
            <div style="inline-size: 50%;">
              <AppTextField
                v-model="currentEnrollmentIdentity"
                density="compact"
                label="Identity"
              />
            </div>
            <div style="inline-size: 50%;">
              <AppTextField
                v-model="currentEnrollmentName"
                density="compact"
                label="Name"
              />
            </div>
          </div>
        </VForm>
        <VForm>
          <div
            class="d-flex align-end gap-3 mb-3"
            style="display: flex; inline-size: 100%;"
          >
            <div style="inline-size: 50%;">
              <AppTextField
                v-model="currentPhone"
                density="compact"
                label="Phone"
              />
            </div>
            <div style="inline-size: 50%;">
              <AppTextField
                v-model="currentEmail"
                density="compact"
                label="Email"
              />
            </div>
          </div>
        </VForm>
      </VCardText>

      <!-- 👉 Activity timeline -->
      <VCol cols="12">
        <VCard title="Activity Timeline">
          <VCardText>
            <VTimeline
              density="compact"
              align="start"
              truncate-line="both"
              class="v-timeline-density-compact"
            >
              <!-- 👉 Approved timeline -->
              <VTimelineItem
                dot-color="success"
                size="x-small"
              >
                <div class="d-flex justify-space-between align-center flex-wrap gap-2 mb-3">
                  <span class="app-timeline-title">
                    Approved
                  </span>
                  <span class="app-timeline-meta">15 min ago</span>
                </div>

                <p class="app-timeline-text mb-1">
                  This is Remark
                </p>

                <div class="d-flex align-center mt-2">
                  <div class="d-flex align-center me-4">
                    <VBtn
                      rounded="pill"
                      color="grey"
                      size="small"
                    >
                      <VIcon
                        color="error"
                        icon="tabler-file"
                        size="22"
                        class="me-2"
                      />
                      Report.docx
                    </VBtn>
                  </div>
                  <div class="d-flex align-center me-4">
                    <VBtn
                      rounded="pill"
                      color="grey"
                      size="small"
                    >
                      <VIcon
                        color="error"
                        icon="tabler-file"
                        size="22"
                        class="me-2"
                      />
                      Invoices.pdf
                    </VBtn>
                  </div>
                </div>

                <div class="d-flex align-center mt-3">
                  <VAvatar
                    size="34"
                    class="me-2"
                    :image="avatar1"
                  />
                  <div>
                    <h6 class="text-sm font-weight-medium mb-n1">
                      Abib Husin (Tenant Relation)
                    </h6>
                    <span class="text-xs">Has made a decision</span>
                  </div>
                </div>
              </VTimelineItem>
              <!-- 👉 Accepted timeline -->
              <VTimelineItem
                dot-color="warning"
                size="x-small"
              >
                <div class="d-flex justify-space-between align-center flex-wrap gap-2 mb-3">
                  <span class="app-timeline-title">
                    Accepted
                  </span>
                  <span class="app-timeline-meta">30 min ago</span>
                </div>

                <p class="app-timeline-text mb-1">
                  This is Remark
                </p>

                <div class="d-flex align-center mt-3">
                  <VAvatar
                    size="34"
                    class="me-2"
                    :image="avatar1"
                  />
                  <div>
                    <h6 class="text-sm font-weight-medium mb-n1">
                      Abib Husin (Tenant Relation)
                    </h6>
                    <span class="text-xs">Has made a decision</span>
                  </div>
                </div>
              </VTimelineItem>
              <!-- 👉 Rejected timeline -->
              <VTimelineItem
                dot-color="error"
                size="x-small"
              >
                <div class="d-flex justify-space-between align-center flex-wrap gap-2 mb-3">
                  <span class="app-timeline-title">
                    Rejected
                  </span>
                  <span class="app-timeline-meta">45 min ago</span>
                </div>

                <p class="app-timeline-text mb-1">
                  This is Remark
                </p>

                <div class="d-flex align-center mt-2">
                  <div class="d-flex align-center me-4">
                    <VBtn
                      rounded="pill"
                      color="grey"
                      size="small"
                    >
                      <VIcon
                        color="error"
                        icon="tabler-file"
                        size="22"
                        class="me-2"
                      />
                      Report.docx
                    </VBtn>
                  </div>
                  <div class="d-flex align-center me-4">
                    <VBtn
                      rounded="pill"
                      color="grey"
                      size="small"
                    >
                      <VIcon
                        color="error"
                        icon="tabler-file"
                        size="22"
                        class="me-2"
                      />
                      Invoices.pdf
                    </VBtn>
                  </div>
                </div>

                <div class="d-flex align-center mt-3">
                  <VAvatar
                    size="34"
                    class="me-2"
                    :image="avatar1"
                  />
                  <div>
                    <h6 class="text-sm font-weight-medium mb-n1">
                      Abib Husin (Tenant Relation)
                    </h6>
                    <span class="text-xs">Has made a decision</span>
                  </div>
                </div>
              </VTimelineItem>
              <!-- 👉 Decision timeline -->
              <VTimelineItem
                dot-color="info"
                size="large"
              >
                <div class="d-flex justify-space-between align-center flex-wrap gap-2 mb-3">
                  <span class="app-timeline-title">
                    Give Your Decision
                  </span>
                  <span class="app-timeline-meta">2 hour ago</span>
                </div>
                <div class="d-flex justify-space-between align-center flex-wrap gap-2 mb-3">
                  <AppTextField
                    v-model="currentRemark"
                    density="compact"
                    placeholder="Enter your remarks"
                  />
                  <VBtn
                    icon="tabler-paperclip"
                    variant="tonal"
                    color="grey"
                    size="small"
                  />
                </div>

                <div class="d-flex align-center mt-2">
                  <div class="d-flex align-center me-4">
                    <VChip
                      v-if="isDefaultChipVisible"
                      closable
                      @click:close="isInfoChipVisible = !isInfoChipVisible"
                    >
                      <VIcon
                        color="error"
                        icon="tabler-file"
                        size="22"
                        class="me-2"
                      />
                      Report.docx
                    </VChip>
                  </div>
                  <div class="d-flex align-center me-4">
                    <VChip
                      v-if="isDefaultChipVisible"
                      closable
                      @click:close="isInfoChipVisible = !isInfoChipVisible"
                    >
                      <VIcon
                        color="error"
                        icon="tabler-file"
                        size="22"
                        class="me-2"
                      />
                      Invoices.pdf
                    </VChip>
                  </div>
                </div>

                <div class="d-flex gap-4 flex-wrap align-center mt-3">
                  <VBtn
                    variant="outlined"
                    color="grey"
                    prepend-icon="tabler-arrow-back-up"
                  >
                    Return
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="success"
                    prepend-icon="tabler-checks"
                  >
                    Approve
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="error"
                    prepend-icon="tabler-x"
                    @click="isAddEditBuildingDialogVisible = true"
                  >
                    Reject
                  </VBtn>
                </div>
              </VTimelineItem>
              <!-- 👉 Decision timeline 2 -->
              <VTimelineItem
                dot-color="info"
                size="large"
              >
                <div class="d-flex justify-space-between align-center flex-wrap gap-2 mb-3">
                  <span class="app-timeline-title">
                    Give Your Decision
                  </span>
                  <span class="app-timeline-meta">Sun Jan 01 2023	14:10:01</span>
                </div>
                <div class="d-flex justify-space-between align-center flex-wrap gap-2 mb-3">
                  <AppTextField
                    v-model="currentRemark"
                    density="compact"
                    placeholder="Enter your remarks"
                  />
                  <VBtn
                    icon="tabler-paperclip"
                    variant="tonal"
                    color="grey"
                    size="small"
                  />
                </div>
                
                <div class="d-flex gap-4 flex-wrap align-center mt-3">
                  <VBtn
                    variant="outlined"
                    color="grey"
                    prepend-icon="tabler-arrow-back-up"
                  >
                    Return
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="warning"
                    prepend-icon="tabler-check"
                  >
                    Accept
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="error"
                    prepend-icon="tabler-x"
                    @click="isAddEditBuildingDialogVisible = true"
                  >
                    Reject
                  </VBtn>
                </div>
              </VTimelineItem>
              <!-- 👉 Register timeline -->
              <VTimelineItem
                dot-color="grey-400"
                size="x-small"
              >
                <div class="d-flex justify-space-between align-center flex-wrap gap-2 mb-3">
                  <span class="app-timeline-title">
                    Register
                  </span>
                  <span class="app-timeline-meta">Sun Jan 01 2023	12:10:01</span>
                </div>
                <div class="d-flex align-items-center">
                  <img
                    :src="avatar2"
                    alt="Avatar"
                    style=" border-radius: 50%; block-size: 36px; inline-size: 36px; object-fit: cover;"
                    class="me-3"
                  >
                  <img
                    :src="avatar1"
                    alt="Card"
                    style="border-radius: 5%; block-size: 36px; inline-size: 55px; object-fit: cover;"
                    class="me-3"
                  >
                  <div class="d-flex flex-column">
                    <span>Rahmat Cahyadi</span>
                    <span class="text-sm text-muted">Status: Owner</span>
                    <span class="text-sm text-muted">Building: Leonida Tower</span>
                    <span class="text-sm text-muted">Unit: Unit LEO-10-B</span>
                  </div>
                </div>
              </VTimelineItem>
            </VTimeline>
          </VCardText>
        </VCard>
      </VCol>

      <!-- //👉 - Button Submit & Cancel -->
      <div class="d-flex align-center justify-center gap-3 mt-6 mb-15">
        <VBtn @click="onSubmit">
          Submit
        </VBtn>

        <VBtn
          color="secondary"
          variant="tonal"
          @click="onReset"
        >
          Cancel
        </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>

