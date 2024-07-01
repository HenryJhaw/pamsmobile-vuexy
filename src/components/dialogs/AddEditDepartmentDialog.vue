<script setup>
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
  departmentName: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:departmentName',
])

const optionCounter = ref(1)
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

const currentDepartmentName = ref('')
const currentDepartmentIdentity = ref('')
const category = ref('')
const content = ref('')

const onReset = () => {
  emit('update:isDialogVisible', false)
  currentDepartmentName.value = ''
  currentDepartmentIdentity.value = ''
  category.value = ''
  content.value = ''
}

const onSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('update:departmentName', currentDepartmentName.value)
}

const maxLengthValidator = v => (v && v.length <= 3) || 'Max 3 characters'

const transformToUppercase = event => {
  currentDepartmentIdentity.value = event.target.value.toUpperCase().slice(0, 3)
}

watch(props, () => {
  currentDepartmentName.value = props.departmentName
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
          {{ props.departmentName ? 'Edit' : 'Add' }} Department
        </VCardTitle>
        <VCardSubtitle>
          {{ props.departmentName ? 'Edit' : 'Add' }} Department as per your requirements.
        </VCardSubtitle>
      </VCardItem>


      <!-- //👉 - Department Name and Identity -->
      <VCardText class="mt-1">
        <VForm>
          <div
            class="d-flex align-end gap-3 mb-3"
            style="display: flex; inline-size: 100%;"
          >
            <div style="inline-size: 70%;">
              <AppTextField
                v-model="currentDepartmentName"
                density="compact"
                :rules="[requiredValidator]"
                label="Department Name"
                placeholder="Enter Department Name"
              />
            </div>
            <div style="inline-size: 30%;">
              <AppTextField
                v-model="currentDepartmentIdentity"
                density="compact"
                :rules="[requiredValidator, maxLengthValidator]"
                label="Identity"
                placeholder="Enter Department Identity"
                @input="transformToUppercase"
              />
            </div>
          </div>
        </VForm>
      </VCardText>

      <!-- //👉 - Categories -->
      <VCardText class="mt-1">
        <template
          v-for="i in optionCounter"
          :key="i"
        >
          <VForm>
            <div
              class="d-flex align-end gap-3 mb-3"
              style="display: flex; inline-size: 100%;"
            >
              <div style="inline-size: 70%;">
                <AppTextField
                  v-model="currentCategoryName"
                  density="compact"
                  label="Category"
                  placeholder="Enter Category Name"
                />
              </div>
              <div style="inline-size: 30%;">
                <VBtn
                  color="secondary"
                  variant="tonal"
                  @click="optionCounter--"
                >
                  Delete
                </VBtn>
              </div>
            </div>
          </VForm>
        </template>

        <VBtn
          class="mt-6"
          @click="optionCounter++"
        >
          Add another category
        </VBtn>
      </VCardText>

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
