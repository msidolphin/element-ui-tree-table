let data = [
  {
    rowKey: 1,
    name: '技术岗',
    leader: '张三',
    $expanded: true,
    createTime: '2018-07-24',
    expr: '',
    date: '26天',
    children: [
      {
        rowKey: 11,
        name: '后端开发',
        leader: '李四',
        createTime: '2018-07-24',
        expr: '',
        date: '26天',
        children: [
          {
            rowKey: 111,
            name: 'java工程师',
            leader: '李小四',
            createTime: '2018-07-24',
            expr: '3-5年',
            date: '26天'
          },
          {
            rowKey: 112,
            name: 'Go开发工程师',
            leader: '李小五',
            createTime: '2018-07-24',
            expr: '5-10年',
            date: '26天'
          },
          {
            rowKey: 113,
            name: '数据挖掘',
            leader: '李小六',
            createTime: '2018-07-24',
            expr: '5-10年',
            date: '26天'
          }
        ]
      },
      {
        rowKey: 12,
        name: '前端开发',
        leader: '王五',
        createTime: '2018-07-24',
        expr: '',
        date: '26天',
        children: [
          {
            rowKey: 121,
            name: 'web前端',
            leader: '王小五',
            createTime: '2018-07-24',
            expr: '',
            date: '26天',
            children: [
              {
                rowKey: 1211,
                name: '初级web前端',
                leader: '王小小五',
                createTime: '2018-07-24',
                expr: '1年以下',
                date: '26天'
              },
              {
                rowKey: 1212,
                name: '中级web前端',
                leader: '王小小六',
                createTime: '2018-07-24',
                expr: '1-3年',
                date: '26天'
              },
              {
                rowKey: 1213,
                name: '高级web前端',
                leader: '王小小七',
                createTime: '2018-07-24',
                expr: '3年以上',
                date: '26天'
              }
            ]
          },
          {
            rowKey: 122,
            name: '短视频web前端',
            leader: '王小六',
            createTime: '2018-07-24',
            expr: '3-5年',
            date: '26天'
          }
        ]
      },
      {
        rowKey: 13,
        name: '测试',
        leader: '赵六',
        createTime: '2018-07-24',
        expr: '',
        date: '26天',
        children: [
          {
            rowKey: 131,
            name: '初级测试工程师',
            leader: '赵小六',
            createTime: '2018-07-24',
            expr: '1年以内',
            date: '26天'
          },
          {
            rowKey: 132,
            name: '中测试工程师',
            leader: '赵小七',
            createTime: '2018-07-24',
            expr: '1-3年',
            date: '26天'
          },
          {
            rowKey: 133,
            name: '高级测试工程师',
            leader: '赵小八',
            createTime: '2018-07-24',
            expr: '3年及以上',
            date: '26天'
          }
        ]
      },
      {
        rowKey: 14,
        name: '运维',
        leader: '孙七',
        createTime: '2018-07-24',
        expr: '',
        date: '26天',
        children: [
          {
            rowKey: 141,
            name: '运维工程师',
            leader: '孙小七',
            createTime: '2018-07-24',
            expr: '3年及以上',
            date: '26天'
          },
          {
            rowKey: 142,
            name: '运维开发工程师',
            leader: '孙小八',
            createTime: '2018-07-24',
            expr: '3年及以上',
            date: '26天'
          },
          {
            rowKey: 143,
            name: '系统工程师',
            leader: '孙小九',
            createTime: '2018-07-24',
            expr: '3年及以上',
            date: '26天'
          },
          {
            rowKey: 144,
            name: '网络工程师',
            leader: '孙小十',
            createTime: '2018-07-24',
            expr: '3年及以上',
            date: '26天'
          }
        ]
      },
      {
        rowKey: 15,
        name: '算法',
        leader: '周八',
        createTime: '2018-07-24',
        expr: '',
        date: '26天',
        children: [
          {
            rowKey: 151,
            name: '视觉算法工程师',
            leader: '周小八',
            createTime: '2018-07-24',
            expr: '3年及以上',
            date: '26天'
          },
          {
            rowKey: 144,
            name: '图像算法工程师',
            leader: '周小九',
            createTime: '2018-07-24',
            expr: '3年及以上',
            date: '26天'
          }
        ]
      }
    ]
  },
  {
    rowKey: 2,
    name: '设计岗',
    leader: '吴九',
    $expanded: true,
    createTime: '2018-07-24',
    expr: '',
    date: '26天',
    children: [
      {
        rowKey: 21,
        name: '视觉设计',
        leader: '吴九',
        createTime: '2018-07-24',
        expr: '',
        date: '26天',
        children: [
          {
            rowKey: 211,
            name: '视觉设计师',
            leader: '吴小九',
            createTime: '2018-07-24',
            expr: '1-3年',
            date: '26天'
          },
          {
            rowKey: 212,
            name: '网页设计师',
            leader: '吴小十',
            createTime: '2018-07-24',
            expr: '3-5年',
            date: '26天'
          }
        ]
      },
      {
        rowKey: 22,
        name: '交互设计/用户体验',
        leader: '郑十',
        createTime: '2018-07-24',
        expr: '',
        date: '26天',
        children: [
          {
            rowKey: 221,
            name: '交互设计师',
            leader: '郑小⑩',
            createTime: '2018-07-24',
            expr: '5-10年',
            date: '24天'
          }
        ]
      }
    ]
  }
]

export default data
