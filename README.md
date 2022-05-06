# eslint-plugin-styled

A simple plugin to check if you did not forget to import babel macro when using
`css` prop of `styled-components`.

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
    "styled/require-macro": [2]
  }
}
```

## Options

There are additonal options available.

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
  ]
}
```

## Disclaimer

There is no tests here or proper meta... Maybe I will add it later. Feel free
to pull-request these.
