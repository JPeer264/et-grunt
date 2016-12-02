'use strict';

module.exports = function (grunt) {

    require('./')(grunt, {
        default: [
            'build:js',
            'build:json',
            'tasks',
            'tasks:ext',
            'tasks:extended'
        ],
        build: {
            default: [
                'build:dev'
            ],
            js: [
                'concat:js',
                'clean'
            ],
            json: [
                'concat:json',
                'clean'
            ],
            deeper: {
                default: [
                    'clean'
                ],
                json: [
                    'clean'
                ]
            }
        }
    });

    grunt.initConfig({
        // variable to tmp folder
        tmp: './tmp',

        concat: {
            js: {
                src: '*.js',
                dest: '<%= tmp %>/test.js'
            },
            json: {
                src: '*.json',
                dest: '<%= tmp %>/new.json'
            }
        },

        clean: {
            tmp: {
                src: '<%= tmp %>/'
            }
        }

    });
}