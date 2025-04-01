import js from '@eslint/js';  // Importing eslint: recommended configs
import globals from 'globals'; // Importing globals
import reactHooks from 'eslint-plugin-react-hooks'; // React hooks plugin
import reactRefresh from 'eslint-plugin-react-refresh'; // React refresh plugin

export default {
  extends: [
    js.configs.recommended, // Use ESLint's default JS recommended settings
  ],
  parserOptions: {
    ecmaVersion: 2020, // Set ECMAScript version
  },
  env: {
    browser: true, // Global variables for browser
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    // React hooks rules
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn', // Allow export of components but show a warning
      { allowConstantExport: true },
    ],
  },
};
