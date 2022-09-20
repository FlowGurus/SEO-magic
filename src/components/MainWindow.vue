<template>
  <div>
    <div class="tabs">
      <input id="tabone" type="radio" name="tabs" checked="checked">
      <label for="tabone">Meta <span v-if="metaErrorsCount > 0" class="badge">{{ metaErrorsCount }}</span></label>
      <div class="tab">
        <div class="">
          <div v-for="item in pageData.sections.ogImage.items" :key="item" class="image-wrap">
            <img :src="item.text" :alt="item.text" class="image" />
          </div>
          <div v-for="error in pageData.sections.ogImage.errors" :key="error" class="warning-message">
            <div class="text-small">
              {{ error }}
            </div>
          </div>
          <div class="">
            <div class="w-layout-grid row is-url">
              <div class="headings-wrap">
                <div class="row-label text-gray-400">
                  url
                </div>
              </div>
              <a :href="url" class="link">{{ pageData.url }}</a>
            </div>
          </div>
        </div>

        <!-- <div class="category">
          <div v-for="item in pageData.sections.ogImage.items" :key="item" class="category-block">
            <img :src="item.text" :alt="item.text" />
          </div>
          <div v-for="error in pageData.sections.ogImage.errors" :key="error" class="text-error">
            {{ error }}
          </div>
        </div>
        <div class="category">
          <div class="category-block">
            <div class="category-block-title">
              url
            </div>
            <div class="category-block-content">
              <div class="category-block-content-row">
                <div class="text-sm">
                  {{ pageData.url }}
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <div class="">
          <div class="w-layout-grid row">
            <div class="row-label text-gray-400">
              Title
            </div>
            <div v-for="(item,idx) in pageData.sections.title.items" :key="idx">
              <div class="text-medium">
                {{ item.text }}
              </div>
              <div class="text-small">
                {{ item.text.length }} characters
              </div>
              <div v-for="error in item.errors" :key="error" class="warning-message">
                <div class="text-small">
                  {{ error }}
                </div>
              </div>
            </div>
            <div v-for="error in pageData.sections.title.errors" :key="error" class="warning-message">
              <div class="text-small">
                {{ error }}
              </div>
            </div>
          </div>
          <div class="w-layout-grid row">
            <div class="row-label text-gray-400">
              Descr
            </div>
            <div v-for="(item,idx) in pageData.sections.description.items" :key="idx">
              <div class="text-medium">
                {{ item.text }}
              </div>
              <div class="text-small">
                {{ item.text.length }} characters
              </div>
              <div v-for="error in item.errors" :key="error" class="warning-message">
                <div class="text-small">
                  {{ error }}
                </div>
              </div>
            </div>
            <div v-for="error in pageData.sections.description.errors" :key="error" class="warning-message">
              <div class="text-small">
                {{ error }}
              </div>
            </div>
          </div>

          <div class="w-layout-grid">
            <div class="content-block">
              <div class="row-label text-gray-400">
                Word Count:
              </div>
            </div>
            <div class="content-block">
              <span class="text-small">
                Nav:
              </span>

              <span class="text-medium">
                {{ pageData.stats.wordsCount.nav }}
              </span>
              <span class="text-small">
                Body:
              </span>

              <span class="text-medium">
                {{ pageData.stats.wordsCount.body }}
              </span>

              <span class="text-small">
                Footer:
              </span>
              <span class="text-medium">
                {{ pageData.stats.wordsCount.footer }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <input id="tabtwo" type="radio" name="tabs">
      <label for="tabtwo">Headings <span v-if="headingsErrorsCount > 0" class="badge">{{ headingsErrorsCount }}</span></label>
      <div class="tab">
        <div class="">
          <div v-for="lvl in 6" :key="lvl" class="flex gap-2">
            <div class="headings-wrap">
              <div class="row-label text-gray-400">
                H{{ lvl }}'s
              </div>
            </div>
            <div class="headings-block flex-grow">
              <div v-for="(item,idx) in pageData.sections[`h${lvl}`].items" :key="idx" class="row-block_divider">
                <div class="flex justify-between">
                  <div class="text-medium">
                    {{ item.text }}
                  </div>
                  <div>
                    <IconShowElement @click="showElement(`h${lvl}`,idx)" />
                  </div>
                </div>
              </div>
            </div>
            <div v-for="error in pageData.sections[`h${lvl}`].errors" :key="error" class="warning-message">
              <div class="text-small">
                {{ error }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <input id="tabthree" type="radio" name="tabs">
      <label for="tabthree">Links <span v-if="linksErrorsCount > 0" class="badge">{{ linksErrorsCount }}</span></label>
      <div class="tab">
        <div class="">
          <div class="w-layout-grid">
            <div class="content-block">
              <div class="row-label text-gray-400">
                Link Count:
              </div>
            </div>
            <div class="content-block">
              <span class="text-small">Nav:</span>
              <span class="text-medium">
                {{ pageData.stats.linksCount.nav }}
              </span>

              <span class="text-small">Body:</span>
              <span class="text-medium">
                {{ pageData.stats.linksCount.body }}
              </span>

              <span class="text-small">Footer:</span>
              <span class="text-medium">
                {{ pageData.stats.linksCount.footer }}
              </span>
            </div>
          </div>

          <div class="">
            <div class="content-block">
              <div v-for="(item,idx) in pageData.sections.link.items" :key="idx" class="row-block_divider">
                <div class="w-layout-grid is-link text-medium">
                  <div v-if="!item.text && item.src">
                    [img]{{ item.alt }}
                  </div>
                  <div v-else-if="!item.text">
                    [svg/no text]
                  </div>

                  <div v-else>
                    {{ item.text }}
                  </div>
                  <div class="">
                    {{ item.href }}
                  </div>

                  <IconShowElement @click="showElement('a', idx)" />
                </div>
                <!-- <div  class="flex flex-row text-sm">
                  position: <span class="">{{ item.position }}</span>
                  <span v-if="item.isExternal" class="badge">external</span>
                  <span v-if="item.isTargetBlank" class="badge ">new tab</span>
                  <span v-if="item.isAnchor" class="badge ">#anchor</span>
                  <span v-if="item.isPlaceholder" class="badge ">#place</span>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <input id="tabfour" type="radio" name="tabs">
      <label for="tabfour">Images <span v-if="imagesErrorsCount > 0" class="badge">{{ imagesErrorsCount }}</span></label>
      <div class="tab">
        <div class="">
          <div class="">
            <div class="content-block">
              <div v-for="(item,idx) in imgItems" :key="idx" class="row-block_divider">
                <div class="flex gap-2 justify-between">
                  <img :src="item.src" :alt="item.alt" style="width: 300px" />
                  <div class="flex-col">
                    <div v-for="error in item.errors" :key="error">
                      <div class="warning-message text-small">
                        {{ error }}
                      </div>
                    </div>
                  </div>
                  <span>
                    {{ item.alt }}
                  </span>
                  <IconShowElement @click="showElement('img',idx)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <label @click="emit('reload')">↻</label>
    </div>

    <!-- <div class="w-[300px] px-4 py-5 text-center text-gray-700">
      <button class="btn mt-2" @click="reload">
        reload
      </button>
    </div>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PageData, sectionErrorsCount } from '~/logic'
import IconShowElement from '~/popup/IconShowElement.vue'

const props = defineProps<{
  pageData: PageData
}>()

const emit = defineEmits<{
  (e: 'show-element', value: { selector: string; idx?: number }): void
  (e: 'reload'): void
}>()

// const hoveredLink = ref(undefined as number | undefined)
const pageData = computed(() => props.pageData)
const imgItems = computed(() => pageData.value?.sections.img.items.filter(el => el.errors) ?? [])
const showElement = (selector: string, idx?: number) => { emit('show-element', { selector, idx }) }
const metaErrorsCount = computed(() => pageData.value == null
  ? 0
  : [
    pageData.value.sections.title,
    pageData.value.sections.description,
    pageData.value.sections.ogImage,
    pageData.value.sections.ogTitle,
  ].map(el => sectionErrorsCount(el)).reduce((accum, value) => accum + value, 0))
const headingsErrorsCount = computed(() => pageData.value == null
  ? 0
  : [
    pageData.value.sections.h1,
    pageData.value.sections.h2,
    pageData.value.sections.h3,
    pageData.value.sections.h4,
    pageData.value.sections.h5,
    pageData.value.sections.h6,
  ].map(el => sectionErrorsCount(el)).reduce((accum, value) => accum + value, 0))
const imagesErrorsCount = computed(() => pageData.value == null
  ? 0
  : [
    pageData.value.sections.img,
  ].map(el => sectionErrorsCount(el)).reduce((accum, value) => accum + value, 0))
const linksErrorsCount = computed(() => pageData.value == null
  ? 0
  : [
    pageData.value.sections.link,
  ].map(el => sectionErrorsCount(el)).reduce((accum, value) => accum + value, 0))

</script>

<style>

.tabs {
  display: flex;
  flex-wrap: wrap;
}
.tabs label {
  order: 1;
  display: block;
  padding: .6rem 1rem;
  /* margin-right: 0.2rem; */
  cursor: pointer;
  background: #90CAF9;
  font-weight: bold;
  transition: background ease 0.2s;
  position: sticky;
  top: 0px;
}
.tabs .tab {
  order: 99;
  flex-grow: 1;
  width: 100%;
  display: none;
  padding: .8rem;
  background: #fff;
}
.tabs input[type="radio"] {
  display: none;
}
.tabs input[type="radio"]:checked + label {
  background: #fff;
}
.tabs input[type="radio"]:checked + label + .tab {
  display: block;
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  background-color: silver;
  white-space: nowrap;
  font-size: 0.75rem;
}

/* ==========================================================================
   Start of custom Webflow CSS
   ========================================================================== */
.w-layout-grid {
  display: -ms-grid;
  display: grid;
  grid-auto-columns: 1fr;
  -ms-grid-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  -ms-grid-rows: auto auto;
  grid-template-rows: auto auto;
  grid-row-gap: 16px;
  grid-column-gap: 16px;
}

body {
  font-family: Roboto, sans-serif;
  color: #333;
  font-size: 1rem;
  line-height: 1;
}

.category-block {
  display: flex;
  flex-direction: row;
}

.category-block-title {

}
.category-block-content {
  flex-grow: 1;
}
.text-error {

}

/* .image-wrap {
  position: relative;
  padding-top: 60%;
}

.image {
  position: absolute;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
} */

.section {
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
}

.grid {
  -ms-grid-columns: 1fr;
  grid-template-columns: 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

.row {
  margin-bottom: 0.8rem;
  padding: 0.8rem 0.4rem;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  grid-column-gap: 0.4rem;
  grid-row-gap: 0.4rem;
  /* -ms-grid-columns: 0.25fr 1fr 2rem;
  grid-template-columns: 0.25fr 1fr 2rem; */

  grid-template-columns: 1fr 7fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
  border-radius: 5px;
  background-color: #fff;
}

.row.is-load-time {
  -ms-grid-columns: 1.75fr 0.5fr 1.5fr 0.5fr;
  grid-template-columns: 1.75fr 0.5fr 1.5fr 0.5fr;
}

.row.is-meta {
  grid-template-columns: 0.25fr 1fr;
}

.row.is-headings {
  grid-template-columns: 1fr 7fr;
}

.row.is-headings.is-red {
  -ms-grid-rows: auto auto;
  grid-template-rows: auto auto;
  border-style: solid;
  border-width: 1px;
  border-color: #cc4545;
  background-color: #fceaea;
}

.row.is-content {
  -ms-grid-columns: 0.5fr 1fr;
  grid-template-columns: 0.5fr 1fr;
}

.is-link {
  grid-template-columns: 4fr 4fr 1fr;
}

.row.is-indexable {
  -ms-grid-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
}

.row-label {
  font-size: 1rem;
  line-height: 1;
  font-weight: 500;
}

.row-label.is-green {
  color: #18a321;
}

.row-label.is-orange {
  color: #ff7b00;
}

.link {
  font-size: 0.8rem;
}

.text-medium {
  font-size: 0.8rem;
  line-height: 1.4;
  font-weight: 500;
}

.section-heading {
  display: inline-block;
  margin-bottom: 0.8rem;
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
  background-color: #606596;
  color: #fff;
  font-size: 1rem;
  line-height: 1;
}

.section-heading.is-green {
  color: #18a321;
}

.section-heading.is-orange {
  color: #ff7b00;
}

.text-small {
  font-size: 0.6rem;
  line-height: 1.2;
}

.row-block_divider {
  margin-bottom: 0.4rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #f3f3f5;

}
.row.is-auto {
  grid-template-columns: auto;
  justify-content: space-between;
}
.row-block_divider.is-last {
  margin-bottom: 0rem;
  padding-bottom: 0rem;
  border: 1px none #000;
}

.headings-wrap {
  height: 100%;
}

.warning-message {
  margin-top: 0.4rem;
  padding: 0.4rem;
  border-radius: 5px;
  background-color: #cc4545;
  color: #fff;
  font-weight: 500;
}

.content-grid {
  display: -ms-grid;
  display: grid;
  margin-bottom: 0.4rem;
  grid-auto-columns: 1fr;
  grid-column-gap: 0.8rem;
  grid-row-gap: 0.8rem;
  -ms-grid-columns: 0.25fr 1fr;
  grid-template-columns: 0.25fr 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

.link-grid {
  display: -ms-grid;
  display: grid;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  grid-auto-columns: 1fr;
  grid-column-gap: 0.8rem;
  grid-row-gap: 0rem;
  -ms-grid-columns: 2.75fr 0.25fr;
  grid-template-columns: 2.75fr 0.25fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

</style>
