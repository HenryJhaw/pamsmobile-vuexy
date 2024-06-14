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
  articleName: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:articleName',
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

const currentArticleName = ref('')
const category = ref('')
const StartDate = ref('')
const EndDate = ref('')
const content = ref('')

const onReset = () => {
  emit('update:isDialogVisible', false)
  currentArticleName.value = ''
  category.value = ''
  StartDate.value = ''
  EndDate.value = ''
  content.value = ''
}

const onSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('update:articleName', currentArticleName.value)
}

watch(props, () => {
  currentArticleName.value = props.articleName
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
          {{ props.articleName ? 'Edit' : 'Add' }} Article
        </VCardTitle>
        <VCardSubtitle>
          {{ props.articleName ? 'Edit' : 'Add' }} article as per your requirements.
        </VCardSubtitle>
      </VCardItem>

      <VCardText class="mt-1">
        <VForm>
          <!-- 👉 Article category -->
          <div class="d-flex align-end gap-3 mb-3">
            <AppSelect
              v-model="category"
              placeholder="Select Category"
              :rules="[requiredValidator]"
              label="Category"
              :items="['Rules', 'Regulation']"
            />

            <!-- //👉 - Article title -->
            <AppTextField
              v-model="currentArticleName"
              density="compact"
              :rules="[requiredValidator]"
              label="Title"
              placeholder="Enter Article Title"
            />
          </div>
          <!-- <VCheckbox label="Set as core article" /> -->
        </VForm>
      </VCardText>

      <!-- //👉 - Attachment -->
      <VCardText>
        <span class="mb-1">Attachment</span>
        <div class="flex">
          <div class="w-full h-auto relative">
            <div
              ref="dropZoneRef"
              class="cursor-pointer"
              @click="() => open()"
            >
              <div
                v-if="fileData.length === 0"
                class="d-flex flex-column justify-center align-center gap-y-3 px-6 py-10 border-dashed drop-zone"
              >
                <IconBtn
                  variant="tonal"
                  class="rounded-sm"
                >
                  <VIcon icon="tabler-upload" />
                </IconBtn>
                <div class="text-base text-high-emphasis font-weight-medium">
                  Drag and Drop Your Attachment Here.
                </div>
                <span class="text-disabled">or</span>

                <VBtn variant="tonal">
                  Browse Attachment
                </VBtn>
              </div>

              <div
                v-else
                class="d-flex justify-center align-center gap-3 pa-8 border-dashed drop-zone flex-wrap"
              >
                <VRow class="match-height w-100">
                  <template
                    v-for="(item, index) in fileData"
                    :key="index"
                  >
                    <VCol
                      cols="12"
                      sm="4"
                    >
                      <VCard
                        :ripple="false"
                        border
                      >
                        <VCardText
                          class="d-flex flex-column"
                          @click.stop
                        >
                          <VImg
                            :src="item.url"
                            width="200px"
                            height="150px"
                            class="w-100 mx-auto"
                          />
                          <div class="mt-2">
                            <span class="clamp-text text-wrap">
                              {{ item.file.name }}
                            </span>
                            <span>
                              {{ item.file.size / 1000 }} KB
                            </span>
                          </div>
                        </VCardText>
                        <VSpacer />
                        <VCardActions>
                          <VBtn
                            variant="outlined"
                            block
                            @click.stop="fileData.splice(index, 1)"
                          >
                            Remove File
                          </VBtn>
                        </VCardActions>
                      </VCard>
                    </VCol>
                  </template>
                </VRow>
              </div>
            </div>
          </div>
        </div>
      </VCardText>
      
      <!-- //👉 - Description -->
      <VCardText>
        <span class="mb-1">Description (optional)</span>
        <TiptapEditor
          v-model="content"
          placeholder="Article Description"
          class="border rounded"
        />
      </VCardText>

      <VCardText class="mt-1">
        <VForm>
          <!-- 👉 Start Date -->
          <div>
            <AppDateTimePicker
              v-model="StartDate"
              label="Start Date"
              placeholder="Select date and time"
              :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
            />

            <!-- //👉 - End Date -->
            <AppDateTimePicker
              v-model="EndDate"
              label="End Date"
              placeholder="Select date and time"
              :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
            />
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
.article-table {
  td {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    padding-block: 0.5rem;
    padding-inline: 0;
  }
}
</style>
