module.exports = {
  title: 'Vue 3 Datepicker',
  description: 'Datepicker component suitable for Vue 3',
  base: '/vue3-datepicker/',

  themeConfig: {
    repo: 'icehaunter/vue3-datepicker',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    sidebar: {
      '/': [
        {
          text: 'Documentation',
          children: [
            { text: 'Getting Started', link: '/' },
            { text: 'Configuration', link: '/config' },
            { text: 'Examples', link: '/examples' }
          ]
        }
      ],
    }
  }
}