<script setup>
import {
  useDropZone,
  useFileDialog,
  useObjectUrl,
} from '@vueuse/core'
import { ref, watch } from 'vue'
import { VCard } from 'vuetify/lib/components/index.mjs'


const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  memberName: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:memberName',
])

const password = ref()
const isPasswordVisible = ref(false)
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


const currentMemberName = ref('')
const category = ref('')
const StartDate = ref('')
const EndDate = ref('')
const content = ref('')

const onReset = () => {
  emit('update:isDialogVisible', false)
  currentMemberName.value = ''
  category.value = ''
  StartDate.value = ''
  EndDate.value = ''
  content.value = ''
}

const onSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('update:memberName', currentMemberName.value)
}

watch(props, () => {
  currentMemberName.value = props.memberName
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
          {{ props.memberName ? 'Edit' : 'Add' }} Members
        </VCardTitle>
        <VCardSubtitle>
          {{ props.memberName ? 'Edit' : 'Add' }} Member as per your requirements.
        </VCardSubtitle>
      </VCardItem>

      <VCardText class="mt-1">
        <VForm>
          <!-- 👉 Member category -->
          <div class="d-flex align-end gap-3 mb-3">
            <!-- //👉 - Member title -->
            <AppTextField
              v-model="currentMemberName"
              density="compact"
              :rules="[requiredValidator]"
              label="Full Name"
              placeholder="Enter Member Full Name"
            />
          </div>
        </VForm>
      </VCardText>

      <!-- //👉 - Avatar -->
      
      <div class="d-flex flex-column align-center justify-center gap-5 mt-6 mb-15">
        <VAvatar
          color="grey-200"
          size="150"
          style="border-radius: 50%;"
        >
          <VIcon
            icon="tabler-photo"
            size="36"
          />
        </VAvatar>

        <VBtn
          color="primary"
          @click="refInputEl?.click()"
        >
          <VIcon
            icon="tabler-cloud-upload"
            class="d-sm-none"
          />
          <span class="d-none d-sm-block">Upload new photo</span>
        </VBtn>
      </div>
      
      <!-- //👉 - Email -->
      <VCardText class="mt-1">
        <VForm>
          <div class="d-flex align-end gap-3 mb-3">
            <AppTextField
              v-model="currentMemberName"
              density="compact"
              :rules="[requiredValidator]"
              label="Email"
              placeholder="Enter Email"
            />
          </div>
        </VForm>
      </VCardText>
      
      <!-- 👉 Contact and Password -->
      <VCardText class="mt-1">
        <VForm>
          <div
            class="d-flex align-end gap-3 mb-3"
            style="display: flex; inline-size: 100%;"
          >
            <div style="inline-size: 50%;">
              <AppTextField
                v-model="currentDocumentName"
                density="compact"
                :rules="[requiredValidator]"
                label="Contact"
                placeholder="E.g. 08111222333"
              />
            </div>
            <div style="inline-size: 50%;">
              <AppTextField
                v-model="password"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                placeholder="Enter Password"
                :rules="[requiredValidator]"
                autocomplete="on"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </div>
          </div>
        </VForm>
      </VCardText>

      <!-- 👉 Staff Department and Staff Code -->
      <VCardText class="mt-1">
        <VForm>
          <div
            class="d-flex align-end gap-3 mb-3"
            style="display: flex; inline-size: 100%;"
          >
            <div style="inline-size: 50%;">
              <AppSelect
                v-model="selectedStaffDepartment"
                placeholder="Select Department"
                :rules="[requiredValidator]"
                label="Staff Department"
                :items="['Rules', 'Regulation']"
                clearable
                clear-icon="tabler-x"
              />
            </div>
            <div style="inline-size: 50%;">
              <AppSelect
                v-model="selectedStaffCode"
                placeholder="Select Staff Code"
                :rules="[requiredValidator]"
                label="Staff Code"
                :items="['SEC', 'PMO', 'TRO']"
                clearable
                clear-icon="tabler-x"
              />
            </div>
          </div>
        </VForm>
      </VCardText>

      <!-- 👉 Staff Role and Status -->
      <VCardText class="mt-1">
        <VForm>
          <div
            class="d-flex align-end gap-3 mb-3"
            style="display: flex; inline-size: 100%;"
          >
            <div style="inline-size: 50%;">
              <AppSelect
                v-model="selectedStaffRole"
                placeholder="Select Staff Role"
                :rules="[requiredValidator]"
                label="Staff Role"
                :items="['Security', 'Property Manager', 'Tenant Relation']"
                clearable
                clear-icon="tabler-x"
              />
            </div>
            <div style="inline-size: 50%;">
              <AppSelect
                v-model="selectedStatus"
                placeholder="Select Status"
                :rules="[requiredValidator]"
                label="Status"
                :items="['Active', 'Pending', 'Disable']"
                clearable
                clear-icon="tabler-x"
              />
            </div>
          </div>
        </VForm>
      </VCardText>

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

<style lang="scss">
.member-table {
  td {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    padding-block: 0.5rem;
    padding-inline: 0;
  }
}
</style>
