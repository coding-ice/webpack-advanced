const { SyncHook } = require('tapable')

class Compiler {
  constructor() {
    this.hook = {
      syncHook: new SyncHook(['name', 'age']),
    }

    this.hook.syncHook.tap('event1', (name, age) => {
      console.log(name, age)
    })
  }
}

const c = new Compiler()

c.hook.syncHook.call('ice', 20)
