// var _ = require('lodash');
var count = 0;
var lastIndexOfObject = 0;

var et = {
	tasks: {},
	generatedTasks: new Array()
};

/**
 * @description
 * get through the tasks object and filter tasks with options
 *
 * @param tasks {Object} all tasks which should be generated
 */
et.saveTasks = function(tasks, toRegisterTasks, countObject) {
	var grunt = et.grunt;
	var singleTasks;
	toRegisterTasks = toRegisterTasks || new Array();
	tasks = tasks || et.tasks;

	countObject = countObject || 0;
	for (var keyValue in tasks) {
		if (typeof tasks[keyValue] === 'object') {
			// if the array was deeper, slice the difference
			if (countObject < lastIndexOfObject) {
				toRegisterTasks.splice(0, lastIndexOfObject);
			}

			if (!Array.isArray(tasks[keyValue])) {
				// is no array
				toRegisterTasks.push(keyValue);
				countObject++;

				if (countObject > lastIndexOfObject && toRegisterTasks.length !== 1) {
					toRegisterTasks.splice(0, (countObject - lastIndexOfObject))
				}

				// cache old
				lastIndexOfObject = countObject;

				// call recursive
				et.saveTasks(tasks[keyValue], toRegisterTasks, countObject);

				// grunt.verbose.writeln('_______'.green);
				// grunt.verbose.writeln('Key:   ' + keyValue);
				// grunt.verbose.writeln('Count: ' + countObject);
				// grunt.verbose.writeln('Cachedcount: ' + lastIndexOfObject);
				// grunt.verbose.writeln('Tasks: ' + toRegisterTasks);
			} else {
				// is array
				var adding = '';
				var showTasks = '';
				var taskArray;

				singleTasks = tasks[keyValue];
				lastIndexOfObject = countObject;

				// if the keyValue's name is not default
				// keyValue should be added to the tasks
				if (keyValue !== 'default') {
					// is toRegisterTasks empty?
					if (toRegisterTasks.length === 0) {
						adding = keyValue;
					} else {
						adding = ':' + keyValue;
					}
				} else if (keyValue === 'default' && countObject === 0) { // register default task
					adding = keyValue
				}

				showTasks = toRegisterTasks.join(':') + adding;

				taskArray = {
					task: showTasks,
					options: singleTasks
				};

				et.generatedTasks.push(taskArray);

				// grunt.verbose.writeln('_______'.red);
				// grunt.verbose.writeln('Key:   ' + keyValue);
				// grunt.verbose.writeln('Count: ' + countObject);
				// grunt.verbose.writeln('Cachedcount: ' + lastIndexOfObject);
				// grunt.verbose.writeln('Tasks: ' + toRegisterTasks + ':' + keyValue);
			}
		}
	}

	count++;
};

et.registerTasks = function() {
	var grunt = et.grunt;
	var tasks = et.generatedTasks;

	grunt.util._.forEach(tasks, function(elem){
		var task = elem.task;
		var opts = elem.options;

		grunt.registerTask(task, opts);

		// grunt.verbose.writeln('_____________________'.bold.green);
		// grunt.verbose.writeln('Successful generated:'.green);
		// grunt.verbose.writeln('Task:    ' + task);
		// grunt.verbose.writeln('Options: ' + opts);
		// grunt.verbose.writeln('');
	});
};

et.registerSmartTableTask = function() {
	var grunt = et.grunt;
	var tasks = et.generatedTasks;

	// register tasks list
	grunt.registerTask('tasks', function (extention) {
		
		// layout purposes
		grunt.log.writeln('===============');
		grunt.log.writeln('Available tasks');
		grunt.log.writeln('===============');

		// show the first line, once
		grunt.log.writeln('---------------');
		
		// forEach through the tasks array
		grunt.util._.forEach(tasks, function(elem) {
			var task = elem.task;
			var opts = elem.options;

			// show the task
			switch(extention) {
				// easter egg
				case 'zebra': grunt.log.ok((task).zebra);
				break;

				// easter egg
				case 'rainbow': grunt.log.ok((task).rainbow);
				break;

				default: grunt.log.ok((task).green);
			}

			// show the options just if the subtask is ext or extended
			if (extention === 'ext' || extention === 'extended') {
				console.log(opts);
			}

			// show the last line, each
			grunt.log.writeln('---------------');

		});
	});
};

module.exports = function factory(grunt, tasks, jitMappings) {
	et.grunt = grunt;
	et.tasks = tasks;

	// initialize tasks
	et.saveTasks();
	et.registerTasks();
	et.registerSmartTableTask();

	// jit-grunt static mappings || https://github.com/shootaroo/jit-grunt#static-mappings
	if (jitMappings) {
		require('jit-grunt')(grunt, jitMappings);
	}

	// jit-grunt options || https://github.com/shootaroo/jit-grunt#options
	return function (options) {
		options = options || {};

		require('jit-grunt')(grunt)(options);
	};
}
