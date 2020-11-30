const gulp = require('gulp');
const htmlValidator = require('gulp-w3c-html-validator');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');

module.exports = function pug2html() {
  return gulp.src(['src/views/*.pug', 'src/views/pages/*.pug'])
    .pipe(plumber())
    .pipe(pug({
        pretty: true
    }))
    .pipe(plumber.stop())
    .pipe(gulpif(argv.prod, htmlValidator()))
    .pipe(gulp.dest('dist'))
};
