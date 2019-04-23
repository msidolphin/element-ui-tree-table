# element-ui-tree-table

> 扩展ElementUI表格组件，支持树状结构

## TODO

 - [ ] 展开图标自定义


## 安装

```bash
npm install element-ui-tree-table -S
```

## 使用方式

> 项目依赖于[Element-UI](https://github.com/ElemeFE/element)，您需要先进行引入

### 引入
```javascript
import TreeTableComponent from 'element-ui-tree-table'
import 'element-ui-tree-table/index.css'
Vue.use(TreeTableComponent, {
    prefix: 'i' // 可选
})
```

### 使用

[测试数据](https://github.com/msidolphin/element-ui-tree-table/blob/master/src/components/data.js)

```vue
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
```

## 配置项

| 属性 | 类型 | 说明 | 默认值 |
| :------ | :------ | :------ | --- |
| data | Array | 数据源, 要求指定一个rowKey属性，唯一标识该行 | - |
| columns | Array | 配置索引列，选择列和展开列 | - |
| 原表格配置项 | - | 参考element-ui文档 | - |

### columns配置项
注意：第一个type不为index和selection的元素将被视为展开按钮放置列

| 属性 | 类型 | 说明 | 可选值 |
| :------ | :------ | :------ | --- |
| type | String | 对应列的类型，如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引 | selection/index |
| label | String | 显示的标题| - |
| prop | String | 对应列内容的字段名，也可以使用 property 属性 | - |
| align | String | 对齐方式 | left/center/right|
| width | String | 对应列的宽度 | - |

## 事件

> 参考element-ui文档
