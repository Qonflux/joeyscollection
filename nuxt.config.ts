// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    target: 'static',
    css: [
        '@/assets/css/main.css',
    ],
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    buildModules: [
        '@nuxtjs/google-fonts',
        '@pinia/nuxt'
    ],
    build: {
        transpile: [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/free-regular-svg-icons',
            '@fortawesome/free-solid-svg-icons'
        ]
    },
    runtimeConfig: {
		public: {
			API_URL: process.env.API_URL,
			IGDB_CLIENT_ID: process.env.IGDB_CLIENT_ID,
			IGDB_CLIENT_SECRET: process.env.IGDB_CLIENT_SECRET,
			PROXY: process.env.PROXY,
		},
	},
})
