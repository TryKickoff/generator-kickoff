/**
 * gulp copy
 */
const gulp = require('gulp');
const config = require('../config');

gulp.task('copy', ['copy:standaloneJS' /*, 'copy:fonts'*/]);

// Copy the standalone js files
gulp.task('copy:standaloneJS', () => {
	return gulp.src(`${config.js.srcDir}/standalone/*`)
		.pipe(gulp.dest(`${config.js.distDir}/standalone`));
});

// Copy webfonts
// gulp.task('copy:fonts', () => {
// 	return gulp.src(`${config.srcDir}/fonts/*`)
// 		.pipe(gulp.dest(`${config.distDir}/fonts`));
// });
