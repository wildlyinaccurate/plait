import gulp from 'gulp'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import merge from 'merge-stream'
import rename from 'gulp-rename'

import browserify from 'browserify'
import sourcemaps from 'gulp-sourcemaps'
import jasmine from 'gulp-jasmine'
import cucumber from 'gulp-cucumber'
import connect from 'gulp-connect'
import ghPages from 'gulp-gh-pages'

gulp.task('build', ['js', 'examples'])
gulp.task('test', ['jasmine', 'cucumber'])
gulp.task('default', ['build', 'test'])

const browserifyBuild = (src, dest, name = src) => {
  const b = browserify(src, {
    debug: true,
    transform: ['babelify']
  })

  return b.bundle()
    .pipe(source(src))
    .pipe(rename(name))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest))
}

gulp.task('js', () => {
  return browserifyBuild('index.js', 'dist', 'oak.js')
})

gulp.task('examples', () => {
  const counter = browserifyBuild('src/examples/Counter/Main.js', 'examples', 'Counter.js')
  const counterList = browserifyBuild('src/examples/CounterList/Main.js', 'examples', 'CounterList.js')

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

gulp.task('cucumber', ['examples', 'connect'], (done) => {
  return gulp.src('features/*')
    .pipe(
      cucumber({
        'steps': 'features/steps/steps.js'
      })
        .on('end', connect.serverClose)
        .on('error', done)
    )
})

gulp.task('release', ['build'], () => {
  return gulp.src('examples/*')
    .pipe(ghPages({
      cacheDir: 'node_modules/.publish'
    }))
})

gulp.task('watch', () => {
  gulp.start('js')

  return gulp.watch('{index.js,src/**/*.js}', ['js', 'jasmine'])
})
