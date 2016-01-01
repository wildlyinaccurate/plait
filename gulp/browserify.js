import path from 'path'

import gulp from 'gulp'
import source from 'vinyl-source-stream'
import rename from 'gulp-rename'
import buffer from 'vinyl-buffer'
import sourcemaps from 'gulp-sourcemaps'
import browserify from 'browserify'

export default function (src, dest, name = src, transforms = []) {
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
