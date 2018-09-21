
# object-style

Convert style objects into CSS rules and classNames

- Framework agnositic
- One dependency
- Small (< 0.8 kb)
- Supports pseudoclasses
- Supports media queries

```sh
npm i object-style
```

```js
import objectStyle from 'object-style'

const { className, css } = objectStyle({
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
```

## API

```js
type ObjectStyle = (styles: Object, ?Options) => Result
```

```js
type HashFunctionInfo = {
  // CSS property.
  property: string,
  // CSS value.
  value: string,
  // Nested selectors.
  descendants: string,
  // Media query.
  media: string,
}
// object-style accepts a custom hash function to generate the classNames.
type HashFunction = (HashFunctionInfo) => string

type Options = { hash?: HashFunction }

type Result = {
  // The computed classNames, space separated.
  className: string,
  // The computed CSS rules as array.
  rules: Array<string>,
  // The computed CSS rules as string.
  css: string,
}
```

MIT License
