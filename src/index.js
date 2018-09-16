import hash from 'fnv1a'

const id = (seed) => 'x' + hash(seed).toString(36)

const hyphenate = s =>
  s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()

const createRule = (className, key, value, children, media) => {
  const selector = '.' + className + children
  const rule = selector + '{' + hyphenate(key) + ':' + value + '}'
  if (!media) return rule
  return media + '{' + rule + '}'
}

const AT_REG = /^@/
const AMP = /&/g

const parse = (obj, children = '', media) => {
  const rules = []
  const classNames = []
  for (const key in obj) {
    const value = obj[key]
    if (value === null || value === undefined) continue
    switch (typeof value) {
      case 'object':
        if (AT_REG.test(key)) {
          const { className, css } = parse(value, children, key)
          classNames.push(className)
          rules.push(css)
        } else {
          const child = key.replace(AMP, '')
          const { className, css } = parse(value, children + child, media)
          classNames.push(className)
          rules.push(css)
        }
        continue
      case 'number':
      case 'string':
        const className = id(key + value + children + (media || ''))
        const rule = createRule(className, key, value, children, media)
        classNames.push(className)
        rules.push(rule)
    }
  }

  return {
    className: classNames.join(' '),
    rules,
    css: rules.join('')
  }
}

export default (obj = {}) => parse(obj)
