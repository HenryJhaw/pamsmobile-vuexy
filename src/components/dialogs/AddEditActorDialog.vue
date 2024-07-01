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
  actorName: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:actorName',
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

const currentActorName = ref('')
const category = ref('')
const content = ref('')

const onReset = () => {
  emit('update:isDialogVisible', false)
  currentActorName.value = ''
  category.value = ''
  content.value = ''
}

const onSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('update:actorName', currentActorName.value)
}

watch(props, () => {
  currentActorName.value = props.actorName
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
          {{ props.actorName ? 'Edit' : 'Add' }} Actor
        </VCardTitle>
        <VCardSubtitle>
          {{ props.actorName ? 'Edit' : 'Add' }} Actor as per your requirements.
        </VCardSubtitle>
      </VCardItem>


      <!-- //👉 - Actor Name and Identity -->
      <VCardText class="mt-1">
        <VForm>
          <div
            class="d-flex align-end gap-3 mb-3"
            style="display: flex; inline-size: 100%;"
          >
            <div style="inline-size: 70%;">
              <AppTextField
                v-model="currentActorName"
                density="compact"
                :rules="[requiredValidator]"
                label="Actor Name"
                placeholder="Enter Actor Name"
              />
            </div>
            <div style="inline-size: 30%;">
              <AppTextField
                v-model="currentActorIdentity"
                density="compact"
                :rules="[requiredValidator]"
                label="Identity"
                placeholder="Enter Actor Identity"
                @input="transformToUppercase"
              />
            </div>
          </div>
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
