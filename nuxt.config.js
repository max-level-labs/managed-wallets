module.exports = {
	/*
	** Headers of the page
	*/
	head: {
		title: 'managed-wallets',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: 'Nuxt.js and web3 template project'
			}
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},
	/*
	** Customize the progress bar color
	*/
	plugins: [ '~/plugins/vuetify' ],
	loading: { color: '#3B8070' },
	/*
	** Build configuration
	*/
	build: {
		vendor: ['web3', 'vuetify'],
		/*
		** Run ESLint on save
		*/
		extend(config, { isDev, isClient }) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		}
	},
	srcDir: 'src/',
	rootDir: './'
}
