const { createSSRApp, h } = require('vue')
const { renderToString } = require('@vue/server-renderer')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const component = {
  template: '<h1>Hello {{ name }}</h1>',
  props: {
    name: String
  }
}

const createApp = (...args) => createSSRApp({ render: () => h(...args) })

const run = async () => {
  const html = await renderToString(createApp(component, { name: 'world' }))
  return html
}

const loop = async () => {
  const startMem = Math.round((process.memoryUsage().rss / 1048576) * 100) / 100;
  console.log("STARTING", startMem)

  for (let i = 0; i < 100000; i++) {
    await run()
  }

  const endMem = Math.round((process.memoryUsage().rss / 1048576) * 100) / 100;
  console.log("ENDING", endMem)

  console.log("SLEEPING")
  await sleep(10000)

  const endMemCleaned = Math.round((process.memoryUsage().rss / 1048576) * 100) / 100;
  console.log("ENDING", endMemCleaned)
}

loop()

