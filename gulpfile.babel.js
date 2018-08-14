import fs from 'fs'
import gulp from 'gulp'
import eslint from 'gulp-eslint'
import jasmine from 'gulp-jasmine'
import rename from 'gulp-rename'
import replace from 'gulp-replace'
import merge from 'merge-stream'

gulp.task('test', ['lint', 'jasmine', 'maxSize'])
gulp.task('default', ['test'])

const MAX_BUILD_SIZE = 40960

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js', 'examples/src/**/*.js', 'features/**/*.js', 'gulpfile.babel.js', 'gulp/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('jasmine', () => {
  return gulp.src('test/**/*.js')
    .pipe(jasmine())
})

gulp.task('maxSize', done => {
  fs.stat('dist/plait.min.js', (_, stats) => {
    const kb = b => Math.floor(b / 1000)

    if (stats.size > MAX_BUILD_SIZE) {
      done(`plait.min.js is too big (${kb(stats.size)}K > ${kb(MAX_BUILD_SIZE)}K)!`)
    }

    done()
  })
})

gulp.task('buildExamples', () => {
  const streams = merge(copyExamples())
  const examples = fs.readdirSync('examples/src').filter(f => fs.statSync(`examples/src/${f}`).isDirectory())

  examples.forEach(example => {
    streams.add(buildPage(example))
  })

  return streams
})

function copyExamples () {
  return gulp.src(['examples/src/style.css'])
    .pipe(gulp.dest('examples/dist'))
}

function buildPage (example) {
  return gulp.src('examples/src/example.tmpl.html')
    .pipe(replace('{{component}}', example))
    .pipe(rename(`${example}.html`))
    .pipe(gulp.dest('examples/dist'))
}
