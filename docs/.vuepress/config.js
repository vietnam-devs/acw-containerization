module.exports = {
  base: '/acw-containerization/',
  title: 'Docker & AKS workshop',
  description: 'Docker & AKS workshop',
  themeConfig: {
    displayAllHeaders: true,
    repo: 'vietnam-devs/acw-containerization',
    docsDir: 'docs',
    editLinks: false,
    editLinkText: 'Help us improve this page!',
    nav: [{ text: 'Home', link: '/' }],
    sidebar: ['/', '/module1/', '/module2/', '/module3/', '/module4/', '/module5/', '/module6/']
  },
  head: [['link', { rel: 'icon', href: '/favicon.png' }]]
}
