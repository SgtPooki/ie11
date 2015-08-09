/**
 * The project gulpfile.js
 *
 * @fileOverview
 * @author Russell Dempsey <SgtPooki@gmail.com>
 */

var sass = require('gulp-sass');

var gulpTask = module.exports = {};

gulpTask.dependencies = [];
gulpTask.task = function(gulp, cb) {

    return gulp.src('./src/client/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets'));
};
