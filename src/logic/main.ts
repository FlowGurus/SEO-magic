
// import { finder } from '@medv/finder'

export const setIconBadgeErrorCount = (val: number | string) => {
  const text = typeof val === 'string'
    ? val
    : val > 99
      ? '99+'
      : val === 0
        ? 'ok'
        : val.toString()
  try {
    browser.browserAction.setBadgeBackgroundColor({ color: text === 'ok' ? 'rgb(148, 240, 99)' : text === '...' ? 'yellow' : 'rgb(240, 99, 99)' })
    browser.browserAction.setBadgeText({ text })
  }
  catch (ex) {
    console.error(ex)
  }
}
const isElementVisible = (element: HTMLElement) => {
  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)
}

export const showElement = (selector: string, idx = 0) => {
  const items = document.querySelectorAll(selector)
  if (items.length === 0) return `No items found by selector "${selector}"`

  const element = items[idx] as HTMLElement
  if (!element) return `No items found by selector "${selector}" and idx="${idx}"`
  if (!isElementVisible(element)) {
    // eslint-disable-next-line no-console
    console.log(element)
    return 'Element is invisible at the moment. Look developer console for details'
  }
  element.scrollIntoView({ behavior: 'smooth' })
  element.animate([
    { transform: 'translate3d(0, -1px, 0)' },
    { transform: 'translate3d(0, 2px, 0)' },
    { transform: 'translate3d(0, -4px, 0)' },
    { transform: 'translate3d(0, 4px, 0)' },
    { transform: 'translate3d(0, -4px, 0)' },
    { transform: 'translate3d(0, 4px, 0)' },
    { transform: 'translate3d(0, -4px, 0)' },
    { transform: 'translate3d(0, 4px, 0)' },
    { transform: 'translate3d(0, -4px, 0)' },
    { transform: 'translate3d(0, 2px, 0)' },
    { transform: 'translate3d(0, -1px, 0)' },
  ], { duration: 1000 })
  return true
}

const isExternalURL = (url: string) => {
  if (!url.trim()) return false
  if (url.startsWith('/')) return false
  try {
    return new URL(url).origin !== location.origin
  }
  catch (ex) {
    console.error(`Checking isExternalURL("url = ${url}")`, ex)
    return true
  }
}
export interface PageDataElement {
  errors?: string[]
}
export interface PageDataTextElement extends PageDataElement {
  text: string | null
}
export interface PageDataImageElement extends PageDataElement {
  src: string | null
  alt: string | null
  complete: boolean
  naturalHeight: number
  // selector: string
}

enum ElementPosition {
  Nav = 'nav',
  Body = 'body',
  Footer = 'footer',
}
export interface PageDataLinkElement extends PageDataElement {
  text: string | null
  src?: string | null
  alt?: string | null
  href: string | null
  position: ElementPosition
  isAnchor: boolean
  isExternal: boolean
  isTargetBlank: boolean
  isPlaceholder: boolean
  // selector: string
}
export interface PageData {
  sections: {
    title: { items: PageDataTextElement[]; errors?: string[] }
    description: { items: PageDataTextElement[]; errors?: string[] }
    ogImage: { items: PageDataTextElement[]; errors?: string[] }
    ogTitle: { items: PageDataTextElement[]; errors?: string[] }
    h1: { items: PageDataTextElement[]; errors?: string[] }
    h2: { items: PageDataTextElement[]; errors?: string[] }
    h3: { items: PageDataTextElement[]; errors?: string[] }
    h4: { items: PageDataTextElement[]; errors?: string[] }
    h5: { items: PageDataTextElement[]; errors?: string[] }
    h6: { items: PageDataTextElement[]; errors?: string[] }
    img: { items: PageDataImageElement[]; errors?: string[] }
    link: { items: PageDataLinkElement[]; errors?: string[] }
  }
  url: string
  origin: string
  stats: {
    errorsCount: number
    wordsCount: { nav: number; body: number; footer: number; total: number }
    linksCount: { nav: number; body: number; footer: number; total: number }
  }
}

export function sectionErrorsCount(section: {items: PageDataElement[]; errors?: string[]}) {
  return section.items.map(el => el.errors?.length ?? 0).reduce((accum, value) => accum + value, section.errors?.length ?? 0)
}

