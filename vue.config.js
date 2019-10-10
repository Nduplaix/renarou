// Default config
module.exports = {
  lintOnSave: false,
  devServer: {
    port: process.env.NODE_PORT
  }
};

// Docker config overrides
if (process.env.IS_DOCKER) {
  module.exports.devServer = {
    ...module.exports.devServer,
    public: `http://${process.env.DOMAIN_DEFAULT}`,
    disableHostCheck: process.env.DISABLE_HOST_CHECK === "true"
  };
}

// Fix for dinghy on macosx
if (process.env.IS_MACOS_DINGHY) {
  module.exports.devServer = {
    ...module.exports.devServer,
    public: `http://${process.env.DOMAIN_DEFAULT.replace("local", "docker")}`,
    disableHostCheck: true
  };

  module.exports.configureWebpack = {
    ...module.exports.configureWebpack,
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  };
}
