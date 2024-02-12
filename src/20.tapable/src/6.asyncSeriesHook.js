const { AsyncSeriesHook } = require('tapable')

class Compiler {
  constructor() {
    this.hook = {
      asyncSeriesHook: new AsyncSeriesHook(['name', 'age']),
    }

    this.hook.asyncSeriesHook.tapAsync('event1', (name, age, cb) => {
      console.log(name, age)
      setTimeout(() => {
        cb()
      }, 3000)
    })

    this.hook.asyncSeriesHook.tapAsync('event2', (name, age) => {
      setTimeout(() => {
        console.log(name, age)
      }, 3000)
    })
  }
}

const c = new Compiler()

c.hook.asyncSeriesHook.callAsync('ice', 20)
