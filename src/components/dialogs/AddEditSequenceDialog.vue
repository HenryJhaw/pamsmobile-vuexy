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
  sequenceName: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:sequenceName',
])

const category = [
  'Foo',
  'Bar',
  'Fizz',
  'Buzz',
]

const feature = [
  'Foo',
  'Bar',
  'Fizz',
  'Buzz',
]

const actor = [
  'Foo',
  'Bar',
  'Fizz',
  'Buzz',
]

const activity = [
  'Register',
  'Accepted',
  'Approved',
]

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

const currentSequenceName = ref('')
const currentSequenceIdentity = ref('')
const content = ref('')

const onReset = () => {
  emit('update:isDialogVisible', false)
  currentSequenceName.value = ''
  currentSequenceIdentity.value = ''
  category.value = ''
  content.value = ''
}

const onSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('update:sequenceName', currentSequenceName.value)
}

const maxLengthValidator = v => (v && v.length <= 3) || 'Max 3 characters'

const transformToUppercase = event => {
  currentSequenceIdentity.value = event.target.value.toUpperCase().slice(0, 3)
}

watch(props, () => {
  currentSequenceName.value = props.sequenceName
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
          {{ props.sequenceName ? 'Edit' : 'Add' }} Sequence
        </VCardTitle>
        <VCardSubtitle>
          {{ props.sequenceName ? 'Edit' : 'Add' }} Sequence as per your requirements.
        </VCardSubtitle>
      </VCardItem>

      <!-- //👉 - Name -->
      <VCardText class="mt-1">
        <VForm>
          <div class="d-flex align-end gap-3 mb-3">
            <AppTextField
              v-model="currentMemberName"
              density="compact"
              :rules="[requiredValidator]"
              label="Name"
              placeholder="Enter Name"
            />
          </div>
        </VForm>
      </VCardText>
      <!-- //👉 - Sequence Name and Identity -->
      <VCardText class="mt-1">
        <VForm>
          <div
            class="d-flex align-end gap-3 mb-3"
            style="display: flex; inline-size: 100%;"
          >
            <div style="inline-size: 50%;">
              <AppSelect
                :items="category"
                :menu-props="{ transition: 'scroll-y-transition' }"
                label="Category"
                placeholder="Select Category"
                :rules="[requiredValidator]"
              />
            </div>
            <div style="inline-size: 50%;">
              <AppSelect
                :items="feature"
                :menu-props="{ transition: 'scroll-y-transition' }"
                label="Feature"
                placeholder="Select Feature"
                :rules="[requiredValidator]"
              />
            </div>
          </div>
        </VForm>
      </VCardText>

      <!-- //👉 - Sequences -->
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
              <div style="inline-size: 45%;">
                <AppSelect
                  :items="actor"
                  :menu-props="{ transition: 'scroll-y-transition' }"
                  label="Actor"
                  placeholder="Select Actor"
                />
              </div>
              <div style="inline-size: 45%;">
                <AppSelect
                  :items="activity"
                  :menu-props="{ transition: 'scroll-y-transition' }"
                  label="Activity"
                  placeholder="Select Activity"
                />
              </div>
              <div style="inline-size: 10%;">
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
          Add another sequence
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