export async function getPageData(): Promise<PageData> {
  const pageData = {
    sections: {
      title: { items: [] },
      description: { items: [] },
      ogImage: { items: [] },
      ogTitle: { items: [] },
      h1: { items: [] },
      h2: { items: [] },
      h3: { items: [] },
      h4: { items: [] },
      h5: { items: [] },
      h6: { items: [] },
      img: { items: [] },
      link: { items: [] },
    },
    url: document.location.href,
    origin: document.location.origin,
    stats: {
      errorsCount: 0,
      wordsCount: { nav: 0, body: 0, footer: 0, total: 0 },
      linksCount: { nav: 0, body: 0, footer: 0, total: 0 },
    },
  } as PageData

  // console.log('title')
  document.querySelectorAll('head title').forEach((el) => {
    pageData.sections.title.items.push({ text: el.textContent })
  })

  // console.log('description')
  document.querySelectorAll('meta[name=description]').forEach((el) => {
    if (el instanceof HTMLMetaElement) pageData.sections.description.items.push({ text: el.content })
    else console.warn('Element is not HTMLMetaElement', el)
  })

  // console.log('ogTitle')
  document.querySelectorAll('meta[property~="og:title"]').forEach((el) => {
    if (el instanceof HTMLMetaElement) pageData.sections.ogTitle.items.push({ text: el.content })
    else console.warn('Element is not HTMLMetaElement', el)
  })
  // console.log('ogImage')
  document.querySelectorAll('meta[property~="og:image"]').forEach((el) => {
    if (el instanceof HTMLMetaElement) pageData.sections.ogImage.items.push({ text: el.content })
    else console.warn('Element is not HTMLMetaElement', el)
  })
  // console.log('h1')
  document.querySelectorAll('h1').forEach((el) => { pageData.sections.h1.items.push({ text: el.textContent }) })
  // console.log('h2')
  document.querySelectorAll('h2').forEach((el) => { pageData.sections.h2.items.push({ text: el.textContent }) })
  // console.log('h3')
  document.querySelectorAll('h3').forEach((el) => { pageData.sections.h3.items.push({ text: el.textContent }) })
  // console.log('h4')
  document.querySelectorAll('h4').forEach((el) => { pageData.sections.h4.items.push({ text: el.textContent }) })
  // console.log('h5')
  document.querySelectorAll('h5').forEach((el) => { pageData.sections.h5.items.push({ text: el.textContent }) })
  // console.log('h6')
  document.querySelectorAll('h6').forEach((el) => { pageData.sections.h6.items.push({ text: el.textContent }) })

  // console.log('nav,footer a')
  const links = {
    nav: Array.from(document.querySelectorAll('nav a')),
    footer: Array.from(document.querySelectorAll('footer a')),
  }

  // console.log('a')
  document.querySelectorAll('a').forEach((el) => {
    pageData.sections.link.items.push({
      text: el.textContent?.trim() ?? null,
      src: el.querySelector('img')?.src,
      alt: el.querySelector('img')?.alt,
      href: el.href.startsWith(pageData.origin) ? el.href.replace(pageData.origin, '') : el.href,
      position: (links.nav.includes(el))
        ? ElementPosition.Nav
        : (links.footer.includes(el))
          ? ElementPosition.Footer
          : ElementPosition.Body,
      isAnchor: el.href.startsWith('#'),
      isExternal: isExternalURL(el.href),
      isTargetBlank: el.target.toLowerCase() === '_blank',
      isPlaceholder: !el.href,
      // selector: finder(el),
    })
  })

  // console.log('img')
  document.querySelectorAll('img').forEach((el) => {
    pageData.sections.img.items.push({
      src: el.src,
      alt: el.alt,
      complete: el.complete,
      naturalHeight: el.naturalHeight,
      // selector: finder(el),
    })
  })

  // console.log('stats')
  // stats
  const wordsCount = (string: string): number => (string.match(/\w+/g) || []).length
  const itemsWordsCount = (selector: string): number => Array.from(document.querySelectorAll(selector))
    .map(el => Object.prototype.hasOwnProperty.call(el, 'innerText') ? wordsCount((el as HTMLElement).innerText) : 0)
    .reduce((accum, value) => accum + value, 0)

  pageData.stats.wordsCount.total = wordsCount(document.body.innerText)
  pageData.stats.wordsCount.nav = itemsWordsCount('nav')
  pageData.stats.wordsCount.footer = itemsWordsCount('footer')
  pageData.stats.wordsCount.body = pageData.stats.wordsCount.total - pageData.stats.wordsCount.nav - pageData.stats.wordsCount.footer

  pageData.stats.linksCount.total = pageData.sections.link.items.length
  pageData.stats.linksCount.nav = pageData.sections.link.items.filter(el => el.position === ElementPosition.Nav).length
  pageData.stats.linksCount.footer = pageData.sections.link.items.filter(el => el.position === ElementPosition.Footer).length
  pageData.stats.linksCount.body = pageData.stats.linksCount.total - pageData.stats.linksCount.nav - pageData.stats.linksCount.footer

  // validation
  const validateSectionHaveOneNonEmptyEntry = (section: { items: PageDataTextElement[]; errors?: string[]}) => {
    const errors = section.errors ?? []
    if (section.items.length === 0) errors.push('no occurrences found')
    else if (section.items.length > 1) errors.push('more than one occurrency found')
    else if (!section.items[0].text) errors.push('text is empty')
    if (errors.length) section.errors = errors
  }

  validateSectionHaveOneNonEmptyEntry(pageData.sections.title)
  validateSectionHaveOneNonEmptyEntry(pageData.sections.description)
  validateSectionHaveOneNonEmptyEntry(pageData.sections.ogImage)
  validateSectionHaveOneNonEmptyEntry(pageData.sections.ogTitle)
  validateSectionHaveOneNonEmptyEntry(pageData.sections.h1)

  pageData.sections.img.items.forEach((el) => {
    const errors = el.errors ?? []
    if (!el.alt) errors.push('no alt text')
    if (!el.complete || !el.naturalHeight) errors.push(`problem loading image ${el.complete} ${el.naturalHeight}`)
    if (errors.length) el.errors = errors
  })

  pageData.stats.errorsCount = Object.entries(pageData.sections).map(kv =>
    kv[0] === 'img' ? 0 : sectionErrorsCount(kv[1]),
  ).reduce((accum, value) => accum + value, 0)

  // // validator functions
  // const required = (nodeList: NodeList) => { return nodeList.length > 0 }
  // const onlyOne = (nodeList: NodeList) => { return nodeList.length === 1 }
  // // const hasAltText = (el: HTMLImageElement) => { return !!el.alt }
  // // decorator functions
  // const charCount = (node: HTMLElement) => { return node.innerText.length }

  // shadowed frame for different aspect ratio of og-image (linkedin facebook tweeter)

  // console.log(pageData)

  return pageData
}
