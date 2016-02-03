import fs from 'fs'

import gulp from 'gulp'
import merge from 'merge-stream'
import rename from 'gulp-rename'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import jasmine from 'gulp-jasmine'
import cucumber from 'gulp-cucumber'
import connect from 'gulp-connect'

import browserify from './gulp/browserify'
import buildExamples from './gulp/build-examples'

gulp.task('build', ['compile', 'browserify', 'buildExamples', 'minify'])
gulp.task('test', ['jasmine', 'cucumber', 'maxSize'])
gulp.task('default', ['build', 'test'])

const MAX_BUILD_SIZE = 40000

gulp.task('compile', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: 'es2015'
    }))
    .pipe(gulp.dest('lib'))
})

gulp.task('browserify', ['compile'], () => {
  return browserify('lib/index.js', 'dist', 'plait.js')
})

gulp.task('minify', ['browserify'], () => {
  return gulp.src('dist/plait.js')
    .pipe(rename('plait.min.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('jasmine', () => {
  return gulp.src('test/**/*.js')
    .pipe(jasmine())
})

gulp.task('connect', () => {
  connect.server({
    root: 'examples/dist',
    port: 8888
  })
})

gulp.task('cucumber', ['buildExamples', 'connect'], (done) => {
  const cukes = cucumber({ 'steps': 'features/steps/steps.js' })
    .on('end', connect.serverClose)
    .on('error', done)

  return gulp.src('features/*')
    .pipe(cukes)
})

gulp.task('maxSize', ['browserify'], (done) => {
  fs.stat('dist/plait.min.js', (err, stats) => {
    const kb = b => Math.floor(b / 1000)

    if (stats.size > MAX_BUILD_SIZE) {
      done(`plait.min.js is too big (${kb(stats.size)}K > ${kb(MAX_BUILD_SIZE)}K)!`)
    }

    done()
  })
})

gulp.task('watch', () => {
  gulp.start('build')

  gulp.watch('src/**/*.js', ['build', 'test'])

  return gulp.watch('examples/src/**/*.js', ['buildExamples', 'cucumber'])
})

gulp.task('buildExamples', buildExamples)
