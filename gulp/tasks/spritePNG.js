const gulp = require('gulp');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');

const spritesmith = require('gulp.spritesmith');

module.exports = function spritePNG() {
  const spriteData = gulp.src('src/img/sprite/png/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../img/sprite/sprite.png',
    cssName: '_sprite.scss',
    padding: 5,
    cssVarMap: function (sprite) {
      sprite.name = 'icon-' + sprite.name;
    }
  }));

  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/sprite/'));

  const cssStream = spriteData.css
    .pipe(gulp.dest('src/styles/base/'));

  return merge(imgStream, cssStream);
};


