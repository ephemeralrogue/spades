import globals from 'globals';


export default [
	{
		languageOptions: { 
			globals: globals.node,
			ecmaVersion: 'latest'
		},
		files: [ '**/*.js' ],
		rules: {
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