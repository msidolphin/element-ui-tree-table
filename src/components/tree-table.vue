<template>
    <el-table ref="table"
        :data="rows"
        :row-class-name="__computeRowStyle"
        :size="size"
        :stripe="stripe"
        :border="border"
        :height="height"
        :max-height="maxHeight"
        :fit="fit"
        :show-header="showHeader"
        :highlight-current-row="heightlightCurrentRow"
        :current-row-key="currentRowKey"
        :row-style="rowStyle"
        :cell-class-name="cellClassName"
        :cell-style="cellStyle"
        :header-row-class-name="headerRowClassName"
        :header-row-style="headerRowStyle"
        :header-cell-class-name="headerCellClassName"
        :header-cell-style="headerCellStyle"
        :row-key="rowKey"
        :empty-text="emptyText"
        :default-expand-all="defaultExpandAll"
        :expand-row-keys="expandRowKeys"
        :tooltip-effect="tooltipEffect"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        :select-on-indeterminate="selectOnIndeterminate"
        :span-method="spanMethod"
        :lazy="lazy"
        :load="load"
        @select="__onSelect"
        @select-all="onSelectAll"
        @selection-change="onSelectionChange"
        @cell-mouse-enter="onCellMouseEnter"
        @cell-mouse-leave="onCellMouseLeave"
        @cell-click="onCellClick"
        @cell-dblclick="onCellDblclick"
        @row-click="onRowClick"
        @row-contextmenu="onRowContextmenu"
        @row-dblclick="onRowDblclick"
        @header-click="onHeaderClick"
        @header-contextmenu="onHeaderContextmenu"
        @sort-change="onSortChange"
        @filter-change="onFilterChange"
        @current-change="onCurrentChange"
        @header-draged="onHeaderDragend"
        @expand-change="onExpandChange">
        <template v-for="(column, index) in columns">
            <el-table-column v-if="index !== expansionIndex" :key="index"
                :label="column.label"
                :type="column.type"
                :align="column.align"
                :width="column.width"
                :prop="column.prop"></el-table-column>
            <el-table-column v-else
                :key="index"
                :label="column.label">
                <template slot-scope="scope">
                    <template v-if="!scope.row.$isLeaf">
                        <div class="trigger"
                            :class="{expanded: scope.row.$expanded}"
                            :style="`margin-left: ${scope.row.$level * 20}px;margin-top:0;margin-bottom:0`"
                            @click.stop="__toggleRowExpanded(scope.row)" >
                            <span class="trigger-btn el-icon-caret-right"></span>
                        </div><span class="trigger-text">{{scope.row[column.prop]}}</span>
                    </template>
                    <p v-else :style="`margin-left: ${scope.row.$level * 20}px;margin-top:0;margin-bottom:0`">{{scope.row[column.prop]}}</p>
                </template>
            </el-table-column>
        </template>
        <slot/>
    </el-table>
</template>

