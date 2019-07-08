// const lunbo = require("./mock/lunbotu.json")//引入mock数据
// const tag = require("./mock/tag.json")
const path = require('path')
const webpack = require('webpack')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const port = 8088
const httpType = 'http://'
// const proxyUrl = `localhost:${port}/mock` // 代理地址设置
const proxyUrl = `localhost:3000` // 代理地址设置
module.exports = {
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 静态资源目录（js,css,img,fonts）
  assetsDir: 'assets',
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // webpack-dev-server 相关配置
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    open: true, // 是否自动打开页面
    // host: '192.168.1.105',//如果真机测试需要设置电脑本地路由的V4ip，本地用localhost 192.168.68.135
    port: port, //本地服务器端口
    // https: false,//是否用https
    hotOnly: true,//是否开启热更新
    proxy: {
      // 配置跨域
      // [process.env.VUE_APP_BASE_API]: {
      //   target: `http://localhost:${port}/mock`,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_BASE_API]: ''
      //   }
      // }
      '/api': {
        target: httpType + proxyUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/'
        }
      },
    },
    after: require('./src/mock/mock-server.js'),
    before (app) { // 请求数据这样写就可以了moke
      // http://localhost:8081/api/goods
      // app.get("/api/goods",(req,res)=>{
      //     res.json(lunbo);
      // });

      // app.get("/api/tags",(req,res)=>{
      //     res.json(tag);
      // })
    }
  },
  // 第三方插件配置
  pluginOptions: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  },
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('icons', resolve('src/icons'))
      .set('filters', resolve('src/filters'))
      .set('views', resolve('src/views'))
      .set('mixins', resolve('src/mixins'))
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // 添加新的svg-sprite-loader处理svgIcon
    config.module
      .rule('svgIcon')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader') // 一定要添加use 
      .loader('svg-sprite-loader')
      .tap(options => {
        options = {
          symbolId: 'icon-[name]'
        }
        return options
      })
    // 原有的svg图像处理loader添加exclude 
    config.module
      .rule('svg')
      .exclude
      .add(resolve('src/icons'))
      .end()
  }
}