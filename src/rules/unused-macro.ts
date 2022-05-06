import { propName } from 'jsx-ast-utils';
import { Rule } from 'eslint';

const ruleModule: Rule.RuleModule = {
  meta: {
    fixable: 'code',
    type: 'problem',
    docs: {
      url: 'https://github.com/andrienko/eslint-plugin-styled',
      description: 'Checks for styled-components babel macro import absence when `css` prop is not used JSX elements',
    },
    schema: [
      {
        type: 'object',
        properties: {
          prop: { type: 'string' },
          import: { type: 'string' },
        },
        required: false,
      },
    ],
  },
  create: (context) => {
    let lastMacroImport = null;
    let hasCSSProp = false;

    const { import: importPath = 'styled-components/macro', prop: checkedProp = 'css' } =
      typeof context.options[0] === 'object' ? context.options[0] : {};

    return {
      JSXAttribute: (attribute) => {
        const name = propName(attribute).toLowerCase();

        if (name === checkedProp.toLowerCase()) {
          hasCSSProp = true;
        }
      },
      ImportDeclaration: (node) => {
        if (!node || !node.source || !node.source.value) {
          return;
        }
        const path = node.source.value as string;
        if (path === importPath) {
          lastMacroImport = node;
        }
      },
      'Program:exit': () => {
        if (!hasCSSProp && lastMacroImport) {
          context.report({
            message: `Import from ${importPath} is redundant when not using \`${checkedProp.toLowerCase()}\` property`,
            node: lastMacroImport,
            fix: (fixer) => {
              const fixes = [];
              fixes.push(fixer.remove(lastMacroImport));
              return fixes;
            },
          });
        }
      },
    };
  },
};

module.exports = ruleModule;
