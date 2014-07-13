module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            build: {
                src: [
                    'src/prefix.js',
                    'src/horizonal.js',
                    'src/eventHandlers.js',
                    'src/node.js',
                    'src/nodeCollection.js',
                    'src/api.js',
                    'src/suffix.js'
                ],
                dest: 'dist/horizonal.debug.js'
            }
        },
        copy: {
            files: {
                cwd: 'src/',
                src: ['<%= pkg.name %>.src.js'],
                dest: 'dist/',
                expand: true,
                rename: function() {
                    return "dist/<%= pkg.name %>.debug.js";
                }
            }
        },
        autoprefixer: {
            options: {
                // Target-specific options go here.
            },
            files: {
                src: 'src/<%= pkg.name %>.src.css',
                dest: 'dist/<%= pkg.name %>.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.debug.js']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', '!src/prefix.js', '!src/suffix.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            js: {
                files: ['src/*.js'],
                tasks: ['jshint', 'concat:build', 'uglify']
            },
            css: {
                files: ['src/*.css'],
                tasks: ['autoprefixer']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['jshint', 'concat:build', 'uglify', 'autoprefixer']);

};