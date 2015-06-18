module.exports = function(grunt) {

	// configurado os caminhos de diretórios
	paths:{
	  prod : 'dist/', // Pasta que receberá os arquivos otimizados
	  dev : 'src/' //Pasta onde desenvolvo o projeto.
	},

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Agrupar os arquivos JS
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['<%= paths.dev %>jquery.js', '<%= paths.dev %>js/custom.js'],
        dest: '<%= paths.dev %>js/main.js'
      }
    },

    //Minificar os arquivos JS
	  uglify: {
			options: {
			 mangle: {
			   except: ['*.min.js'] //Ignora o que arquivos minificados préviamente
			 }
			},
			my_target: {
			 files: [{
			   expand: true, //Adiciona os arquivos dinamicamente
			   cwd: '<%= paths.dev %>js', //Origem
			   src: ['**/*.js', '!*.min.js'], //O que será minificado
			   dest: '<%= paths.prod %>js' //Destino
			  }]
			}
		},

		//Minificar as imagens.
		imagemin: {
			public: {
			 options: { //Opções de minificação
			   optimizationLevel: 5,
			   progressive: true
			 },
			files: [{
			 expand: true, //Adiciona os arquivos dinamicamente
			 cwd: '<%= paths.dev %>img',//Origem
			 src: '**/*.{png,jpg,jpeg,gif}',//O que será minificado
			 dest: '<%= paths.prod %>img'//Destino
			 }]
			}
		},

		// Compilar o Sass para CSS
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= paths.prod %>main.css': '<%= paths.dev %>main.scss'
        }
      }
    },

    //Monitorar os arquivos  SCSS e JS
    watch: {
      css: {
        files: '<%= paths.dev %>**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: '<%= paths.dev %>js/main.js'
      }
    },

    //Apaga a pasta dist
    clean: {
      dist: {
        src: '<%= paths.prod %>' //pasta que será deletada
      }
    },

    //Copia os arquivos do projeto para a pasta dist.
    copy: {
     files: {
       cwd: '<%= paths.dev %>', //Origem
       src: [
        //O que será copiado
        '**',
        '!/scss/**'//Será ignorado
       ]
       dest: '<%= paths.prod %>', //Destino
       expand: true
      }
    }

  });
		
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('dist', ['clean', 'copy']);

	grunt.registerTask('default', ['dist', 'concat', 'uglify', 'imagemin', 'sass',]);

};