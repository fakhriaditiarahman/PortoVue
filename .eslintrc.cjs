module.exports = {
    root: true,
    env: {
        browser: true,
        es2022: true,
        node: true
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-essential'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    ignorePatterns: ['dist', 'node_modules'],
    rules: {
        'vue/multi-word-component-names': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            env: { browser: true, node: true }
        },
        {
            files: ['api/**/*.ts'],
            env: { browser: false, node: true }
        }
    ]
}
