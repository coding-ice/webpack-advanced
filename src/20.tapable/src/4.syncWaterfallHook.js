const { SyncWaterfallHook } = require('tapable')

class Compiler {
  constructor() {
    this.hook = {
      syncWaterfallHook: new SyncWaterfallHook(['name', 'age']),
    }

    this.hook.syncWaterfallHook.tap('event1', (name, age) => {
      console.log(name, age)

      return 'fullname:' + name
    })
    this.hook.syncWaterfallHook.tap('event2', (name, age) => {
      console.log(name, age)
    })
  }
}

const c = new Compiler()

c.hook.syncWaterfallHook.call('ice', 20)
