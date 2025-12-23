import js from '@eslint/js'
import globals from 'globals'
import jestDom from 'eslint-plugin-jest-dom'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import testingLibrary from 'eslint-plugin-testing-library'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  globalIgnores(['dist', '.bun-cache', '.shadcn-tmp']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx}', 'src/test/**/*.{ts,tsx}'],
    extends: [testingLibrary.configs['flat/react'], jestDom.configs['flat/recommended']],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
  },
  prettier,
])
