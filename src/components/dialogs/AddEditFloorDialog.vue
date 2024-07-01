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
  floorName: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:floorName',
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

const buildings = [
  'Foo',
  'Bar',
  'Fizz',
  'Buzz',
]

const currentFloorName = ref('')
const category = ref('')
const content = ref('')

const onReset = () => {
  emit('update:isDialogVisible', false)
  currentFloorName.value = ''
  category.value = ''
  content.value = ''
}

const onSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('update:floorName', currentFloorName.value)
}

watch(props, () => {
  currentFloorName.value = props.floorName
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
          {{ props.floorName ? 'Edit' : 'Add' }} floor
        </VCardTitle>
        <VCardSubtitle>
          {{ props.floorName ? 'Edit' : 'Add' }} floor as per your requirements.
        </VCardSubtitle>
      </VCardItem>

      <VCardText class="mt-1">
        <AppSelect
          :items="buildings"
          :menu-props="{ transition: 'scroll-y-transition' }"
          label="Selected Building"
          placeholder="Select Building"
          :rules="[requiredValidator]"
          clearable
          clear-icon="tabler-x"
        />
      </VCardText>
      <!-- //👉 - floor Name and Identity -->
      <VCardText class="mt-1">
        <VForm>
          <div
            class="d-flex align-end gap-3 mb-3"
            style="display: flex; inline-size: 100%;"
          >
            <div style="inline-size: 50%;">
              <AppTextField
                v-model="currentFloorName"
                density="compact"
                :rules="[requiredValidator]"
                label="floor Name"
                placeholder="Enter floor Name"
              />
            </div>
            <div style="inline-size: 50%;">
              <AppTextField
                v-model="currentBuildingIdentity"
                density="compact"
                :rules="[requiredValidator]"
                label="Identity"
                placeholder="Enter floor Identity"
              />
            </div>
          </div>
        </VForm>
      </VCardText>

      <!-- //👉 - Image floor -->
      <div class="d-flex flex-column align-center justify-center gap-5 mt-6 mb-15">
        <VAvatar
          color="grey-200"
          size="150"
          style="block-size: 120px; inline-size: 200px;"
          rounded
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
          <span class="d-none d-sm-block">Upload new view</span>
        </VBtn>
      </div>

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

<style lang="scss">
.document-table {
  td {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    padding-block: 0.5rem;
    padding-inline: 0;
  }
}
</style>
