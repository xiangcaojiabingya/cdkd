let filePath = ''
let Timestamp = ''
if (process.env.UNI_PLATFORM === 'h5') {
	filePath = 'static/js/'
	Timestamp = '.' + new Date().getTime()
}
module.exports = {

  // webpack配置
  filenameHashing: false,
  configureWebpack: { // webpack 配置 解决js缓存的问题
  	output: { // 输出重构  打包编译后的 文件目录/文件名称?v=时间戳
  		filename: `${filePath}[name]${Timestamp}.js`,
  		chunkFilename: `${filePath}[name]${Timestamp}.js`
  	},
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://ttt.ebanktest.com.cn:39007/app', //对应自己后端服务地址 这里一定要完全一致，不是https的一定不要写成https，配置过后不生效要来这里仔细对比下是不是写错了
        changeOrigin: true,//是否允许跨域，true是
        secure: false,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  publicPath: './',
  // 输出文件目录   文件夹名
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。    资源放的目录
  assetsDir: "./static",
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径    index的路劲和名字
  indexPath: './index.html',

  // 打包时不生成.map文件
  productionSourceMap: false
}