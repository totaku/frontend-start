const gulp = require('gulp');
const plumber = require('gulp-plumber');
const scss = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const debug = require('gulp-debug');
const rename = require('gulp-rename')

module.exports = function styles() {
    return gulp.src('src/styles/main.scss')
    .pipe(plumber())
    .pipe(gulpif(!argv.prod, sourcemaps.init()))
    .pipe(scss())
    .pipe(autoprefixer({
        cascade: false,
        grid: true
    }))
    .pipe(gulpif(argv.prod, cleanCSS({
        compatibility: "ie8", level: {
            1: {
                specialComments: 0,
                removeEmpty: true,
                removeWhitespace: true
            },
            2: {
                mergeMedia: true,
                removeEmpty: true,
                removeDuplicateFontRules: true,
                removeDuplicateMediaBlocks: true,
                removeDuplicateRules: true,
                removeUnusedAtRules: false
            }
        }
    })))
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(plumber.stop())
    .pipe(gulpif(!argv.prod, sourcemaps.write('./maps/')))
    .pipe(gulp.dest('dist/css'))
    .pipe(debug({
        "title": "CSS files"
    }))
};
