"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_ast_utils_1 = require("jsx-ast-utils");
const ruleModule = {
    meta: {
        fixable: 'code',
        type: 'problem',
        docs: {
            url: 'https://github.com/andrienko/eslint-plugin-styled',
            description: 'Checks for styled-components babel macro import presence when `css` prop is used on one of JSX elements',
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
            {
                type: 'boolean',
                required: false,
            },
        ],
    },
    create: (context) => {
        let lastCssProp = null;
        let hasMacroImported = false;
        let lastImport = null;
        const { import: importPath = 'styled-components/macro', prop: checkedProp = 'css' } = typeof context.options[0] === 'object' ? context.options[0] : {};
        const shouldFix = !!(context.options[1] || true);
        return {
            JSXAttribute: (attribute) => {
                const name = (0, jsx_ast_utils_1.propName)(attribute).toLowerCase();
                if (name === checkedProp.toLowerCase()) {
                    lastCssProp = attribute;
                }
            },
            ImportDeclaration: (node) => {
                if (!node || !node.source || !node.source.value) {
                    return;
                }
                lastImport = node;
                const path = node.source.value;
                if (path === importPath) {
                    hasMacroImported = true;
                }
            },
            'Program:exit': () => {
                if (lastCssProp && !hasMacroImported) {
                    context.report({
                        message: `Files that have JSX elements that use \`${checkedProp}\` prop must have \`import "${importPath}"\`.`,
                        node: lastCssProp,
                        fix: shouldFix
                            ? (fixer) => {
                                const fixes = [];
                                const fixText = `import "${importPath}"`;
                                if (lastImport) {
                                    fixes.push(fixer.insertTextAfter(lastImport, fixText));
                                }
                                else {
                                    const sourceCode = context.getSourceCode();
                                    fixes.push(fixer.insertTextBefore(sourceCode.ast.tokens[0], `${fixText}\n`));
                                }
                                return fixes;
                            }
                            : undefined,
                    });
                }
            },
        };
    },
};
module.exports = ruleModule;
