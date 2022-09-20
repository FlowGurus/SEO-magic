/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'
// import { createApp } from 'vue'
// import App from './views/App.vue'
import { getPageData, PageData, showElement } from '~/logic'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  let pageData: PageData | undefined

  const getPageDataProxy = async(reparse: boolean) => {
    if (reparse || pageData == null)
      pageData = await getPageData()

    return pageData
  }
  // communication example: send previous tab title from background page
  // onMessage('wtf', async({ data }) => {
  //   // const pd = await getPageDataProxy()
  //   // setIconBadgeErrorCount(pd.stats.errorsCount)
  //   console.info('WTFFFFF', typeof data == 'string' ? JSON.parse(data) : data)
  //   // console.info(getPageData())
  // })
  // onMessage('tab-prev', ({ data }) => {
  //   console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
  //   // console.info('TP', data)
  // })

  onMessage('show-element', async({ data }) => {
    try {
      const { selector, idx } = data
      return showElement(selector, idx)
    }
    catch (error) {
      if (error instanceof Error) return error.message
      if (typeof error === 'string') return error
      throw error
    }
  })

  onMessage('get-page-data', async({ data }) => {
    console.log('getPageDataProxy', data)
    return getPageDataProxy(data.reparse)
  })

  // mount component to context window
  // const container = document.createElement('div')
  // const root = document.createElement('div')
  // const styleEl = document.createElement('link')
  // const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  // styleEl.setAttribute('rel', 'stylesheet')
  // styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  // shadowDOM.appendChild(styleEl)
  // shadowDOM.appendChild(root)
  // document.body.appendChild(container)
  // createApp(App).mount(root)
})()
