export default defineNuxtConfig({
    css: [
        '@/assets/css/main.css',
    ],
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt'
    ],
    buildModules: [
        '@nuxtjs/google-fonts'
    ],
    build: {
        transpile: [
            '@fortawesome/vue-fontawesome',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons'
        ]
    },
    runtimeConfig: {
        mongoUri: process.env.MONGO_URI,
		public: {
			API_URL: process.env.API_URL,
			IGDB_CLIENT_ID: process.env.IGDB_CLIENT_ID,
			IGDB_CLIENT_SECRET: process.env.IGDB_CLIENT_SECRET,
			PROXY: process.env.PROXY,
		},
	}
})
