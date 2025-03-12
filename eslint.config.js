import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';


export default [
	{
		languageOptions: { 
			globals: globals.node,
			ecmaVersion: 'latest'
		},
		files: [ '**/*.js' ],
		plugins: {
			'@stylistic': stylistic
		},
		rules: {
			'@stylistic/indent': [
				'error',
				'tab'
			],
			semi: [
				'error',
				'always'
			],
			quotes: [
				'error',
				'single',
				{
					'allowTemplateLiterals': true
				}
			],
			'no-console': 'error'
		}
	},
];