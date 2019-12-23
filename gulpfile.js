const gulp = require('gulp');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const rename = require('gulp-rename');
const del = require('del');
const uglify = require('gulp-uglify');

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
        'src/**/*.wxml',
        'src/**/*.png',
    ],
};

function clean() {
    return del('dist');
}

const isProd = process.argv.indexOf('build') > -1;
function buildTs() {
    let pipe = gulp.src(paths.ts).pipe(ts.createProject('tsconfig.json')());
    if (isProd) {
        pipe = pipe.pipe(uglify());
    }
    return pipe.pipe(gulp.dest('dist'));        
}

function buildLess() {
    return gulp.src(paths.less).pipe(less())
        .pipe(rename({ extname: '.wxss' }))
        .pipe(gulp.dest('dist'));
}

function copyStatic() {
    return gulp.src(paths.static).pipe(gulp.dest('dist'));
}

function cleanJS() {
    return del('dist/**/*.js');
}

function cleanWxss() {
    return del('dist/**/*.wxss')
}

function cleanStatic() {
    return del(paths.static.map(v => v.replace(/^src\//, 'dist/')));
}

exports.build = gulp.series(clean, gulp.parallel(
    buildTs,
    buildLess,
    copyStatic
));

exports.dev = gulp.series(exports.build, function dev() {
    gulp.watch(paths.ts, gulp.series(cleanJS, buildTs));
    gulp.watch(paths.less, gulp.series(cleanWxss, buildLess));
    gulp.watch(paths.static, gulp.series(cleanStatic, copyStatic));
});