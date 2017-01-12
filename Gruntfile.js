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
                        expand: true,
                        cwd: "js/",
                        "src":  "*.js",
                        "dest": "dist/" 
                    }
                ]
            }
        }

    });

    grunt.registerTask("default", ["babel"]);

}