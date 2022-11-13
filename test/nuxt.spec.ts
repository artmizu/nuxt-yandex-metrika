import { describe, expect, it, vi } from 'vitest'
import { $fetch, createPage, setup, useTestContext } from '@nuxt/test-utils'

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
        },
      },
    },
  })

  it('script tag is injected with propper arguments', async () => {
    const page = await $fetch('/')
    expect(page).toContain('ym("49439650", "init", {"defer":false,"clickmap":false,"trackLinks":true,"accurateTrackBounce":false,"webvisor":false,"ecommerce":false});')
  })

  it('goal is reached and page hit after navigation is worked', async () => {
    const page = await createPage('/?_ym_debug=1')
    const logs: string[] = []
    page.on('console', msg => logs.push(msg.text()))

    await page.waitForEvent('console')
    await page.waitForEvent('console')
    await page.waitForEvent('console')

    expect(logs).toContain('Reach goal. Counter: 49439650. Goal id: zzz')
    expect(logs).toContain('PageView. Counter 49439650. URL: /?_ym_debug=1. Referrer: /?_ym_debug=1')

    await page.click('#a')
    await page.waitForEvent('console')
    expect(logs[3]).toEqual('PageView. Counter 49439650. URL: /a. Referrer: /?_ym_debug=1')

    await page.click('#b')
    await page.waitForEvent('console')
    expect(logs[4]).toEqual('PageView. Counter 49439650. URL: /b. Referrer: /a')
  })
})
