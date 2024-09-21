import DmlGraph from './dml/DmlGraphOfus/index.vue'

const install = (app) => {
  app.component('DmlGraph', DmlGraph)
}


export default {
  install,
  DmlGraph
}
