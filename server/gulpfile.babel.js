import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';


gulp.task('default', ['build']);

gulp.watch('src/**/*.js', ['build:watch'], event => `File ${event.path} was ${event.type}, running tasks...`);

// gulp.task('prebuild', () => gulp.src('src/**/*.js')
//   .pipe(babel())
//   .pipe(gulp.dest('dist'))
// );

gulp.task('clean', () => del(['dist/**/*', '!dist'], { force: true }));

gulp.task('sourcemaps', () => gulp.src('src/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(concat('all.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist'))
);

gulp.task('build', ['clean', 'sourcemaps'], () => gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('dist'))
);

gulp.task('build:watch', () => gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('dist'))
);
