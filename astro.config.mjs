import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import { unified } from '@astrojs/markdown-remark'
import remarkPythonRun from './remark-python-run.mjs'

export default defineConfig({
  site: 'https://StefanUG.github.io',
  base: '/python-intro',
  integrations: [
    starlight({
      title: 'Intro til Python',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Dansk', lang: 'da' },
      },
      // Skulpt loaded globally so every PythonRun instance can call window.Sk
      head: [
        { tag: 'script', attrs: { src: 'https://skulpt.org/js/skulpt.min.js', defer: true } },
        { tag: 'script', attrs: { src: 'https://skulpt.org/js/skulpt-stdlib.js', defer: true } },
      ],
      sidebar: [
        { label: 'Lektion 1', items: [{ autogenerate: { directory: 'lektion-1' } }] },
        { label: 'Lektion 2', items: [{ autogenerate: { directory: 'lektion-2' } }] },
        { label: 'Lektion 3', items: [{ autogenerate: { directory: 'lektion-3' } }] },
        { label: 'Lektion 4 – Variabler', items: [{ autogenerate: { directory: 'lektion-4-variabler' } }] },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
  markdown: {
    processor: unified({ remarkPlugins: [remarkPythonRun] }),
  },
})
