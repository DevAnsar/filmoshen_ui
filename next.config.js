const withFonts = require('next-fonts');
const withImages = require('next-images');

module.exports = withFonts({
    assetPrefix: 'http://localhost:3000',
    webpack(config, options) {

        return config;
    }
});
module.exports = withImages({
    webpack(config, options) {
        config.optimization.minimize = false;
        return config
    }
});
module.exports = {
    env: {
        AppName: 'فیلموشن',
        // BaseUrl: 'https://filimoserver.liara.run',
        // BaseUrl: 'http://192.168.1.104:8888',
        BaseUrl: 'https://filmoshen.com/admin',
        ArvanApi:'https://napi.arvancloud.com/vod/2.0',
        // ArvanApiKey:'Apikey 23d5133b-cc28-4c90-b505-701610cac152',
        ArvanApiKey:'Apikey 26c1775d-dd61-4c8a-833f-0c40026fdaf8',
        ArvanChannelId:'9f479718-7c95-4b09-9181-1aa263b8826f',
    },
};

