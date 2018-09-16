import test from 'ava'
import parse from '../src'

test('returns an object with className and css', t => {
  const { className, css } = parse()
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

test('converts numbers to pixels', t => {
  const a = parse({
    fontSize: 32
  })
  t.regex(a.css, /font-size:32px/)
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
    fontSize: 48,
    '@media screen and (min-width:40em)': {
      fontSize: 64
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
