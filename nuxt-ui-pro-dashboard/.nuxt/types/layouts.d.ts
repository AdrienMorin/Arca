import { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default"
declare module "../../node_modules/.pnpm/nuxt@3.10.3_@parcel+watcher@2.4.0_@types+node@20.11.19_encoding@0.1.13_eslint@8.57.0_optionat_s7d46f3i2xvimlar2kzdzkszge/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}