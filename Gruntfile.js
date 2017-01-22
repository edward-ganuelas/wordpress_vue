module.exports = function(grunt){
require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "babel": {
            options: {
                sourceMap: true
            },
            dist:{
                files:[
                    {
                        "dist/main.js": 'js/main.js'
                    }
                ]
            }
        },
        "concat":{
            dist:{
                src: ["node_modules/vue/dist/vue.js", "node_modules/vue-router/dist/vue-router.js", "dist/main.js"],
                dest: 'dist/main.js'
            }
        },
        "uglify":{
            my_target:{
                files:{
                    "dist/main.min.js":["dist/main.js"]
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask("default", ["babel","concat","uglify"]);

}