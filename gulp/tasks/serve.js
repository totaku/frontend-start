const gulp = require('gulp');
const imageMinify = require('./imageMinify');
const svgSprite = require('./spriteSVG');
const pngSprite = require('./spritePNG');
const styles = require('./styles');
const pug2html = require('./pug');
const script = require('./scripts');
const server = require('browser-sync').create();

module.exports = function serve(cb) {
  server.init({
    server: 'dist',
    notify: false,
    open: true,
    cors: true,
    browser: "FirefoxDeveloperEdition",
    port: 3000
  });

  gulp.watch('src/img/**/*.{gif,png,jpg,svg,webp}', gulp.series(imageMinify)).on('change', server.reload);
  gulp.watch('src/img/sprite/svg/*.svg', gulp.series(svgSprite)).on('change', server.reload);
  gulp.watch('src/img/sprite/png/*.png', gulp.series(pngSprite)).on('change', server.reload);
  gulp.watch(['src/blocks/**/*.scss', 'src/styles/**/*.scss'], gulp.series(styles)).on('change', server.reload);
  gulp.watch('src/js/**/*.js', gulp.series(script)).on('change', server.reload);
  gulp.watch(['src/views/**/*.pug', 'src/blocks/**/*.pug'], gulp.series(pug2html));
  gulp.watch('dist/*.html').on('change', server.reload);

  return cb()
};
