/*
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-27 18:42:01
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-28 13:32:53
 */
// 在所有环境生效
  module.exports = process.env.NODE_ENV === 'production' ? { // 正式环境

	publicPath: process.env.BASE_URL, // 打包生成的资源路径（配置在 .env.formal 和 .env.testing）
	productionSourceMap: false, // 不生成.map文件
	/**
	 * 为什么不启用CDN？
	 * 原因：虽然启用CDN可以加速，但是CDN可能 挂掉（这个可以设置备用解决）或 限速（这个没办法设置请求超时时长）
	 */
	configureWebpack: config => {
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true // 去除控制台打印 console
    // 切割 vendors.js（运行依赖）代码块
    config.optimization.runtimeChunk = 'single'
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: Infinity, // 按需加载时最大的并行请求数
      minSize: 30000, // 打包的文件的最小体积，默认30000
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name (module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1] // 获取要打包的文件名
            return `npm.${packageName.replace(/@/g, '-')}` // 重命名（有些服务器不喜欢@符号）
          }
        }
      }
    }
    // 开启gzip压缩
    config.plugins.push(new (require('compression-webpack-plugin'))({
      algorithm: 'gzip', // 压缩算法
      test: /\.(js|css|html|json|svg|woff|ttf)$/, // 匹配需要压缩的文件后缀
      threshold: 0, // 只处理大于0k的文件，默认：0
      deleteOriginalAssets: false // 是否删除源文件，默认: false
    }))
	},
	// 自动打开网站
	devServer: {
        open: true
    }
  } : { // 本地开发环境
  }