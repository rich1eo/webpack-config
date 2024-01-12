import { ModuleOptions } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from './types/types'
import { buildBabelLoader } from './babel/buildBabelLoader'

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development'

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  }

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoader,
      // Compiles Sass to CSS
      'sass-loader',
    ],
  }

  const imgLoader = {
    test: /\.(png|jpg|jpeg)$/i,
    type: 'asset/resource',
  }

  const svgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  }

  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   use: [
  //     {
  //       loader: 'ts-loader',
  //       options: {
  //         getCustomTransformers: () => ({
  //           before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
  //         }),
  //         transpileOnly: isDev,
  //       },
  //     },
  //   ],
  //   exclude: /node_modules/,
  // }

  const babelLoader = buildBabelLoader(options)

  return [imgLoader, svgLoader, scssLoader, babelLoader]
}
