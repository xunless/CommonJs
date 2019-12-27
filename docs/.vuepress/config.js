/*
 * @Desc: ---   ----
 * @Date: 2019-11-11 12:02:17
 * @LastEditors  : 王
 * @LastEditTime : 2019-12-23 11:57:47
 */
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
    ],
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js' }],
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js' }],
    ['link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css' }]
  ],
  dest: './docs/.vuepress/dist',
  ga: '',
  evergreen: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      // { text: '文档', link: '/Fun/' },
      {
        text: '公用方法',
        items: [
          { text: 'uni-app', link: '/Fun/Fun-Uni/' },
          { text: 'vue', link: '/Fun/Fun-Vue/' },
          { text: 'React', link: '/Fun/Fun-React/' },
          { text: '通用方法', link: '/Fun/Fun-Other/' }
        ]
      },
      {
        text: '公用组件',
        items: [
          { text: 'uni-app', link: '/Module/Module-Uni/' },
          { text: 'vue', link: '/Module/Module-Vue/' },
          { text: 'React', link: '/Module/Module-React/' },
          { text: '通用组件', link: '/Module/Module-Other/' },
        ]
      },
      {
        text: 'CSS使用技巧',
        link: '/Css/'
      },
      {
        text: '问题汇总',
        link: '/Issue/'
      },
      {
        text: '使用手册',
        link: '/About/'
      }
    ],
    sidebarDepth: 2,
    sidebar: 'auto'
  }
}
