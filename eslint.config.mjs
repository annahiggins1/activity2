// @ts-check
// from: https://t ypescript-eslint.io/getting-started

// see https://typescript-eslint.io/users/configs/ for more information


import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);