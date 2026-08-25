import { visit } from 'unist-util-visit'

/** Transforms ```python.run code fences into <PythonRun code="..."> MDX elements. */
export default function remarkPythonRun() {
  return (tree) => {
    const toReplace = []

    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'python.run') {
        toReplace.push({ node, index, parent })
      }
    })

    if (toReplace.length === 0) return

    // Replace bottom-up so indices stay valid
    for (const { node, index, parent } of toReplace.reverse()) {
      parent.children.splice(index, 1, {
        type: 'mdxJsxFlowElement',
        name: 'PythonRun',
        attributes: [{ type: 'mdxJsxAttribute', name: 'code', value: node.value }],
        children: [],
        data: { _mdxExplicitJsx: true },
      })
    }

    // Inject import once at the top of the file
    tree.children.unshift({
      type: 'mdxjsEsm',
      value: "import PythonRun from '@components/PythonRun.astro'",
      data: {
        estree: {
          type: 'Program',
          body: [
            {
              type: 'ImportDeclaration',
              specifiers: [
                {
                  type: 'ImportDefaultSpecifier',
                  local: { type: 'Identifier', name: 'PythonRun' },
                },
              ],
              source: {
                type: 'Literal',
                value: '@components/PythonRun.astro',
                raw: "'@components/PythonRun.astro'",
              },
            },
          ],
          sourceType: 'module',
        },
      },
    })
  }
}
