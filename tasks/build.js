/**
 * The project gulpfile.js
 *
 * @fileOverview
 * @author Russell Dempsey <SgtPooki@gmail.com>
 */

var gulpTask = module.exports = {};

gulpTask.dependencies = ['sass', 'scripts'];
gulpTask.task = function(gulp, cb) {
    cb();
};
