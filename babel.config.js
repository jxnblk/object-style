module.exports = {
  presets: [],
  env: {
    test: {
      presets: [
        [ '@babel/env', { loose: true } ]
      ]
    },
    cjs: {
      presets: [
        [ '@babel/env', { loose: true } ]
      ]
    },
    esm: {
      presets: [
        [ '@babel/env', { modules: false, loose: true } ]
      ]
    }
  }
}
