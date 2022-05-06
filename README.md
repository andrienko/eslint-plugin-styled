# eslint-plugin-styled

A simple plugin to check if you did not forget to import babel macro when using
`css` prop of `styled-components` - or to remove such import when `css` prop is
not used.

## Installation

```shell
npm install -D eslint-plugin-styled
```

## Config

Add to your `.eslintrc`

```json
{
  "plugins": ["styled"],
  "rules": {
    "styled/require-macro": [2],
    "styled/unused-macro": [2]
  }
}
```

## Options

There are additional options available.

`prop` defines name of the prop (checks are case-insensitive).
For `styled-components` it is `css`.

`import` defines import path. Maybe you would want to use it with some other lib
or something. It is `styled-components/macro` by default.

```json
"rules": {
  "styled/require-macro": [2,
    {
      "prop": "css",
      "import": "styled-components/macro"
    }
  ],
  "styled/unused-macro": [2,
    {
      "prop": "css",
      "import": "styled-components/macro"
    }
  ]
}
```

## Disclaimer

There is no tests here, nor proper meta... Maybe I will add it later. Feel free
to pull-request these.

This plugin seeks for import from required file - first import will be used. It
won't check for named imports or whatever - there is an assumption that macro
file is used only for macro `import "styled-components/macro`.

I use this to use [styled-components](https://styled-components.com/) with
[vite](https://vitejs.dev/) and
[vite-plugin-babel-macros](https://www.npmjs.com/package/vite-plugin-babel-macros)

