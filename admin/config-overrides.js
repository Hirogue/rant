const path = require('path');
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');

module.exports = override(
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src"),
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {},
    }),
);