const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Feel free to modify this webpack config however you'd like to
  // Modificamos la configuración de single-spa para incluir nuestros headers CSP
  if (singleSpaWebpackConfig.devServer) {
    singleSpaWebpackConfig.devServer.headers = {
      ...singleSpaWebpackConfig.devServer.headers,
      'Content-Security-Policy': "default-src 'self'; connect-src 'self' http://185.209.230.19:8081 https: localhost:* ws://localhost:*;"
    };
  } else {
    singleSpaWebpackConfig.devServer = {
      headers: {
        'Content-Security-Policy': "default-src 'self'; connect-src 'self' http://185.209.230.19:8081 https: localhost:* ws://localhost:*;"
      }
    };
  }

  // Aquí puedes agregar cualquier otra modificación a la configuración de webpack si es necesario

  return singleSpaWebpackConfig;
};
