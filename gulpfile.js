/// <binding ProjectOpened='default' />
/// <vs AfterBuild='default' />
var gulp = require('gulp'),
	bless = require('gulp-bless'), 
    compass = require('gulp-for-compass'), 
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rev = require('gulp-rev-append'),
    minifyCSS = require('gulp-minify-css'),
    scsslint = require('gulp-scss-lint'), 
    livereload = require('gulp-livereload'),

	// Base Paths
	paths = {
		src: {
			images: 'UI/SRC/Images/',
	        sass: 'UI/SRC/Sass/',
	        css: 'UI/SRC/CSS/'
		}, 
		dist: {
			images: 'UI/Dist/Images/',
			css: 'UI/Dist/CSS/'		
		}
	}

gulp.task('imageOptim', function () {
    return gulp.src(paths.src.images + '*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.dist.images));
});

gulp.task('rev', function() {
    gulp.src('./index.html')
        .pipe(rev())
        .pipe(gulp.dest('./'));
});

gulp.task('compass', function () {
    gulp.src(paths.src.sass + '*.scss')
    .pipe(compass({
        cssDir: paths.src.css,
        sassDir: paths.src.sass,
        force: true,
        noLineComments: true,
        outputStyle: 'compressed', 
        sourcemap: true
    }));
})

gulp.task('scss-lint', function() {
  	return gulp.src(paths.src.sass + '**/*.scss')
    .pipe(scsslint());
});

gulp.task('css', function () {
    gulp.src(paths.src.css + '*.css')
    .pipe(bless())
    .pipe(gulp.dest(paths.dist.css))
    .pipe(livereload());
});

gulp.task('default', function() {
    livereload.listen();
    gulp.watch(paths.src.sass + '**/*.scss', ['scss-lint', 'compass']);
    gulp.watch(paths.src.css + '**/*.css', ['css']);
    gulp.watch(paths.src.images + '*', ['imageOptim']);
    gulp.watch(paths.dist.css + '*.css', ['rev']);
});