import fs from 'fs'

import gulp from 'gulp'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'

import browserify from 'browserify'
import sourcemaps from 'gulp-sourcemaps'
import jasmine from 'gulp-jasmine'
import cucumber from 'gulp-cucumber'
import connect from 'gulp-connect'

gulp.task('build', ['js'])
gulp.task('test', ['jasmine', 'cucumber'])
gulp.task('default', ['build', 'test'])

gulp.task('js', () => {
  const entry = 'index.js'
  const b = browserify(entry, {
    debug: true,
    transform: ['babelify']
  })

  return b.bundle()
    .pipe(source(entry))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('example'))
})

gulp.task('jasmine', () => {
  return gulp.src('test/**/*.js')
    .pipe(jasmine())
})

gulp.task('connect', () => {
  connect.server({
    root: 'example',
    port: 8888
  })
})

gulp.task('cucumber', ['js', 'connect'], (done) => {
  return gulp.src('features/*')
    .pipe(
      cucumber({
        'steps': 'features/steps/steps.js',
        'format': 'summary'
      })
        .on('end', connect.serverClose)
        .on('error', done)
    )
})

gulp.task('watch', () => {
  gulp.start('js')

  return gulp.watch('{index.js,src/**/*.js}', ['js'])
})
