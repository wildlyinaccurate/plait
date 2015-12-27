import fs from 'fs'

import gulp from 'gulp'
import browserify from 'browserify'
import jasmine from 'gulp-jasmine'

gulp.task('build', ['js', 'test'])
gulp.task('default', ['build'])

gulp.task('js', () => {
  browserify('./index.js')
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(fs.createWriteStream('app/bundle.js'))
})

gulp.task('test', () => {
  return gulp.src('test/**/*.js')
    .pipe(jasmine())
})

gulp.task('watch', () => {
  gulp.start('js')

  return gulp.watch('{index.js,src/**/*.js}', ['js'])
})
