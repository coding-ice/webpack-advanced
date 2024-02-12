const { AsyncParallelHook } = require('tapable')

class Compiler {
  constructor() {
    this.hook = {
      asyncParallelHook: new AsyncParallelHook(['name', 'age']),
    }

    this.hook.asyncParallelHook.tapAsync('event1', (name, age) => {
      setTimeout(() => {
        console.log(name, age)
      }, 3000)
    })

    this.hook.asyncParallelHook.tapAsync('event2', (name, age) => {
      setTimeout(() => {
        console.log(name, age)
      }, 3000)
    })
  }
}

const c = new Compiler()

c.hook.asyncParallelHook.callAsync('ice', 20)
