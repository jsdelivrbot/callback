import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'
import watch from 'gulp-watch'
import w3cValid from 'gulp-htmlhint'
import gulpFilter from 'gulp-filter'
import mainBowerFiles from 'main-bower-files'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import newer from 'gulp-newer'
import babel from 'gulp-babel'
import plumber from 'gulp-plumber'

import postcss from 'gulp-postcss'
import imagesizecss from 'postcss-assets'
import cssmin from 'cssnano'
import cssnext from 'postcss-cssnext'
import styleshort from 'postcss-short'
import precss from 'precss'

import browserSync from 'browser-sync';
const reload = browserSync.reload;

const path = {
  build: {
    html: './dist/',
    js: './dist/js/',
    css: './dist/css/',
    img: './dist/img/',
    fonts: './dist/fonts/'
  },
  src: {
    src: './src/',
    js: './src/js/',
    style: './src/style/',
    img: './src/img/',
    fonts: './src/fonts/**/*.*'
  }
};

gulp.task('build-js', () => {
  gulp.src(`${path.src.js}*.js`)
      .pipe(newer(`${path.build.js}main.js`))
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['es2015'],
        compact: false
      }))
      .pipe(concat('main.js'))
      .pipe(gulp.dest(path.build.js))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
      .pipe(gulp.dest(path.build.js))
      .pipe(reload({stream:true}))
});
gulp.task('build-style', () => {
  const processors = [
    precss,
    imagesizecss,
    cssnext,
    styleshort,
    cssmin({ autoprefixer: false })
  ];
  gulp.src(`${path.src.style}*.css`)
      .pipe(sourcemaps.init())
      .pipe(postcss(processors))
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
      .pipe(gulp.dest(path.build.css))
      .pipe(reload({stream:true}))
});
gulp.task('build-html', () => {
    gulp.src(`${path.src.src}*.html`)
      .pipe(w3cValid())
      .pipe(gulp.dest(path.build.html))
      .pipe(reload({stream:true}))
});
gulp.task('build-img', () => {
    gulp.src(`${path.src.img}**/*.*`)
      .pipe(gulp.dest(path.build.img))
      .pipe(reload({stream:true}))
});

gulp.task('watch', () => {
  browserSync({
    server: {
      baseDir: "./dist"
    },
    port: 8080,
    open: false,
    notify: false
  });
  watch(`${path.src.src}**/*.html`, gulp.parallel('build-html'));
  watch(`${path.src.style}**/*.css`, gulp.parallel('build-style'));
  watch(`${path.src.js}**/*.js`, gulp.parallel('build-js'));
  watch(`${path.src.img}**/*.*`, gulp.parallel('build-img'));
});

gulp.task('default', gulp.parallel(
    'build-js',
    'build-style',
    'build-html',
    'build-img',
    'watch'
));

