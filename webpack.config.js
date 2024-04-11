module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
};
// module.exports = {
//   // ... (остальная часть конфигурации)

//   module: {
//     rules: [
//       // ... (правила для других типов файлов)

//       // Правило для SCSS
//       {
//         test: /\.scss$/,
//         use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
//       },

//       // Правило для файлов шрифтов
//       {
//         test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
//         type: "asset/resource",
//         generator: {
//           filename: "fonts/[name][ext][query]", // Путь, куда будут скопированы шрифты
//         },
//       },
//     ],
//   },

//   // ... (остальная часть конфигурации)
// };
