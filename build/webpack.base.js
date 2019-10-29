const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const gitRevision = require("git-revision");
const glob = require("glob");
const path = require("path");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const projectRoot = process.cwd();
const gitRevisionCallback = (str, err) => {
  if (err) {
    return "Error: git-revision";
  } else {
    return str;
  }
};

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, "./src/*/index.tsx"));

  Object.keys(entryFiles).map(index => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.tsx/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    return htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        inlineSource: ".css$",
        template: path.join(projectRoot, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        favicon: "./assets/images/favicon.ico",
        chunks: [pageName],
        inject: true,
        banner: {
          branch: gitRevision("branch", gitRevisionCallback),
          tag: gitRevision("tag", gitRevisionCallback),
          date: new Date().toLocaleString()
        },
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry: entry,
  output: {
    path: path.join(projectRoot, "dist"),
    filename: "[name]_[chunkhash:8].js"
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                autoprefixer({
                  overrideBrowserslist: ["last 2 version", ">1%", "ios 7"]
                })
              ]
            }
          },
          "less-loader"
        ]
      },
      {
        test: /.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 40 * 1024,
              outputPath: "/img"
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8][ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css"
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, './dll/react.manifest.json')
    }),
  ].concat([...htmlWebpackPlugins, new AddAssetHtmlPlugin({
    filepath: path.resolve(__dirname, "./dll/**/*.js")
  }),]),
  stats: "errors-only"
};
