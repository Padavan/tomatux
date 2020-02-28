const path = require("path");

module.exports = ({ config, mode }) => {
  console.log('storybookBaseConfig before', config);
  config.module.rules.push(
   {
      test: /\.(ts|tsx)$/,
      use: 'ts-loader',
    },
  );
  config.resolve.extensions.push('.ts', '.tsx');

  console.log('config after', config);

  return config;
};
