// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    config.name = grunt.file.readJSON(config.app + '/package.json').name;


    grunt.initConfig({
        config: config,

        shell: {
            run: {
                command: 'jpm run'
            },
            xpi: {
                command: [
                    'jpm xpi',
                ]
            },
	    post: {
                command: [
                    'jpm post --post-url http://localhost:8888/',
                ]		
	    }, 
	    postwatch: {
                command: [
                    'jpm postwatch --post-url http://localhost:8888/',
                ]		
	    }, 
            build: {
                command: [
                    'jpm xpi <%%= config.app %>',
                    'mv <%%= config.name %>.xpi <%%= config.dist %>'
                ].join('&&')
            }
        },
        watch: {
            xpi: {
                tasks: ['shell:postwatch']
            }
        },
        wiredep: {
            task: {
                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    'app/data/{,*}/*.html'
                ],
                options: {
                    // See wiredep's configuration documentation for the options
                    // you may pass:

                    // https://github.com/taptapship/wiredep#configuration
                }
            }
        }
    });

    grunt.registerTask('run', ['shell:run']);
    grunt.registerTask('build', ['shell:build']);
    grunt.registerTask('default', ['run']);
};
