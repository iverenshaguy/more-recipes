import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';


gulp.task('default', ['build:watch']);

const watcher = gulp.watch('server/src/**/*.js', ['build:watch']);
watcher.on('change', event => `File ${event.path} was ${event.type}, running tasks...`);


// gulp.task('prebuild', () => gulp.src('server/src/**/*.js')
//   .pipe(babel())
//   .pipe(gulp.dest('server/dist'))
// );

gulp.task('clean', () => del(['server/dist/**/*', '!server/dist'], { force: true }));

gulp.task('sourcemaps', () => gulp.src('server/src/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(concat('all.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('server/dist')));

gulp.task('build', ['clean', 'sourcemaps'], () => gulp.src('server/src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('server/dist')));

gulp.task('build:watch', () => gulp.src('server/src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('server/dist')));
