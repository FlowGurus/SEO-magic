<template>
  <main>
    <MainWindow
      v-if="pageData != null"
      :page-data="pageData"
      @show-element="v => showElement(v.selector, v.idx)"
      @openOptions="openOptions"
      @reload="reload(tabId, true)"
    />

    <!-- <div class="w-[300px] px-4 py-5 text-center text-gray-700">
      <button class="btn mt-2" @click="reload">
        reload
      </button>
    </div>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div> -->
  </main>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { isObject } from '@vue/shared'
import { ref, computed } from 'vue'
import { sendMessage } from 'webext-bridge'

import { PageData, setIconBadgeErrorCount } from '~/logic'
import MainWindow from '~/components/MainWindow.vue'

const toast = useToast()

function openOptions() {
  browser.runtime.openOptionsPage()
}

const pageData = ref(undefined as PageData | undefined)
const errorsCount = computed(() => pageData.value?.stats?.errorsCount)
const tabId = ref()

const showElement = async(selector: string, idx: number) => {
  const response = await sendMessage('show-element', { selector, idx }, { context: 'content-script', tabId: tabId.value })
  if (response && response !== true)
    toast(response)
}
const reload = async(tabId: number, reparse = false) => {
  const response = await sendMessage('get-page-data', { reparse }, { context: 'content-script', tabId })
  if (response && isObject(response)) pageData.value = (response as unknown as PageData)
}

watch(tabId, (val) => {
  if (val) reload(val)
})
watch(errorsCount, (val) => {
  if (val == null) return
  setIconBadgeErrorCount(val)
})

onMounted(async() => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  tabId.value = tabs[0].id
})

// const targets = [
//   { name: 'Tltle', category: 'Meta', selector: 'title', validators: [required, onlyOne], decorators: [charCount] },
//   { name: 'Description', category: 'Meta', selector: 'meta[name=description]', validators: [required, onlyOne], decorators: [charCount] },
// ]

// const values = computed(() => {
//   const titleNodes = document.querySelectorAll('title')

//   return {
//     title,

//   }
// })
// function ass() {

//   const h1Heading = []
//   document.querySelectorAll('h1').forEach(el => h1Heading.push(el.textContent))
//   const h1HeadingOccurrences = getElementOccurrences('h1')
// }
</script>
