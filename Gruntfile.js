module.exports = function (grunt) {
   require('time-grunt')(grunt);
   require('jit-grunt')(grunt);

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      jscs: {
         options: {
            config: '.jscsrc',
            fix: true
         },
         dist: '<%= jshint.src %>'
      },

      jshint: {
         options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
         },
         src: [
            'src/js/*.js',
            'test/spec/*.js'
         ]
      },

      karma: {
         unit: {
            configFile: 'karma.conf.js'
         }
      },

      jsdoc: {
         src: {
            src: [
               'README.md',
               'src/js/*.js',
               'test/spec/*.js'
            ],
            options: {
               destination: 'doc'
            }
         }
      },

      uglify: {
         options: {
            banner: '/* Audero Context Menu <%= pkg.version %> | Aurelio De Rosa (@AurelioDeRosa) | MIT/GPL-3.0 Licensed */\n'
         },
         dist: {
            files: {
               'dist/js/jquery.auderoContextMenu.min.js': ['src/js/jquery.auderoContextMenu.js']
            }
         }
      },

      cssmin: {
         dist: {
            files: {
               'dist/css/jquery.auderoContextMenu.min.css': ['src/css/jquery.auderoContextMenu.css']
            }
         }
      }
   });

   grunt.registerTask('lint', [
      'jshint',
      'jscs'
   ]);

   grunt.registerTask('test', [
      'karma'
   ]);

   grunt.registerTask('doc', [
      'jsdoc'
   ]);

   grunt.registerTask('build', [
      'uglify',
      'cssmin'
   ]);

   grunt.registerTask('default', [
      'lint',
      'test',
      'doc',
      'build'
   ]);
};