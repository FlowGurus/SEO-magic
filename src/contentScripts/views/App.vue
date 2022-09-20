<template>
  <div class="fixed right-0 bottom-0 m-5 z-100 flex font-sans select-none leading-1em">
    <div
      class="bg-white text-gray-800 rounded-sm shadow w-max h-min"
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="show ? 'opacity-100' : 'opacity-0'"
    >
      aa
      <!-- <MainWindow
        v-if="pageData != null"
        class="modal-body"
        :page-data="pageData"
      /> -->
    </div>
    <div
      class="flex w-10 h-10 rounded-full shadow cursor-pointer"
      bg="teal-600 hover:teal-700"

      @click="toggle()"
    >
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import 'virtual:windi.css'
// import MainWindow from '~/components/MainWindow.vue'

// const pageData = ref(undefined as PageData | undefined)

// onMounted(async() => {
//   // pageData.value = await getPageData()
// })

const [show, toggle] = useToggle(false)

</script>

<style>
.modal-body {
    max-height: calc(100vh - 210px);
    overflow-y: auto;
}
</style>
