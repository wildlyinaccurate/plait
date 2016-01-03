import fs from 'fs'

import gulp from 'gulp'
import replace from 'gulp-replace'
import rename from 'gulp-rename'
import merge from 'merge-stream'
import jsxTransform from 'jsx-transform'

import browserify from './browserify'

const src = 'examples/src'
const dest = 'examples/dist'
const jsxify = jsxTransform.browserifyTransform.configure({
  factory: 'h'
})

function copyExamples () {
  return gulp.src(`${src}/{index.html,style.css}`)
    .pipe(gulp.dest(dest))
}

function buildPage (example) {
  return gulp.src(`${src}/example.tmpl.html`)
    .pipe(replace('{{component}}', example))
    .pipe(rename(`${example}.html`))
    .pipe(gulp.dest(dest))
}

export function buildExamples () {
  const transforms = [jsxify, 'babelify']
  const streams = merge(copyExamples())

  const examples = fs.readdirSync(src).filter(f => fs.statSync(`${src}/${f}`).isDirectory())

  examples.forEach((example) => {
    streams.add(browserify(`${src}/${example}/Main.js`, dest, `${example}.js`, transforms))
    streams.add(buildPage(example))
  })

  return streams
}
