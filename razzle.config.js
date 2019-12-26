'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const postcssNormalize = require('postcss-normalize');


const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const getStyleLoaders = (cssOptions, preProcessor) => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader
		},
		{
			loader: require.resolve('css-loader'),
			options: cssOptions,
		},
		{
			loader: require.resolve('postcss-loader'),
			options: {
				ident: 'postcss',
				plugins: () => [
					require('postcss-flexbugs-fixes'),
					require('postcss-preset-env')({
						autoprefixer: {
							flexbox: 'no-2009',
						},
						stage: 3,
					}),
					postcssNormalize(),
				],
				sourceMap: false,
			},
		},
	].filter(Boolean);
	if (preProcessor) {
		loaders.push({
			loader: require.resolve(preProcessor),
			options: {
				sourceMap: false,
			},
		});
	}
	return loaders;
};


module.exports = {
	modify: (config, { target, dev }, webpack) => {

		config.plugins.push(new MiniCssExtractPlugin({
			filename: 'static/css/bundle.[contenthash:8].css',
			chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
			allChunks: true,

		}))

		config.module.rules.push(
			{
				test: sassRegex,
				exclude: sassModuleRegex,
				use: getStyleLoaders(
					{
						importLoaders: 2,
						sourceMap: false,
					},
					'sass-loader'
				),
				sideEffects: true,
			},
			{
				test: sassModuleRegex,
				use: getStyleLoaders(
					{
						importLoaders: 2,
						sourceMap: false,
						modules: true,
						getLocalIdent: getCSSModuleLocalIdent,
					},
					'sass-loader'
				),
			}
		)
		return config;
	}
};