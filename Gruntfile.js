module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        files: [{
          expand: true,
          cwd: 'javascripts/',
          src: ['*.js', '!*.min.js'],
          dest: 'javascripts/',
          ext: '.min.js'
        }]
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'stylesheets/',
        src: ['*.css', '!*.min.css'],
        dest: 'stylesheets/',
        ext: '.min.css'
      }
    },
    watch: {
      css: {
        files: ['stylesheets/*.css', '!stylesheets/*.min.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['javascripts/*.js', '!javascripts/*.min.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'cssmin']);

};
