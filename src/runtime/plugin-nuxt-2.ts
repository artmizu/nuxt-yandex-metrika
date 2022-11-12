import { MetrikaModuleParams } from './type'

export default (ctx: any, inject: any) => {
  const config: MetrikaModuleParams = ctx.$config.yandexMetrika
  inject('metrika', {
    hit: (url: string) => {
      window.ym(config.id, 'hit', url)
    },
    reachGoal: (identifyer: string) => {
      window.ym(config.id, 'reachGoal', identifyer)
    }
  })
}
