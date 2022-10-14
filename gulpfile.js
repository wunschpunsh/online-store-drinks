import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import rename from 'gulp-rename';
import csso from 'postcss-csso';
import htmlmin from 'gulp-htmlmin';
import jsmin from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import { deleteAsync } from 'del';

// Styles

export const styles = () => {
  return gulp
    .src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
};

export const stylesLeaflet = () => {
  return gulp
    .src('source/leaflet/*.css', { sourcemaps: true })
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(gulp.dest('build/leaflet', { sourcemaps: '.' }));
};

// HTML

const html = () => {
  return gulp
    .src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
};

// JS

const scripts = () => {
  return gulp.src('source/js/*.js').pipe(jsmin()).pipe(gulp.dest('build/js'));
};

//  IMG

const optimizeImage = () => {
  return gulp
    .src('source/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
};

export const optimizeImageLeaflet = () => {
  return gulp
    .src('source/leaflet/**/*.png')
    .pipe(squoosh())
    .pipe(gulp.dest('build/leaflet'));
};

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}').pipe(gulp.dest('build/img'));
};

const createWebp = () => {
  return gulp
    .src('source/img/**/*.{jpg,png}')
    .pipe(squoosh({ webp: {} }))
    .pipe(gulp.dest('build/img'));
};

const svg = () => {
  return gulp
    .src('source/img/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('build/img'));
};

const createSprite = () => {
  return gulp
    .src('source/img/sprite/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({ inLineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
};

// Copy

const copyFiles = (done) => {
  gulp
    .src(['source/fonts/*.{woff,woff2}', 'source/leaflet/*.{js,html}'], {
      base: 'source',
      sourcemaps: true,
    })
    .pipe(gulp.dest('build', { sourcemaps: '.' }));
  done();
};

// Clean

const clean = () => {
  return deleteAsync(['build']);
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build',
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html', gulp.series(html, reload));
  gulp.watch('source/js/**/*.js', gulp.series(scripts, reload));
};

// Reload

const reload = (done) => {
  browser.reload();
  done();
};

// Build

export const build = gulp.series(
  clean,
  copyFiles,
  optimizeImage,
  optimizeImageLeaflet,
  gulp.parallel(styles, html, scripts, svg, createSprite, createWebp)
);

//  Develop

export default gulp.series(
  clean,
  copyFiles,
  copyImages,
  optimizeImageLeaflet,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    createSprite,
    createWebp,
    stylesLeaflet
  ),
  gulp.series(server, watcher)
);
