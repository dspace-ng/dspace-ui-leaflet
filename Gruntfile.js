module.exports = function(grunt) {

  grunt.initConfig({

    // serve documentation
    connect: {
      doc: {
        options: {
          port: 8001,
          hostname: "*",
          base: 'tmp',
          livereload: 35730
        }
      }
    },
    watch: {
      src: {
        files: "src/**",
        tasks: ["jshint"]
      },
      doc: {
        files: "README.md",
        tasks:["markdown"],
        options: {
          livereload: 35730
        }
      }
    },
    markdown: {
      doc: {
        files: [
          {
            src: 'README.md',
            dest: 'tmp/README.md.html'
          }
        ]
      }
    },
    jshint: {
      all: ["Gruntfile.js", "src/**"]
    }
  });


  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['markdown', 'jshint', 'connect', 'watch']);

};
