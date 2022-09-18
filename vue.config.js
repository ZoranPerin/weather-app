module.exports = {
	css: {
		loaderOptions: {
			sass: {
				data: `
				@import "@/style/abstracts/_mixins.scss";
				@import "@/style/abstracts/_variables.scss";
				@import "@/style/abstracts/_themes.scss";
				`
			}
		}
	},
	configureWebpack: {
		optimization: {
    		minimize: true,
			splitChunks: {
				chunks: 'all'
			}
		}
	}
}