<script>
export default {
  name: 'tree-table',
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    idKey: {
      type: String,
      default: 'rowKey'
    },
    // element ui table配置 start
    height: {
      type: [String, Number]
    },
    maxHeight: {
      type: [String, Number]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    },
    fit: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    heightlightCurrentRow: {
      type: Boolean,
      default: true
    },
    currentRowKey: {
      type: [String, Number]
    },
    rowStyle: {
      type: [Function, Object]
    }, // rowClass 不支持
    cellClassName: {
      type: [Function, String]
    },
    cellStyle: {
      type: [Function, Object]
    },
    headerRowClassName: {
      type: [Function, String]
    },
    headerRowStyle: {
      type: [Function, Object]
    },
    headerCellClassName: {
      type: [Function, String]
    },
    headerCellStyle: {
      type: [Function, Object]
    },
    rowKey: {
      type: [Function, String]
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    expandRowKeys: {
      type: Array
    },
    defaultSort: {
      type: Object
    },
    tooltipEffect: {
      type: String,
      default: 'dark'
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    sumText: {
      type: String,
      default: '合计'
    },
    summaryMethod: {
      type: Function
    },
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },
    spanMethod: {
      type: Function
    },
    lazy: {
      type: Boolean
    },
    load: {
      type: Function
    }
    // element ui table配置 end
  },
  data () {
    return {
      init: false,
      rows: [],
      expandedList: [], // 记录所有展开行
      selectionList: [] // 记录选中的行
    }
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler (val) {
        this.rows = []
        this.__columns2TableData(val, this.rows)
        this.__setSelected()
        this.init = true
      }
    }
  },
  computed: {
    /**
     * @dscription 展开列索引
     * 规则：column的type不为index、selection的第一个元素
     */
    expansionIndex () {
      let index = -1
      for (let i = 0; i < this.columns.length; ++i) {
        let column = this.columns[i]
        if (['index', 'selection'].indexOf(column.type) === -1) {
          index = i
          break
        }
      }
      return index
    },
    hasSelection () {
      return this.columns.filter(column => column.type === 'selection').length > 0
    }
  },
  methods: {
    /**
     * @description 转化为表格数据
     */
    __columns2TableData (rows, data = [], level = 0, parent = 0) {
      for (let i = 0; i < rows.length; ++i) {
        let row = rows[i]
        let $row = JSON.parse(JSON.stringify(row))
        // 关键点
        this.$set($row, '$level', level)
        this.$set($row, '$parent', parent)
        delete $row.children
        // 设置是否折叠
        if ($row.$expanded === undefined) {
          this.$set($row, '$expanded', this.expandedList.indexOf($row[this.idKey]) !== -1)
        } else {
          this.__saveExpandedPoint($row)
        }
        this.$set($row, '$isLeaf', !row.children || !row.children.length)
        this.$set($row, '$childs', row.children ? row.children.length : 0) // 孩子节点数目
        data.push($row)
        if (row.children && row.children.length) {
          this.__columns2TableData(row.children, data, level + 1, row[this.idKey])
        }
      }
    },
    __setSelected () {
      if (!this.hasSelection) return
      this.$nextTick(() => {
        this.rows.forEach(row => {
          let index = this.selectionList.findIndex(s => s[this.idKey] === row[this.idKey])
          this.toggleRowSelection(row, index !== -1)
        })
      })
    },
    /**
     * @description 获取节点的所有祖先元素
     */
    __getParents (row, parent = [], immediate = false) {
      if (!row) return
      if (immediate) parent.push(row)
      let index = this.rows.findIndex(d => d[this.idKey] === row.$parent)
      this.__getParents(this.rows[index], parent, true)
    },
    /**
     * @description 判断是否展开，逐层向上查找
     */
    __isExpanded (row) {
      if (row.$parent === 0) return
      let parents = []
      this.__getParents(row, parents)
      return parents.filter(p => p.$expanded).length === parents.length
    },
    /**
     * @description 计算行样式
     */
    __computeRowStyle ({row, rowIndex}) {
      if (row.$parent === 0) return ''
      let isExpanded = this.__isExpanded(row)
      if (!isExpanded) {
        return 'hidden'
      } else return ''
    },
    /**
     * @description 展开切换
     */
    __toggleRowExpanded (row, collapse = undefined) {
      this.$set(row, '$expanded', !row.$expanded)
      this.$emit('trigger', row.$expanded)
      this.__saveExpandedPoint(row)
    },
    /**
     * @description 保存或删除展开行
     */
    __saveExpandedPoint (row) {
      if (row.$expanded) {
        this.expandedList.push(row[this.idKey])
      } else {
        let index = this.expandedList.findIndex(item => item === row[this.idKey])
        if (index !== -1) this.expandedList.splice(index, 1)
      }
    },
    __handleParentNodeSelection () {

    },
    // element ui 表格事件 start
    __onSelect (selection, row) {
      let checked = selection.indexOf(row) !== -1
      // 在selection找出自己及所有的兄弟节点
      let brothers = selection.filter(s => s.$parent === row.$parent)
      let index = this.rows.findIndex(r => r[this.idKey] === row.$parent)
      let parent = this.rows[index]
      if (parent) {
        // 逐层处理祖先节点
        // 如果selection中兄弟节点数目等于父节点$childs数量，那么父节点设置为全选
        let parentChecked = brothers.length === parent.$childs
        const handleParentChecked = (row, checked) => {
          if (!row) return
          this.toggleRowSelection(row, checked)
          if (row.$parent === 0) return
          let index = this.rows.findIndex(r => r[this.idKey] === row.$parent)
          let p = this.rows[index]
          let b = selection.filter(s => s.$parent === row.$parent)
          // 逻辑同上
          handleParentChecked(p, b.length === p.$childs)
        }

        handleParentChecked(parent, parentChecked)
      }
      // 如果row不是叶子节点，要处理全选情况
      if (!row.$isLeaf) {
        // 递归所有子节点
        const handleChildChecked = (row, checked) => {
          this.toggleRowSelection(row, checked)
          if (!row.$isLeaf) {
            let childs = this.rows.filter(r => r.$parent === row[this.idKey])
            childs.forEach(child => {
              handleChildChecked(child, checked)
            })
          }
        }
        let childs = this.rows.filter(r => r.$parent === row[this.idKey])
        childs.forEach(child => {
          handleChildChecked(child, checked)
        })
      }
      this.selectionList = selection
      this.$emit('select', selection, row)
    },
    onSelectAll (selection) {
      this.selectionList = selection
      this.$emit('select-all', selection)
    },
    onSelectionChange (selection) {
      this.$emit('selection-change', selection)
    },
    onCellMouseEnter (row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
    },
    onCellMouseLeave (row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event)
    },
    onCellClick (row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    onCellDblclick (row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    },
    onRowClick (row, column, event) {
      this.$emit('row-click', row, column, event)
    },
    onRowContextmenu (row, column, event) {
      this.$emit('row-contextmenu', row, column, event)
    },
    onRowDblclick (row, column, event) {
      this.$emit('row-dblclick', row, column, event)
    },
    onHeaderClick (column, event) {
      this.$emit('header-click', column, event)
    },
    onHeaderContextmenu (column, event) {
      this.$emit('header-contextmenu', column, event)
    },
    onSortChange ({ column, prop, order }) {
      this.$emit('sort-change', {column, prop, order})
    },
    onFilterChange (filters) {
      this.$emit('filter-change', filters)
    },
    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow)
    },
    onHeaderDragend (newWidth, oldWidth, column, event) {
      this.$emit('header-dragend', newWidth, oldWidth, column, event)
    },
    onExpandChange (row, expandedRows) {
      this.$emit('expand-change', row, expandedRows)
    },
    // element ui 表格事件 end
    // element ui 表格方法 start
    clearSelection () {
      this.$refs.table.clearSelection()
    },
    toggleRowSelection (row, selected) {
      if (this.$refs.table) this.$refs.table.toggleRowSelection(row, selected)
    },
    toggleAllSelection () {
      this.$refs.table.toggleAllSelection()
    },
    toggleRowExpansion (row, expanded) {
      this.$refs.table.toggleRowExpansion(row, expanded)
    },
    setCurrentRow (row) {
      this.$refs.table.setCurrentRow(row)
    },
    clearSort () {
      this.$refs.table.clearSort()
    },
    clearFilter (columnKey) {
      this.$refs.table.clearFilter()
    },
    doLayout () {
      this.$refs.table.doLayout()
    },
    sort (prop, order) {
      this.$refs.table.sort(prop, order)
    }
    // element ui 表格方法 end
  }
}
</script>

<style>
.hidden {
    display: none;
}
.trigger {
    width:10px;
    height:10px;
    position:relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.trigger-btn {
    display: inline-block;
    cursor: pointer;
}
.trigger.expanded .trigger-btn {
    transform: rotate(90deg);
}
.trigger-text {
    margin-left: 4px;
    display: inline-flex;
    align-items: center;
}
</style>
