const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://v1.jinrishici.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
    hot: true, // 启用热模块替换
    client: {
      logging: 'none',
      overlay: {
        warnings: false,
        errors: true
      },
      webSocketTransport: 'ws',
      webSocketURL: {
        hostname: 'localhost',
        port: 8080,
        pathname: '/ws',
        protocol: 'ws'
      },
    }
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = "博客后台管理";
        return args;
      })
  }
})
