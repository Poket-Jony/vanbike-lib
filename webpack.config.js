const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('dist/')
    .setPublicPath('/dist/')
    .disableSingleRuntimeChunk()

    .addEntry('vanbike-lib', './src/index.js')

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
        config.plugins.push('@babel/plugin-transform-runtime');
    }, {})
;

const config = Encore.getWebpackConfig();
config.output.library = 'VanBikeLib';

module.exports = config;