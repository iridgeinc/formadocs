/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'formadocs',
  tagline: 'formadocs is a simple document generator with OpenAPI.',
  url: 'https://iridgeinc.github.io',
  baseUrl: '/formadocs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'iRidge',
  projectName: 'formadocs',
  themeConfig: {
    navbar: {
      title: 'formadocs',
      logo: {
        alt: 'formadocs',
        src: 'img/favicon.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'iRidge',
              href: 'https://iridge.jp/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/iridgeinc',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} iRidge, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
