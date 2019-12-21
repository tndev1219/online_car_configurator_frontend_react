module.exports = function (grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		browserify: {
			build: {
				files: {
					'public/viewer3D/build/deploy.js': ['public/viewer3D/build/app.js']
				}
			}
		},
		concat: {
			options: {
				// banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				// footer: ''
			},
			build: {
				src: ['public/viewer3D/src/viewer/annotation.js', 'public/viewer3D/src/viewer/loaders.js', 'public/viewer3D/src/viewer/scene.js', 'public/viewer3D/src/viewer/viewer3D.js'],

				dest: 'public/viewer3D/build/app.js'
			},
			vendor: {
				src: ['public/viewer3D/src/vendor/jquery.min.js', 'public/viewer3D/src/vendor/underscore.js', 'public/viewer3D/src/vendor/popper.js', 'public/viewer3D/src/vendor/tweenmax.min.js', 'public/viewer3D/src/vendor/Detector.js', 'public/viewer3D/src/vendor/dat.gui.min.js', 'public/viewer3D/src/vendor/three.js', 'public/viewer3D/src/vendor/opentype.min.js'],
				dest: 'public/viewer3D/build/vendor-merge.js'
			}
		},
		uglify: {
			options: {},
			build: {
				src: ['public/viewer3D/build/app.js'],
				dest: 'public/viewer3D/build/app.min.js',
				sourceMap: true
			},
			vendor: {
				src: ['public/viewer3D/vendor/vendor-merge.js'],
				dest: 'public/viewer3D/vendor/vendor-merge.min.js',
				sourceMap: false
			}
		},
		watch: {
			options: { // global opptions for all watchers
				livereload: true
			},
			js: {
				files: 'public/viewer3D/*.js',
				tasks: ['concat']
			},
			html: {
				files: '*.html'
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: '.',
				}
			}
		}

	});

	// Load the plugin that provides the tasks.
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// tasks
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('serve', ['connect:server', 'watch']);
	grunt.registerTask('build', ['concat:build', 'uglify:build']);
	grunt.registerTask('vendor', ['concat:vendor', 'uglify:vendor']);
};
