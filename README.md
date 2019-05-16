# element-ui-tree-table

> 扩展ElementUI表格组件，支持树状结构


## 安装

```bash
npm install element-ui-tree-table -S
```

## 使用方式

> 项目依赖于[Element-UI](https://github.com/ElemeFE/element)，您需要先进行引入

### 引入
```javascript
import TreeTableComponent from 'element-ui-tree-table'
import 'element-ui-tree-table/dist/index.css'
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
| data | Array | 数据源, 要求默认指定一个rowKey属性，唯一标识该行 | - |
| id-key | String | 数据源唯一索引 | rowKey |
| columns | Array | 配置索引列，选择列和展开列 | - |
| icon | String | 展开图标 | el-icon-caret-right | - |
| trigger-class | String | 展开按钮类 | - |
| 原表格配置项 | - | 参考element-ui文档 | - |

### columns配置项
注意：
* 第一个type不为index和selection的元素将被视为展开按钮放置列
* 只能有一个展开列，多余的会忽略

#### 展开列配置

| 属性 | 类型 | 说明 | 可选值 |
| :------ | :------ | :------ | --- |
| label | String | 显示的标题| - |
| prop | String | 对应列内容的字段名，也可以使用 property 属性 | - |
| align | String | 对齐方式 | left/center/right|
| width | String | 对应列的宽度 | - | | |
| fixed | String, Boolean | 列是否固定在左侧或者右侧，true 表示固定在左侧 | |
| render-header | Function(h, { column, $index }) | 列标题 Label 区域渲染使用的 Function | |
| class-name | String | 列的 className| |
| label-class-name | String | 当前列标题的自定义类名| |
|show-overflow-tooltip | Boolean |  当内容过长被隐藏时显示 tooltip | |
| min-width | String | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | |
| header-align | String | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | left/center/right |
| resizable	 | Boolean | 对应列是否可以通过拖动改变宽度（需要设置 border 属性为真） | |


#### 普通列配置

| 属性 | 类型 | 说明 | 可选值 |
| :------ | :------ | :------ | --- |
| type | String | 对应列的类型，如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引 | selection/index |
| label | String | 显示的标题| - |
| prop | String | 对应列内容的字段名，也可以使用 property 属性 | - |
| align | String | 对齐方式 | left/center/right|
| width | String | 对应列的宽度 | - | | |
| fixed | String, Boolean | 列是否固定在左侧或者右侧，true 表示固定在左侧 | |
| render-header | Function(h, { column, $index }) | 列标题 Label 区域渲染使用的 Function | |
| class-name | String | 列的 className| |
| label-class-name | String | 当前列标题的自定义类名| |
| selectable | Function(row, index) |   仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | |
|show-overflow-tooltip | Boolean |  当内容过长被隐藏时显示 tooltip | |
| min-width | String | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | |
| header-align | String | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | left/center/right |
| resizable	 | Boolean | 对应列是否可以通过拖动改变宽度（需要设置 border 属性为真） | |


## 事件

> 参考element-ui文档
