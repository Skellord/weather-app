module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:prettier/recommended', 'plugin:react/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
    rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['off'],
        'comma-dangle': ['error', 'only-multiline'],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/prop-types': 'off',
        'react/no-find-dom-node': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars-experimental': 'warn',
        'react/no-unknown-property': 'warn',
        'react/display-name': 'warn',
        'react/jsx-key': 'warn',
        'react/no-children-prop': 'warn',
        'react/jsx-no-duplicate-props': 'warn',
    },
};
