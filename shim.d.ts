import { ProtocolWithReturn } from 'webext-bridge'
import { PageData } from '~/logic'

declare module 'webext-bridge' {
  export interface ProtocolMap {
    // define message protocol types
    // see https://github.com/antfu/webext-bridge#type-safe-protocols
    // 'tab-prev': { title: string | undefined }
    // 'get-current-tab': ProtocolWithReturn<{ tabId: number }, { title?: string }>
    'get-page-data': ProtocolWithReturn<{ reparse: boolean }, PageData >
    'show-element': ProtocolWithReturn<{ selector: string; idx?: number }, string | true >
  }
}
