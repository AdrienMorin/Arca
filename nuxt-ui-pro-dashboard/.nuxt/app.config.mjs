
import { updateAppConfig } from '#app/config'
import { defuFn } from 'defu'

const inlineConfig = {
  "nuxt": {
    "buildId": "dev"
  },
  "ui": {
    "primary": "green",
    "gray": "cool",
    "colors": [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "primary"
    ],
    "strategy": "merge"
  }
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}

import cfg0 from "/Users/aziza/Desktop/Insa/INSA-LYON-4A/PLD-SMART/Arca/nuxt-ui-pro-dashboard/app.config.ts"
import cfg1 from "/Users/aziza/Desktop/Insa/INSA-LYON-4A/PLD-SMART/Arca/nuxt-ui-pro-dashboard/node_modules/.pnpm/@nuxt+ui-pro@1.0.2_axios@1.6.8_nuxt@3.10.3_@parcel+watcher@2.4.0_@types+node@20.11.19_encodin_iatrsbsja24ozpieearqoymouy/node_modules/@nuxt/ui-pro/app.config.ts"

export default /*@__PURE__*/ defuFn(cfg0, cfg1, inlineConfig)
