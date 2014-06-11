module.exports = function (grunt) {

   // Load grunt tasks automatically
   require('load-grunt-tasks')(grunt);

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      jshint: {
         options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
         },
         src: 'src/js/jquery.auderoContextMenu.js'
      },

      uglify: {
         options: {
            banner: '/* Audero Context Menu <%= pkg.version %> | Aurelio De Rosa (@AurelioDeRosa) | MIT/GPL-3.0 Licensed */\n'
         },
         dist: {
            files: {
               'src/js/jquery.auderoContextMenu.min.js': ['src/js/jquery.auderoContextMenu.js']
            }
         }
      },

      cssmin: {
         dist: {
            files: {
               'src/css/jquery.auderoContextMenu.min.css': ['src/css/jquery.auderoContextMenu.css']
            }
         }
      }
   });

   grunt.registerTask('build', [
      'uglify',
      'cssmin'
   ]);

   grunt.registerTask('default', [
      'jshint',
      'build'
   ]);

}