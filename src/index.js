import hash from 'fnv1a'

const defaultHash = ({ property, value, descendants, media }) => 'x' + hash(property + value + descendants + media).toString(36)

const hyphenate = s =>
  s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()

const createRule = (className, property, value, descendants, media) => {
  const selector = '.' + className + descendants
  const rule = selector + '{' + hyphenate(property) + ':' + value + '}'
  if (!media) return rule
  return media + '{' + rule + '}'
}

const AT_REG = /^@/
const AMP = /&/g

const parse = (obj, descendants, media, opts) => {
  const rules = []
  const classNames = []
  for (const key in obj) {
    const value = obj[key]
    if (value === null || value === undefined) continue
    switch (typeof value) {
      case 'object':
        if (AT_REG.test(key)) {
          const { className, css } = parse(value, descendants, key, opts)
          classNames.push(className)
          rules.push(css)
        } else {
          const child = key.replace(AMP, '')
          const { className, css } = parse(value, descendants + child, media, opts)
          classNames.push(className)
          rules.push(css)
        }
        continue
      case 'number':
      case 'string':
        const className = (opts.hash || defaultHash)({ property: key, value, descendants, media })
        const rule = createRule(className, key, value, descendants, media)
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

export default (obj, opts = {}) => {
  if (!obj || typeof obj.hash === 'function') {
    throw new Error('object-style invoked without a mandatory styles object.')
  }
  return parse(obj, '', '', opts)
}
