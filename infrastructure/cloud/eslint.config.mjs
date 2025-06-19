import { fileURLToPath } from 'url';
import { dirname } from 'path';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    files: ['resources/**/*.ts', 'index.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...prettier.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'error',
    },

  },
  {
    ignores: [
      'dist',
      'node_modules',
      '*.config.mjs',
    ],
  },
];
