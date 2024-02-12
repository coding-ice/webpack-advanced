const { SyncBailHook } = require('tapable')

class Compiler {
  constructor() {
    this.hook = {
      syncBailHook: new SyncBailHook(['name', 'age']),
    }

    this.hook.syncBailHook.tap('event1', (name, age) => {
      console.log(name, age)
      // return name
    })

    this.hook.syncBailHook.tap('event2', (name, age) => {
      console.log(name, age)
    })
  }
}

const c = new Compiler()

c.hook.syncBailHook.call('ice', 20)
