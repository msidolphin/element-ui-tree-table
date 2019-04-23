<template>
  <div id="app">
    <i-tree-table :columns="columns" @select="onSelect" :data="data" border>
      <el-table-column label="负责人" prop="leader"/>
      <el-table-column label="创建时间" prop="createTime"/>
      <el-table-column label="经验要求" prop="expr">
        <template slot-scope="scope">
          <span v-if="scope.row.expr">{{scope.row.expr}}</span>
          <span v-else>————</span>
        </template>
      </el-table-column>
      <el-table-column label="发布天数" prop="date"/>
    </i-tree-table>
    <br/>
    <el-button type="primary" size="small" @click="add">增加一行</el-button>
  </div>
</template>

<script>
import data from './components/data'
export default {
  name: 'App',
  data () {
    return {
      data,
      columns: [{
        type: 'index',
        align: 'center'
      }, {
        type: 'selection',
        align: 'center'
      }, {
        label: '职位名称',
        prop: 'name'
      }],
      id: 1000
    }
  },
  methods: {
    add () {
      this.data.push({
        rowKey: this.id++,
        name: '新增行',
        leader: '管理员',
        $expanded: true,
        createTime: '2019-07-24',
        expr: '',
        date: '1天'
      })
    },
    onSelect (selection) {
      console.log(selection)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 1024px;
  margin: 0 auto;
}
</style>
