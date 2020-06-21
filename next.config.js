const withFonts = require('next-fonts');


module.exports = withFonts({
    assetPrefix: 'http://localhost:3000',
    webpack(config, options) {

        return config;
    }
});

module.exports = {
    env: {
        AppName: 'فیلیموشن',
        // BaseUrl: 'https://filimoserver.liara.run',
        BaseUrl: 'http://192.168.1.102:8000',
        ArvanApi:'https://napi.arvancloud.com/vod/2.0',
        ArvanApiKey:'Apikey 23d5133b-cc28-4c90-b505-701610cac152',
        ArvanChannelId:'9f479718-7c95-4b09-9181-1aa263b8826f',
    },
};

// const withCSS = require('@zeit/next-css');
// const withLess = require('@zeit/next-less');
// const withSass = require("@zeit/next-sass");
// module.exports = withLess(withCSS(withSass({
//     webpack(config, options) {
//         config.module.rules.push({
//             test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//             use: {
//                 loader: 'url-loader',
//                 options: {
//                     limit: 100000
//                 }
//             }
//         });
//         return config
//     }
// })));
