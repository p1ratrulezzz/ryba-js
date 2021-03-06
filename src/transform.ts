import { toPairs, reduce } from 'ramda'
import { DictionaryItem }  from 'text-generator-core'

/**
 * Типы правил трансформации
 */
export type TransformRule
  = | [RegExp, { [value: string]: string }]
  | [RegExp, { [value: string]: string }, { [prop: string]: any }]
export type TransformRules = { [prop: string]: TransformRule[] }

/**
 * Возвращает функцию для трансформации элементов
 * @param  {TransformRules} transformRules Правила трансформации
 * @return {Function}
 */
export function getItemTransformer(transformRules: TransformRules) {
  /**
   * Трансформирует элементы
   * @param  {object}         props  Параметры трансформации
   * @param  {DictionaryItem} target Трансформируемый элемент
   * @return {DictionaryItem}
   */
  return function transformItem(
    props: { [prop: string]: string },
    target: DictionaryItem
  ): DictionaryItem {
    const propsArr: [string, any][] = toPairs(props)

    const getPropsReducer = (transformRules: TransformRules) => {
      return (acc: DictionaryItem, prop: [string, string]): DictionaryItem => {
        const [propname, value]: string[] = prop

        const getRuleReducer = (value: string) => {
          return (acc: DictionaryItem, rule: TransformRule): DictionaryItem => {
            const [regExpr, { [value]: replacer }] = rule
            const targetRules: { [prop: string]: any } | undefined = rule[2]

            if (targetRules != null) {
              // TODO: to fp
              for (let prop in targetRules) {
                if (targetRules[prop] !== acc[1][prop]) {
                  return acc
                }
              }
            }

            return [acc[0].replace(regExpr, replacer), acc[1], acc[2]]
          }
        }

        return transformRules[propname].reduce(getRuleReducer(value), acc)
      }
    }

    const outItem: DictionaryItem = reduce(
      getPropsReducer(transformRules),
      target,
      propsArr
    )

    return outItem
  }
}
