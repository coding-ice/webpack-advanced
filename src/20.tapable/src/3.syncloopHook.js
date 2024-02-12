const { SyncLoopHook } = require('tapable')

class Compiler {
  constructor() {
    this.count = 0
    this.hook = {
      syncLoopHook: new SyncLoopHook(['name', 'age']),
    }

    this.hook.syncLoopHook.tap('event1', (name, age) => {
      if (this.count++ < 5) {
        console.log(name, age)
        return true
      }
    })
  }
}

const c = new Compiler()

c.hook.syncLoopHook.call('ice', 20)
