import type { MetrikaModuleParams } from './type'

export default (ctx: any, inject: any) => {
  const config: MetrikaModuleParams = ctx.$config.yandexMetrika

  ctx.app.router.afterEach((to: any, from: any) => {
    window.ym(config.id, 'hit', to.fullPath, {
      referer: from.fullPath,
    })
  })

  inject('metrika', {
    hit: (url: string) => {
      window.ym(config.id, 'hit', url)
    },
    reachGoal: (identifyer: string) => {
      window.ym(config.id, 'reachGoal', identifyer)
    },
  })
}
