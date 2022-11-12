import { resolve } from 'path'
import { defu } from 'defu'
import { addPlugin, createResolver, defineNuxtModule, isNuxt2 } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import consola from 'consola'
import { name, version } from '../package.json'
import type { MetrikaModuleParams } from './runtime/type'

export interface ModuleOptions extends MetrikaModuleParams { }
export interface ModulePublicRuntimeConfig extends MetrikaModuleParams { }

// immediate return via export default brings the build errors
const module = defineNuxtModule<Partial<MetrikaModuleParams>>({
  meta: {
    name,
    version,
    configKey: 'yandexMetrika',
    compatibility: {
      nuxt: '^2.0.0 || ^3.0.0-rc.5',
    },
  },
  defaults: {
    noscript: true,
    useCDN: false,
    verbose: true,
    initParams: {
      defer: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: true,
    },
  },
  async setup(options, nuxt) {
    let moduleOptions: MetrikaModuleParams

    if (isNuxt2()) {
      moduleOptions = defu(
        nuxt.options.publicRuntimeConfig.yandexMetrika,
        options,
      )
      nuxt.options.publicRuntimeConfig.yandexMetrika = moduleOptions
    }
    else {
      moduleOptions = defu(
        nuxt.options.runtimeConfig.public.yandexMetrika,
        options,
      )
      nuxt.options.runtimeConfig.public.yandexMetrika = moduleOptions
    }

    const resolver = createResolver(import.meta.url)
    nuxt.options.build.transpile.push(await resolver.resolve('./runtime'))

    if (!nuxt.options.dev && ['production', 'test'].includes(process.env.NODE_ENV!)) {
      if (!isValid(moduleOptions)) {
        consola.error('[yandex.metrika] module cannot be initialized, please specify ID')
        return
      }
      setScriptTag(moduleOptions, nuxt)
      setNoscriptTag(moduleOptions, nuxt)
      addPlugin({ src: resolve(__dirname, `./runtime/${isNuxt2() ? 'plugin-nuxt-2' : 'plugin'}`), mode: 'client' })
    }
    else if (options.verbose === true) {
      addPlugin({ src: resolve(__dirname, `./runtime/${isNuxt2() ? 'plugin-dev-nuxt-2' : 'plugin-dev'}`), mode: 'client' })
    }
  },
})

function isValid(options: Partial<MetrikaModuleParams>): options is MetrikaModuleParams {
  return !!options.id
}

function setScriptTag(options: MetrikaModuleParams, nuxt: Nuxt) {
  if (isNuxt2()) {
    nuxt.options.head.__dangerouslyDisableSanitizersByTagID = nuxt.options.head.__dangerouslyDisableSanitizersByTagID || {}
    nuxt.options.head.__dangerouslyDisableSanitizersByTagID.metrika = ['innerHTML']
    nuxt.options.head.script = nuxt.options.head.script || []
    nuxt.options.head.script.unshift({
      hid: 'metrika',
      innerHTML: getScriptTag(options),
    })
  }
  else {
    nuxt.options.app.head.script = nuxt.options.app.head.script || []
    nuxt.options.app.head.script.unshift({
      id: 'metrika',
      innerHTML: getScriptTag(options),
    })
  }
}

function setNoscriptTag(options: MetrikaModuleParams, nuxt: Nuxt) {
  if (options.noscript) {
    if (isNuxt2()) {
      nuxt.options.head.__dangerouslyDisableSanitizers = ['noscript']
      nuxt.options.head.noscript = nuxt.options.head.noscript || []
      nuxt.options.head.noscript.unshift({
        innerHTML: getNoscript(options.id),
      })
    }
    else {
      nuxt.options.app.head.noscript = nuxt.options.app.head.noscript || []
      nuxt.options.app.head.noscript.unshift({
        innerHTML: getNoscript(options.id),
      })
    }
  }
}

function getScriptTag(options: MetrikaModuleParams) {
  const libURL = !options.useCDN ? 'https://mc.yandex.ru/metrika/tag.js' : 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js'
  const metrikaContent = `
    (function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "${libURL}", "ym");
    ym("${options.id}", "init", ${JSON.stringify(options.initParams)});
  `
  return metrikaContent.trim()
}

function getNoscript(id: string) {
  return `<div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute; left:-9999px;" alt="" /></div>`
}

export default module
