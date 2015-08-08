/**
 * The project gulpfile.js
 *
 * @fileOverview
 * @author Russell Dempsey <SgtPooki@gmail.com>
 */

var browserify = require('gulp-browserify');

var gulpTask = module.exports = {};

gulpTask.dependencies = [];
gulpTask.task = function(gulp, cb) {

    return gulp.src('./src/client/scripts/main.js')
        .pipe(browserify({
          insertGlobals : false,
          debug : !!process.env.NODE_ENV
        }))
        .pipe(gulp.dest('./public/scripts'));
};
