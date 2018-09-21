import test from 'ava'
import parse from '../src'

test('throws when not passing styles', t => {
  t.throws(() => {
    parse()
  })
})

test('throws when passing options as first argument', t => {
  t.throws(() => {
    parse({ hash: () => {} })
  })
})

test('returns an object with className and css', t => {
  const { className, css } = parse({})
  t.is(typeof className, 'string')
  t.is(typeof css, 'string')
})

test('returns a className and css rule', t => {
  const a = parse({
    color: 'tomato'
  })
  const REG = new RegExp('.' + a.className)
  t.regex(a.css, REG)
  t.regex(a.css, /color\:tomato/)
})

test('returns css with a media rule', t => {
  const a = parse({
    '@media screen': {
      color: 'tomato'
    }
  })
  t.regex(a.css, /\@media\sscreen/)
})

test('returns css with a psuedoclass', t => {
  const a = parse({
    '&:hover': {
      color: 'tomato'
    }
  })
  const REG = new RegExp('.' + a.className + ':hover')
  t.regex(a.css, REG)
})

test('does not convert numbers to pixels', t => {
  const a = parse({
    lineHeight: 1.5
  })
  t.regex(a.css, /line-height:1.5/)
})

test('skips null values', t => {
  const a = parse({
    color: null
  })
  t.is(a.css, '')
})

test('skips undefined values', t => {
  const a = parse({
    color: undefined
  })
  t.is(a.css, '')
})

test('snapshot', t => {
  const a = parse({
    color: 'magenta',
    backgroundColor: 'cyan',
    fontSize: '48px',
    '@media screen and (min-width:40em)': {
      fontSize: '64px'
    },
    '&:hover': {
      color: 'black'
    },
    '@media screen and (min-width:56em)': {
      '&:hover': {
        color: 'navy'
      }
    }
  })
  t.snapshot(a)
})

test('accepts a custom hashing function', t => {
  const sanitize = s => s.replace(/[^0-9a-z]/gi, '')
  const hash = info => 'test_' + Object.values(info).map(sanitize).filter(Boolean).join('-')
  const a = parse({
    color: 'magenta',
    backgroundColor: 'cyan',
    fontSize: '48px',
    '@media screen and (min-width:40em)': {
      fontSize: '64px'
    },
    '&:hover': {
      color: 'black'
    },
    '@media screen and (min-width:56em)': {
      '&:hover': {
        color: 'navy'
      }
    }
  }, { hash })
  t.snapshot(a)
})
