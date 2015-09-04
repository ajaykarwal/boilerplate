var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rev = require('gulp-rev-append'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),

	// Base Paths
	basePaths = {
		images: 'UI/Images/',
		css: 'UI/CSS/',
        sass: 'UI/SASS/',
		dest: ''
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

gulp.task('rev', function() {
    gulp.src('./index.html')
        .pipe(rev())
        .pipe(gulp.dest('./'));
});

gulp.task('compass', function() {
    gulp.src(basePaths.sass + '*.scss')
    .pipe(compass({
        css: basePaths.css,
        sass: basePaths.sass,
        image: basePaths.images,
        require: ['susy', 'breakpoint', 'ceaser-easing']
    }))
    .on('error', function(error) {
        // Would like to catch the error here 
        console.log(error);
        this.emit('end');
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest(basePaths.css));
});

gulp.task('default', function() {
    gulp.watch(basePaths.sass + '**/*.scss', ['compass']);
    gulp.watch(basePaths.images + '*', ['imageOptim']);
    gulp.watch(basePaths.css + '*.css', ['rev']);
});