import { visit } from 'unist-util-visit'

function makeImport(name, path) {
  return {
    type: 'mdxjsEsm',
    value: `import ${name} from '${path}'`,
    data: {
      estree: {
        type: 'Program',
        body: [{
          type: 'ImportDeclaration',
          specifiers: [{ type: 'ImportDefaultSpecifier', local: { type: 'Identifier', name } }],
          source: { type: 'Literal', value: path, raw: `'${path}'` },
        }],
        sourceType: 'module',
      },
    },
  }
}

/** Transforms ```python.run fences into <PythonRun> and globally injects Solution. */
export default function remarkPythonRun() {
  return (tree) => {
    const toReplace = []

    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'python.run') {
        toReplace.push({ node, index, parent })
      }
    })

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

    // Always inject Solution; only inject PythonRun when blocks were found
    if (toReplace.length > 0) {
      tree.children.unshift(makeImport('PythonRun', '@components/PythonRun.astro'))
    }
    tree.children.unshift(makeImport('Solution', '@components/Solution.astro'))
  }
}
