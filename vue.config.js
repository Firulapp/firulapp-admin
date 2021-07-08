module.exports = {
  devServer: {
    disableHostCheck: true
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: "false"
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? "/firulapp-admin" : "/",
  transpileDependencies: ["vuetify"]
};
