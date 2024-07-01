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
  categoryName: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:categoryName',
])

const subjects = [
  'Foo',
  'Bar',
  'Fizz',
  'Buzz',
]

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

const currentCategoryName = ref('')
const currentCategoryIdentity = ref('')
const category = ref('')
const content = ref('')

const onReset = () => {
  emit('update:isDialogVisible', false)
  currentCategoryName.value = ''
  currentCategoryIdentity.value = ''
  category.value = ''
  content.value = ''
}

const onSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('update:categoryName', currentCategoryName.value)
}

watch(props, () => {
  currentCategoryName.value = props.categoryName
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
          {{ props.categoryName ? 'Edit' : 'Add' }} Category
        </VCardTitle>
        <VCardSubtitle>
          {{ props.categoryName ? 'Edit' : 'Add' }} Category as per your requirements.
        </VCardSubtitle>
      </VCardItem>


      <!-- //👉 - Category Subject, Name and Identity -->
      <VCardText class="mt-1">
        <VForm>
          <div
            class="d-flex align-end gap-3 mb-3"
            style="display: flex; inline-size: 100%;"
          >
            <div style="inline-size: 50%;">
              <AppSelect
                :items="subjects"
                :menu-props="{ transition: 'scroll-y-transition' }"
                label="Subject"
                placeholder="Select Subject"
                :rules="[requiredValidator]"
              />
            </div>
            <div style="inline-size: 50%;">
              <AppTextField
                v-model="currentCategoryName"
                density="compact"
                :rules="[requiredValidator]"
                label="Category Name"
                placeholder="Enter Category Name"
              />
            </div>
          </div>
          <AppTextField
            v-model="currentCategoryName"
            density="compact"
            label="Identity"
            placeholder="Enter Identity Number"
          />
        </VForm>
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
