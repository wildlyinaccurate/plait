import fs from 'fs'

import gulp from 'gulp'
import browserify from 'browserify'

gulp.task('default', ['js'])

gulp.task('js', () => {
  browserify('./index.js')
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(fs.createWriteStream('app/bundle.js'))
})

gulp.task('watch', () => {
  gulp.start('js')

  return gulp.watch('{index.js,src/**/*.js}', ['js'])
})
