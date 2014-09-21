'use strict';

module.exports = function(grunt) {
    // Show elapsed time at the end
    //require('time-grunt')(grunt);
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['src/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            }
        },
        codeclimate: {
            options: {
                file: 'reports/coverage.lcov',
                token: '50d834aa1d1ebed40e1f09b8d5204e79db570836a07b875004348025cd4cfa3b'
            }
        },
        mochacov: {
            options: {
                files: '<%= jshint.test.src %>'
            },
            unit: {
                options: {
                    reporter: 'dot'
                }
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    output: 'reports/coverage.html'
                }
            },
            lcov: {
                options: {
                    instrument: true,
                    reporter: 'mocha-lcov-reporter',
                    output: 'reports/coverage.lcov'
                }
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'mochacov:unit']
            },
            test: {
                files: [
                    '<%= jshint.src.src %>',
                    '<%= jshint.test.src %>'
                ],
                tasks: ['jshint', 'mochacov:unit']
            }
        }
    });

    grunt.registerTask('codec', ['mochacov:lcov', 'codeclimate']);
    grunt.registerTask('test', ['mochacov:unit']);
    grunt.registerTask('default', ['jshint', 'test']);
};
