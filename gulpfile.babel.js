import path from 'path'

import gulp from 'gulp'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import merge from 'merge-stream'
import rename from 'gulp-rename'

import babel from 'gulp-babel'
import browserify from 'browserify'
import sourcemaps from 'gulp-sourcemaps'
import jasmine from 'gulp-jasmine'
import cucumber from 'gulp-cucumber'
import connect from 'gulp-connect'
import ghPages from 'gulp-gh-pages'

gulp.task('build', ['compile', 'browserifyExamples'])
gulp.task('test', ['jasmine', 'cucumber'])
gulp.task('default', ['build', 'test'])

const browserifyBuild = (src, dest, name = src, transforms = []) => {
  const b = browserify(src, {
    debug: true,
    standalone: path.basename(name, '.js'),
    transform: transforms,
    paths: ['./src']
  })

  return b.bundle()
    .pipe(source(src))
    .pipe(rename(name))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest))
}

gulp.task('compile', () => {
  return gulp.src('src/*.js')
    .pipe(babel({
      presets: 'es2015'
    }))
    .pipe(gulp.dest('lib'))
})

gulp.task('browserify', ['compile'], () => {
  return browserifyBuild('lib/index.js', 'dist', 'oak.js')
})

gulp.task('browserifyExamples', () => {
  const counter = browserifyBuild('examples/src/Counter/Main.js', 'examples', 'Counter.js', ['babelify'])
  const counterList = browserifyBuild('examples/src/CounterList/Main.js', 'examples', 'CounterList.js', ['babelify'])

  return merge(counter, counterList)
})

gulp.task('jasmine', () => {
  return gulp.src('test/**/*.js')
    .pipe(jasmine())
})

gulp.task('connect', () => {
  connect.server({
    root: 'examples',
    port: 8888
  })
})

gulp.task('cucumber', ['browserifyExamples', 'connect'], (done) => {
  const cukes = cucumber({ 'steps': 'features/steps/steps.js' })
    .on('end', connect.serverClose)
    .on('error', done)

  return gulp.src('features/*')
    .pipe(cukes)
})

gulp.task('watch', () => {
  gulp.start('build')

  return gulp.watch('{index.js,src/**/*.js}', ['build', 'test'])
})

gulp.task('publishPages', ['build'], () => {
  return gulp.src('examples/*')
    .pipe(ghPages({
      cacheDir: 'node_modules/.publish'
    }))
})
