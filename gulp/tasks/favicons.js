const gulp = require('gulp');
const favicons = require('gulp-favicons');
const debug = require('gulp-debug');

module.exports = function favicon() {
    return gulp.src('src/img/favicon/*.{jpg,jpeg,png,gif,tiff}')
        .pipe(favicons({
            icons: {
                appleIcon: true,
                favicons: true,
                online: false,
                appleStartup: false,
                android: false,
                firefox: false,
                yandex: false,
                windows: false,
                coast: false
            }
        }))
        .pipe(gulp.dest('dist/img/favicons'))
        .pipe(debug({
            "title": "Favicons"
        }));
};