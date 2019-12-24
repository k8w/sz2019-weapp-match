const path = require('path');
const pluginName = 'EntryRequireCommonPlugin';
const ConcatSource = require('webpack-sources').ConcatSource;
const glob = require('glob');
const fs = require('fs');

class EntryRequireCommonPlugin {
    constructor() {}

    apply(compiler) {
        const isProduction = compiler.options.mode === 'production';

        compiler.hooks.compilation.tap(pluginName, (compilation) => {
            let outputFiles = Object.keys(compilation.options.entry);

            // bootstrap 和 require('common.js')
            compilation.hooks.optimizeChunkAssets.tapAsync(pluginName, (chunks, callback) => {
                for (let chunk of chunks) {
                    let source = compilation.assets[chunk.name].source();

                    if (outputFiles.some(v => v === chunk.name)) {
                        let sourceArr = source.split('\n');

                        //require common.modules
                        let requirePath = path.relative(path.dirname(chunk.name), path.resolve(__dirname, '../')).replace(/\\/g, '/');
                        if (requirePath.endsWith('.')) {
                            requirePath += '/';
                        }

                        //移除默认的webpack bootstrap
                        let hookLineNum = sourceArr.findIndex(v => v === '/******/ })');
                        let entry = JSON.stringify(isProduction ? chunk.entryModule.id : `./src/${chunk.name.replace(/\.js$/, '.ts')}`)
                        sourceArr.splice(1, hookLineNum - 1,
                            `/******/ 	__weapp_bootstrap__.regModules(modules);`,
                            `/******/ 	__webpack_require__(${entry});`
                        );

                        //插入公共的自定义bootstrap
                        sourceArr.splice(0, 0,
                            `/******/ var __weapp_bootstrap__ = require('${requirePath}bootstrap');`,
                            `/******/ var __webpack_require__ = __weapp_bootstrap__.__webpack_require__;`,
                            `/******/ __weapp_bootstrap__.regModules(require('${requirePath}common'));`,
                        )


                        console.log(`Custom WeApp Bootstrap added to: ${chunk.name}`);
                        source = sourceArr.join('\n');
                    }
                    //common.js
                    else if (chunk.name === 'common.js') {
                        let sourceArr = source.split('\n');
                        sourceArr[0] = isProduction ? 'module.exports = [' : 'module.exports = {';
                        sourceArr[sourceArr.length - 1] = isProduction ? '];' : '};';
                        source = sourceArr.join('\n');
                    }

                    //更新文件
                    compilation.assets[chunk.name] = new ConcatSource(source);
                }
                callback();
            });

            // 替换RES_PATH
            // compiler.hooks.done.tap(pluginName, () => {
            //     let files = glob.sync('dist/**/*.{wxml,js}');
            //     for (let file of files) {
            //         fs.writeFileSync(file, fs.readFileSync(file).toString().replace(/RES_PATH/g, this.resPath).replace(/{API_PATH}/g, this.apiPath))
            //     }
            // });
        })
    }
}

module.exports = EntryRequireCommonPlugin;