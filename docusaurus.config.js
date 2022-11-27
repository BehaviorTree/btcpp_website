// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BehaviorTree.CPP',
  tagline: 'The C++ Behavior Tree library',
  url: 'https://www.behaviortree.dev/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Auryn Robotics', // Usually your GitHub org/user name.
  projectName: 'BehaviorTree.CPP', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {
        htmlLang: 'en-US',
      },
    },
  },
  
  plugins: [
    require.resolve("@cmfcmf/docusaurus-search-local"),
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          lastVersion: 'current',
          versions: {
            current: {
              label: '4.0.1',
            },
            3.8: {
              label: '3.8',
              path: '3.8',
            },
          },
          sidebarPath: require.resolve('./sidebars.js'),
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/BehaviorTree/btcpp_website/tree/master',
        },
        blog: {
          showReadingTime: true,
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/BehaviorTree/btcpp_website/tree/master',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        style: 'dark',
        title: 'BehaviorTree',
        logo: {
          alt: 'BT.CPP',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc', label: 'Tutorial', docId: 'intro', position: 'left'
          },
          {
            position: 'left',
            label: 'Tools',
            items: [
              {
                to: '/groot', 
                label: 'Groot'
              },
              {
                to: '/moveit_studio', 
                label: 'MoveIt Studio'
              }
            ]
          },
          {
            to: '/migration', label: 'Migration from 3.X', position: 'left'
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          {to: '/blog', label: 'Blog', position: 'right'},
          {
            href: 'https://github.com/BehaviorTree/BehaviorTree.CPP',
            label: 'GitHub',
            position: 'right',
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
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discourse',
                href: 'https://https://discourse.behaviortree.dev/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/BehaviorTree/BehaviorTree.CPP',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Auryn Robotics`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['cpp', 'xml-doc'],
      },
    }),

  scripts: [{src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': 'behaviortree.dev'}],

};

module.exports = config;

