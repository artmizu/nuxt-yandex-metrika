import { describe, it, expect, vi } from 'vitest'
import { setup, $fetch, createPage, useTestContext } from '@nuxt/test-utils'

describe('module tests', async () => {
  await setup({
    fixture: 'fixture/nuxt-3',
    browser: true,
    nuxtConfig: {
      yandexMetrika: {
        id: '49439650',
        noscript: true,
        initParams: {
          defer: false,
          clickmap: false,
          trackLinks: true,
          accurateTrackBounce: false,
          webvisor: false,
          ecommerce: false,
        }
      }
    }
  })

  it('script tag is injected with propper arguments', async () => {
    const page = await $fetch('/')
    expect(page).toContain('ym("49439650", "init", {"defer":false,"clickmap":false,"trackLinks":true,"accurateTrackBounce":false,"webvisor":false,"ecommerce":false});')
  })

  it('goal is reached', async () => {
    const page = await createPage('/?_ym_debug=1')
    const logs: string[] = []
    page.on('console', msg => logs.push(msg.text()))

    await page.waitForEvent('console')
    await page.waitForEvent('console')

    expect(logs[1]).toEqual('Reach goal. Counter: 49439650. Goal id: zzz')
  })
})