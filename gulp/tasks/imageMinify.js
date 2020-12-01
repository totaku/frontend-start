const gulp = require('gulp');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require("imagemin-pngquant");
const imageminZopfli = require("imagemin-zopfli");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminGiflossy = require("imagemin-giflossy");
const newer = require("gulp-newer");
const debug = require("gulp-debug");
const argv = require('yargs').argv;
const gulpif = require('gulp-if');

module.exports = function imageMinify() {
  return gulp.src(
    ['src/img/**/*.{gif,png,jpg,jpeg,svg,webp}',
    '!src/img/sprite/**/*',
    '!src/img/favicon/*.{jpg,jpeg,png,gif,tiff}']
  )
      .pipe(buffer())
      .pipe(newer('dist/img/'))
      .pipe(gulpif(argv.prod, imagemin([
          imageminGiflossy({
              optimizationLevel: 3,
              optimize: 3,
              lossy: 2
          }),
          imageminPngquant({
              speed: 5,
              quality: [0.6, 0.8]
          }),
          imageminZopfli({
              more: true
          }),
          imageminMozjpeg({
              progressive: true,
              quality: 90
          }),
          imagemin.svgo({
              plugins: [
                  { removeViewBox: false },
                  { removeUnusedNS: false },
                  { removeUselessStrokeAndFill: false },
                  { cleanupIDs: false },
                  { removeComments: true },
                  { removeEmptyAttrs: true },
                  { removeEmptyText: true },
                  { collapseGroups: true }
              ]
          })
      ])))
      .pipe(gulp.dest('dist/img/'))
      .pipe(debug({
          "title": "Images"
      }));
};
