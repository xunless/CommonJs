module.exports = {
  title: '诚毅物联网',
  description: '前端常用方法汇总',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: `/favicon.ico`
      }
    ]
  ],
  dest: './docs/.vuepress/dist',
  ga: '',
  evergreen: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/Fun/' },
      {
        text: '使用手册',
        link: '/about/'
      }
    ],
    sidebarDepth: 2,
    sidebar: 'auto'
    // sidebar: [
    //   {
    //     title: '后台管理系统',
    //     collapsable: false,
    //     children: ['/Admin/']
    //   },
    //   {
    //     title: '公众号',
    //     collapsable: false,
    //     children: ['/Fun/']
    //   }
    // ]
  }
}
