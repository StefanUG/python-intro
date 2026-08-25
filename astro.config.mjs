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
      sidebar: [
        {
          label: 'Lektion 1',
          items: [
            { label: 'Elsa and Turtle', slug: 'lektion-1/elsa-and-turtle' },
            { label: 'Gentagelser og løkker', slug: 'lektion-1/gentagelser-og-lokker' },
            { label: 'Løkker i løkker', slug: 'lektion-1/lokker-i-lokker' },
            { label: 'Snefnug med kvadrater', slug: 'lektion-1/snefnug-med-kvadrater' },
            { label: 'Tegn et Kryds', slug: 'lektion-1/tegn-et-kryds' },
            { label: 'Snefnug med streger', slug: 'lektion-1/snefnug-med-streger' },
          ],
        },
        {
          label: 'Lektion 2',
          items: [
            { label: 'Opsummering af lektion 1', slug: 'lektion-2/opsummering-af-lektion-1' },
            { label: 'Leg med farver', slug: 'lektion-2/leg-med-farver' },
            { label: 'Lav et parallelogram', slug: 'lektion-2/lav-et-parallelogram' },
            { label: 'Snefnug med parallelogrammer', slug: 'lektion-2/snefnug-med-parallelogrammer' },
            { label: 'Snefnug med 10 parallelogrammer', slug: 'lektion-2/snefnug-med-10-parallelogrammer' },
            { label: 'Lav en Cirkel', slug: 'lektion-2/lav-en-cirkel' },
            { label: 'Lav din egen funktion', slug: 'lektion-2/lav-din-egen-funktion' },
            { label: 'Snefnug af cirkler', slug: 'lektion-2/snefnug-af-cirkler' },
            { label: 'Forskellig størrelse cirkler', slug: 'lektion-2/forskellig-storrelse-cirkler' },
            { label: 'Blomster-snefnug', slug: 'lektion-2/blomster-snefnug' },
          ],
        },
        {
          label: 'Lektion 3',
          items: [
            { label: 'Opsummering af lektion 2', slug: 'lektion-3/opsummering-af-lektion-2' },
            { label: 'Snefnuggren', slug: 'lektion-3/snefnuggren' },
            { label: 'Snefnug af fraktal', slug: 'lektion-3/snefnug-af-fraktal' },
            { label: 'Tegn frit', slug: 'lektion-3/tegn-frit' },
          ],
        },
        {
          label: 'Lektion 4 – Variabler',
          items: [
            { label: '1. Tegn en Trekant', slug: 'lektion-4-variabler/tegn-en-trekant' },
            { label: '2. Variabel Lænde', slug: 'lektion-4-variabler/variabel-laende' },
            { label: '3. Flere trekanter', slug: 'lektion-4-variabler/flere-trekanter' },
            { label: '4. Sekskanter (Hexagons)', slug: 'lektion-4-variabler/sekskanter-hexagons' },
            { label: '5. Femkanter (Pentagons)', slug: 'lektion-4-variabler/femkanter-pentagons' },
            { label: '6. Rektangel', slug: 'lektion-4-variabler/rektangel' },
            { label: '7. Mange-kant', slug: 'lektion-4-variabler/mange-kant' },
            { label: '8. Sekskant igen', slug: 'lektion-4-variabler/sekskant-igen' },
            { label: '9. Femkant igen', slug: 'lektion-4-variabler/femkant-igen' },
            { label: '10. Fri tegning', slug: 'lektion-4-variabler/fri-tegning' },
            { label: '11. Kasser', slug: 'lektion-4-variabler/kasser' },
            { label: '12. To variabler', slug: 'lektion-4-variabler/to-variabler' },
            { label: '13. Juster størrelse', slug: 'lektion-4-variabler/juster-storrelse' },
            { label: '14. Tegn frit', slug: 'lektion-4-variabler/tegn-frit' },
            { label: '15. Tegn efter', slug: 'lektion-4-variabler/tegn-efter' },
          ],
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
  markdown: {
    processor: unified({ remarkPlugins: [remarkPythonRun] }),
  },
})
