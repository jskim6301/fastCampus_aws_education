import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Report Project",
  description: "private report project",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'MenuTestTool', link: '/menu-test-tool' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ]
      },
      {
        text: '[Update] Part2.AWS 아키텍처 설계 기본',
        // allow this group to be collapsed/expanded in the sidebar and make it expanded by default
        collapsible: true,
        collapsed: false,
        items: [
          {
            text: 'ch04_소규모서비스구축해보기',
            collapsible: true,
            collapsed: false,
            items: [
                { text: '목표 아키텍처 및 개발환경 설명', link: '/[Update] Part2_AWS아키텍처 설계 기본/ch04_소규모서비스구축해보기/01' },
                { text: 'Route53및ACM생성하기', link: '/[Update] Part2_AWS아키텍처 설계 기본/ch04_소규모서비스구축해보기/02' }
            ]
          }
        ]
      },
      {
        text: '메뉴테스트도구',
        collapsible: true,
        collapsed: false,
        items: [
            { text: 'MenuTestTool', link: '/메뉴테스트도구/menu-test-tool' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
