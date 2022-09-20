import { isObject } from '@vue/shared'
import { sendMessage, onMessage } from 'webext-bridge'
import { Tabs } from 'webextension-polyfill'
import { PageData, setIconBadgeErrorCount } from '~/logic'

// let activeTabId, lastUrl, lastTitle

// function getTabInfo(tabId) {
//   browser.tabs.get(tabId, (tab) => {
//     if (lastUrl != tab.url || lastTitle != tab.title)
//       console.log(lastUrl = tab.url, lastTitle = tab.title)
//   })
// }

// browser.tabs.onActivated.addListener((activeInfo) => {
//   console.log('assssssss')
//   getTabInfo(activeTabId = activeInfo.tabId)
// })

// browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   console.log('assssssss')
//   if (activeTabId == tabId)
//     getTabInfo(tabId)
// })

const setIconBadgeErrorCountProxy = async(tabId: number) => {
  setIconBadgeErrorCount('...')
  const response = await sendMessage('get-page-data', {}, { context: 'content-script', tabId })
  if (response && isObject(response))
    setIconBadgeErrorCount((response as unknown as PageData).stats.errorsCount)
  else setIconBadgeErrorCount('?')
}

browser.tabs.onActivated.addListener(async(activeInfo) => {
  // sendMessage('wtf', JSON.stringify({ activeInfo }), { context: 'content-script', tabId: activeInfo.tabId })
  setIconBadgeErrorCountProxy(activeInfo.tabId)
})
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // read changeInfo data and do something with it
  // like send the new url to contentscripts.js
  // if (changeInfo.url) {
  // browser.tabs.sendMessage(tabId, {
  //   message: 'hello!',
  //   changeInfo,
  //   tab,
  // })
  // }

  if (changeInfo.status === 'complete') {
    // sendMessage('wtf', JSON.stringify({ changeInfo, tab }), { context: 'content-script', tabId })
    setIconBadgeErrorCountProxy(tabId)
  }
})

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

const previousTabId = 0

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
// browser.tabs.onActivated.addListener(async({ tabId }) => {
//   console.log(tabId)
//   if (!previousTabId) {
//     previousTabId = tabId
//     return
//   }

//   let tab: Tabs.Tab

//   try {
//     tab = await browser.tabs.get(previousTabId)
//     previousTabId = tabId
//   }
//   catch {
//     return
//   }

//   // eslint-disable-next-line no-console
//   console.log('previous tab', tab)
//   sendMessage('tab-prev', { title: tab.title }, { context: 'content-script', tabId })
// })

onMessage('get-current-tab', async() => {
  try {
    const tab = await browser.tabs.get(previousTabId)
    return {
      title: tab?.title,
    }
  }
  catch {
    return {
      title: undefined,
    }
  }
})
