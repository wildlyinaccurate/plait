import fs from 'fs'

import gulp from 'gulp'
import rename from 'gulp-rename'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import eslint from 'gulp-eslint'
import jasmine from 'gulp-jasmine'

import browserify from './gulp/browserify'
import buildExamples from './gulp/build-examples'

gulp.task('build', ['compile', 'browserify', 'buildExamples', 'minify'])
gulp.task('test', ['lint', 'jasmine', 'maxSize'])
gulp.task('default', ['build', 'test'])

const MAX_BUILD_SIZE = 35840

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

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js', 'features/**/*.js', 'gulpfile.babel.js', 'gulp/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('jasmine', () => {
  return gulp.src('test/**/*.js')
    .pipe(jasmine())
})

gulp.task('maxSize', ['browserify'], done => {
  fs.stat('dist/plait.min.js', (err, stats) => {
    const kb = b => Math.floor(b / 1000)

    if (stats.size > MAX_BUILD_SIZE) {
      done(`plait.min.js is too big (${kb(stats.size)}K > ${kb(MAX_BUILD_SIZE)}K)!`)
    }

    done()
  })
})

gulp.task('buildExamples', buildExamples)
