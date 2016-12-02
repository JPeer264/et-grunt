var json = require('json-extra');

/**
 * @description
 * get through the tasks object and filter tasks with options
 *
 * @param tasks {Object} all tasks which should be generated
 */
saveTasks = function(grunt, tasks) {
    var generatedTasks = [];
    var preparedTasks;
    var newGruntTask;

    preparedTasks = json.chain(tasks, {type: 'array'}, ':');

    for (var i = 0; i < preparedTasks.length; i++) {
        var task         = preparedTasks[i];
        var gruntTask    = task;
        var splittedTask = task.split(':');
        var objectToPush = {};

        // check if they are set as default
        if (splittedTask[splittedTask.length - 1] === 'default') {
            newGruntTask = splittedTask.slice(0, splittedTask.length - 1);
            // check if it is the grunt:default or just any nested default
            newGruntTask = newGruntTask.length === 0 ? ['default'] : newGruntTask;
            gruntTask    = newGruntTask.join(':');
        }

        objectToPush.task = gruntTask;
        objectToPush.options = grunt.util._.get(tasks, splittedTask);

        generatedTasks.push(objectToPush);
    }

    registerTasks(grunt, generatedTasks);
    registerSmartTableTask(grunt, generatedTasks);
};

/**
 * register every task which is saved in generatedTasks
 */
registerTasks = function(grunt, generatedTasks) {
    grunt.util._.forEach(generatedTasks, function(elem){
        var task = elem.task;
        var opts = elem.options;

        grunt.registerTask(task, opts);

        grunt.verbose.writeln('_____________________'.bold.green);
        grunt.verbose.writeln('Successful generated:'.green);
        grunt.verbose.writeln('Task:    ' + task);
        grunt.verbose.writeln('Options: ' + opts);
        grunt.verbose.writeln('');
    });
};

/**
 * register the `tasks` task.
 */
registerSmartTableTask = function(grunt, generatedTasks) {
    // register tasks list
    grunt.registerTask('tasks', function (extension) {

        // layout purposes
        grunt.log.writeln('===============');
        grunt.log.writeln('Available tasks');
        grunt.log.writeln('===============');

        // show the first line, once
        grunt.log.writeln('---------------');

        // forEach through the tasks array
        grunt.util._.forEach(generatedTasks, function(elem) {
            var task = elem.task;
            var opts = elem.options;

            // show the task
            switch(extension) {
                // easter egg
                case 'zebra': grunt.log.ok((task).zebra);
                break;

                // easter egg
                case 'rainbow': grunt.log.ok((task).rainbow);
                break;

                default: grunt.log.ok((task).green);
            }

            // show the options just if the subtask is ext or extended
            if (extension === 'ext' || extension === 'extended') {
                console.log(opts);
            }

            // show the last line, each
            grunt.log.writeln('---------------');

        });
    });
};

module.exports = function factory(grunt, tasks, jitMappings) {

    // initialize tasks
    saveTasks(grunt, tasks);

    // jit-grunt static mappings || https://github.com/shootaroo/jit-grunt#static-mappings
    jitMappings = jitMappings || {};

    require('jit-grunt')(grunt, jitMappings);

    // jit-grunt options || https://github.com/shootaroo/jit-grunt#options
    return function (options) {
        options = options || {};

        require('jit-grunt')(grunt)(options);
    };
}
