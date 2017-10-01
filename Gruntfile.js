/**
 * Copyright (c) 161 SARL, https://161.io
 */

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            compile: {
                options: {
                    sourceMap: true
                },
                files: {
                    'retina-2x.js': 'retina-2x.coffee'
                }
            }
        },
        uglify: {
            min_js: {
                files: [
                    {
                        'retina-2x.min.js': ['retina-2x.js']
                    }
                ]
            }
        },
        watch: {
            coffee: {
                files: ['**/*.coffee'],
                tasks: 'coffee'
            },
            uglify: {
                files: ['**/*.js', '!**/*.min.js'],
                tasks: 'uglify'
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['coffee', 'uglify']);

};
