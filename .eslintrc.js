module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
	overrides: [
		{
			env: {
				node: true,
			},
			// files: ['.eslintrc.{js,cjs}'],
			files: 'src/store/**/*.js',
			excludedFiles: 'src/store/MainPageStore.js',
			// parserOptions: {
			// 	sourceType: 'module',
			// },
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'no-unused-vars': 'warn',
		'react/prop-types': 'off',
		'no-undef': 'warn',
		'no-tabs': 'off',
		'no-unsafe-optional-chaining': 'off',
		'no-debugger': 'warn',
		indent: ['error', 'tab'],
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'crlf',
				tabWidth: 2,
				useTabs: true,
			},
		],
	},
};
