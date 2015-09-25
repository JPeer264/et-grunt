var count = 0;
var cachedCountArray = 0;

generateTasks = module.exports = function(grunt, tasks, toRegisterTasks, countArray) {
	var singleTasks;
	toRegisterTasks = toRegisterTasks || new Array();

	countArray = countArray || 0;
	for (var keyValue in tasks) {
		if (typeof tasks[keyValue] === 'object') {
			if (countArray < cachedCountArray) {
				toRegisterTasks.splice(0, cachedCountArray);
			}

			if (!Array.isArray(tasks[keyValue])) {
				toRegisterTasks.push(keyValue);
				countArray++;

				if (countArray > cachedCountArray && toRegisterTasks.length !== 1) {
					// consoe.log('down here'.bold.green);
					// console.log(countArray - cachedCountArray);
					toRegisterTasks.splice(0, (countArray - cachedCountArray))
				}

				// grunt.verbose.writeln('_______'.green);
				// grunt.verbose.writeln('Key:   ' + keyValue);
				// grunt.verbose.writeln('Count: ' + countArray);
				// grunt.verbose.writeln('Cachedcount: ' + cachedCountArray);
				// grunt.verbose.writeln('Tasks: ' + toRegisterTasks);

				cachedCountArray = countArray;
				generateTasks(grunt, tasks[keyValue], toRegisterTasks, countArray)
			} else {
				var adding = '';
				var showTasks = '';

				// grunt.verbose.writeln('_______'.red);
				// grunt.verbose.writeln('Key:   ' + keyValue);
				// grunt.verbose.writeln('Count: ' + countArray);
				// grunt.verbose.writeln('Cachedcount: ' + cachedCountArray);
				// grunt.verbose.writeln('Tasks: ' + toRegisterTasks + ':' + keyValue);

				singleTasks = tasks[keyValue];
				cachedCountArray = countArray;

				grunt.verbose.writeln('');
				grunt.verbose.writeln('_________'.bold.green);
				grunt.verbose.writeln('Generate:'.green);

				if (keyValue !== 'default') {
					if (toRegisterTasks.length === 0) {
						adding = keyValue;
					} else {
						adding = ':' + keyValue;
					}
				}

				showTasks = toRegisterTasks.join(':') + adding;
				grunt.verbose.writeln('Task:    ' + showTasks);
				grunt.verbose.writeln('Options: ' + singleTasks);
				grunt.registerTask(showTasks, singleTasks);

			}
		}
	}

	count++;
}