/// <binding ProjectOpened='default' />
/// <vs AfterBuild='default' />
var gulp = require('gulp'),
    bless = require('gulp-bless');
    compass = require('gulp-for-compass');
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    pngquant = require('imagemin-pngquant'),

    // Base Paths
    basePaths = {
        images: 'UI/Images/',
        css: 'UI/CSS/',
        sass: 'UI/Sass/',
        distCSS: 'UI/Dist/CSS'
    };

gulp.task('imageOptim', function () {
    return gulp.src(basePaths.images + '*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(basePaths.images));
});

gulp.task('compass', function () {
    gulp.src(basePaths.sass + '*.scss')
    .pipe(compass({
        cssDir: basePaths.css,
        sassDir: basePaths.sass,
        force: true,
        noLineComments: true,
        outputStyle: 'compressed'
    }));
})

gulp.task('css', function () {
    gulp.src(basePaths.css + '*.css')
    .pipe(bless())
    .pipe(gulp.dest(basePaths.distCSS))
    .pipe(livereload());
});

gulp.task('default', function () {
    livereload.listen();
    gulp.watch(basePaths.sass + '**/*.scss', ['compass']);
    gulp.watch(basePaths.css + '**/*.css', ['css']);
    //gulp.watch(basePaths.images + '*', ['imageOptim']);
});