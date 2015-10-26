var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rev = require('gulp-rev-append'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    scsslint = require('gulp-scss-lint'), 

	// Base Paths
	paths = {
		src: {
			images: 'UI/SRC/Images/',
	        sass: 'UI/SRC/Sass/'
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

gulp.task('compass', function() {
    gulp.src(paths.src.sass + '*.scss')
    .pipe(compass({
        css: paths.dist.css,
        sass: paths.src.sass,
        image: paths.dist.images,
        require: ['susy', 'breakpoint', 'ceaser-easing']
    }))
    .on('error', function(error) {
        // Would like to catch the error here 
        console.log(error);
        this.emit('end');
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('scss-lint', function() {
  	return gulp.src(paths.src.sass + '**/*.scss')
    .pipe(scsslint());
});

gulp.task('default', function() {
    gulp.watch(paths.src.sass + '**/*.scss', ['scss-lint', 'compass']);
    gulp.watch(paths.dist.images + '*', ['imageOptim']);
    gulp.watch(paths.dist.css + '*.css', ['rev']);
});