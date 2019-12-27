const gulp = require('gulp');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const rename = require('gulp-rename');
const del = require('del');
const replace = require('gulp-replace');

/** 构建配置 */
// fileServer的URL前缀（不带末尾的`/`）
let RES_ROOT = 'https://k8w.io:8080/static';
// let RES_ROOT = 'http://localhost:8081/static';
/** 构建配置 END */

const paths = {
    ts: [
        "src/**/*.ts",
        "node_modules/miniprogram-api-typings/**/*.ts"
    ],
    less: [
        'src/**/*.less'
    ],
    static: [
        'src/**/*.json',
        'src/**/*.wxml'
    ],
    npm: [
        'miniprogram_npm/**/*.js'
    ]
};

function clean() {
    return del('dist');
}

const isProd = process.argv.indexOf('build') > -1;
function buildTs() {
    let pipe = gulp.src(paths.ts).pipe(ts.createProject('tsconfig.json')());
    // if (isProd) {
    //     pipe = pipe.pipe(uglify());
    // }
    return pipe.pipe(gulp.dest('dist'));
}

function buildLess() {
    return gulp.src(paths.less)
        .pipe(replace(/RES_ROOT/g, RES_ROOT))
        .pipe(less())
        .pipe(rename({ extname: '.wxss' }))        
        .pipe(gulp.dest('dist'));
}

function copyStatic() {
    return gulp.src(paths.static)
        .pipe(replace(/RES_ROOT/g, RES_ROOT))
        .pipe(gulp.dest('dist'));
}

function copyNpm() {
    return gulp.src(paths.npm).pipe(gulp.dest('dist/miniprogram_npm'))
}

function cleanJS() {
    return del('dist/**/*.js', {
        ignore: paths.npm.map(v => 'dist/' + v)
    });
}

function cleanWxss() {
    return del('dist/**/*.wxss')
}

function cleanStatic() {
    return del(paths.static.map(v => v.replace(/^src\//, 'dist/')));
}

exports.build = gulp.series(clean, gulp.parallel(
    copyNpm,
    buildTs,
    buildLess,
    copyStatic
));

exports.dev = gulp.series(exports.build, function dev() {
    gulp.watch(paths.ts, gulp.series(cleanJS, buildTs));
    gulp.watch(paths.less, gulp.series(cleanWxss, buildLess));
    gulp.watch(paths.static, gulp.series(cleanStatic, copyStatic));
});