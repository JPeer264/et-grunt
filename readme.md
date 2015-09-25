# et-grunt 0.0.2 [![npm version](https://badge.fury.io/js/et-grunt.svg)](http://badge.fury.io/js/et-grunt)
Grunt task loader including [jit-grunt](https://www.npmjs.com/package/jit-grunt)

> E.T. could be an alien or just a shortcut for `easy task`. ET-grunt is a tool which makes a cleaner structure for your registered tasks.

## Before
```js
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-concat');
...

grunt.registerTask('manage:js', [
	'clean:js',
	'concat:js',
]);

grunt.registerTask('manage:assets', [
	'concat:assets',
	'copy:assets',
]);

grunt.registerTask('serve:dev', [
	'clean',
	'manage:js',
	'connect'
]);
```
## After
```js
require('et-grunt')(grunt, {
	manage: {
		js: [
			'clean:js',
			'concat:js'
		],
		assets: [
			'concat:assets',
			'copy:assets'
		]
	},
	serve: {
		dev: [
			'clean',
			'manage:js',
			'connect'
		]
	}
});
```

## Install

`npm install et-grunt --save-dev`

## Usage


### Gruntfile

```js
require('et-grunt')(grunt, tasksAsObject, jitMappings);
```

```js
// optional
var jitMappings = {
	yourStaticJitMappings
};

require('et-grunt')(grunt, {
	// task
	manage: {
		// default task, means just 'manage'
		default: [
			'manage:sass',
			'manage:js',
			'manage:app',
		],
		// sub task -> 'manage:js'
		js: [
			'concat:js',
			'concat:vendor',
			'clean:bower'
		],
	},
	minify: {
		js: [
			'manage:js',
			'uglify:js'
		]
	}
}, jitMappings);
```

**Now available in your shell:**
```shell
grunt manage
grunt manage:js
grunt minify:js
```

#### Default (task)

In every object you can write `default` as key and `et-grunt` knows automatically that the following array should be called as default.
**Example:**
```js
task: {
	default: ['concat']
}
```
Now this task is registered as `grunt task`


#### Subtasks (task:subtask)

If you want to have subtasks like `manage:js` then you have to nest an object into the other object. **Example:**
```js
task: {
	subtask: ['concat:js']
}
```
Now this task is registered as `grunt task:subtask`

#### Use static mappings with jit-grunt

**Note:** For static mappings please read the how-to [here](https://github.com/shootaroo/jit-grunt)
The argument after the tasks are reserved for jit static mappings.

```js
var jitMappings = {
	// all settings
};

require('et-grunt')(grunt, yourTasks, jitMappings);
```

## Release History

- 2015-09-25   v0.0.2   Added jit-grunt static maps support.
- 2015-09-25   v0.0.1   First release.

## License

The MIT License (MIT)

Copyright (c) Jan Peer <janpeer264@gmail.com> (jpeer.at)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.





