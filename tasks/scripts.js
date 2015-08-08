/**
 * The project gulpfile.js
 *
 * @fileOverview
 * @author Russell Dempsey <SgtPooki@gmail.com>
 */

var gulpTask = module.exports = {};

gulpTask.dependencies = [];
gulpTask.task = function(gulp, cb) {

    return gulp.src('./src/client/scripts/**/*')
        .pipe(gulp.dest('./public/scripts'));
};
