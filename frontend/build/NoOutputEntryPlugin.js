class NoOutputEntryPlugin {

    constructor(pattern) {
        this._pattern = pattern;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('wpConcatFile', (compilation, params) => {
            compilation.hooks.beforeChunkAssets.tap('wpConcatFile', () => {
                compilation.chunks = compilation.chunks.filter((item) => {
                    return !item.name.match(this._pattern);
                })
            })
        })
    }
}
module.exports = NoOutputEntryPlugin;