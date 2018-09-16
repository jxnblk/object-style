
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
```

MIT License
