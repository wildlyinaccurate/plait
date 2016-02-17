import fs from 'fs'

import gulp from 'gulp'
import merge from 'merge-stream'
import rename from 'gulp-rename'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import eslint from 'gulp-eslint'
import jasmine from 'gulp-jasmine'
import istanbul from 'gulp-istanbul'
import { Report, Collector } from 'istanbul'
import cucumber from 'gulp-cucumber'
import connect from 'gulp-connect'

import browserify from './gulp/browserify'
import buildExamples from './gulp/build-examples'

gulp.task('build', ['compile', 'browserify', 'buildExamples', 'minify'])
gulp.task('test', ['lint', 'jasmine', 'testExamples', 'maxSize', 'coverage'])
gulp.task('default', ['build', 'test'])

const MAX_BUILD_SIZE = 35000

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
  return gulp.src('{src,features}/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
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

gulp.task('instrument', ['copyDist'], () => {
  return gulp.src('examples/dist/plait.js')
    .pipe(istanbul({
      coverageVariable: '__coverage__',
      embedSource: true
    }))
    .pipe(gulp.dest('examples/dist'))
})

gulp.task('testExamples', ['instrument', 'buildExamples', 'connect'], (done) => {
  const cukes = cucumber({ 'steps': 'features/steps/steps.js' })
    .on('end', connect.serverClose)
    .on('error', done)

  return gulp.src('features/counter-list.feature')
    .pipe(cukes)
})

gulp.task('coverage', ['testExamples'], (done) => {
  const report = Report.create('lcov')
  const collector = new Collector()
  const coverage = require('./.coverage/raw.json')

  collector.add(coverage)
  report.on('done', function () { console.log('done'); });
  report.writeReport(collector);
  done()
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

gulp.task('copyDist', ['browserify'], () => {
  return gulp.src('dist/plait.js')
    .pipe(gulp.dest('examples/dist'))
})

gulp.task('buildExamples', ['copyDist'], buildExamples)
