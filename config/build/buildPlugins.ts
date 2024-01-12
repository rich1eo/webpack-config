import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ForkCheckerWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { BuildOptions } from './types/types'

export function buildPlugins(
  options: BuildOptions,
): webpack.Configuration['plugins'] {
  const { mode, paths, analyzer, platform } = options
  const isDev = mode === 'development'
  const isProd = mode === 'production'

  const plugins: webpack.Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
    }),
  ]

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin())
    plugins.push(new ForkCheckerWebpackPlugin())
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    )
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins
}
