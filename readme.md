# et-grunt

> E.T. could be an alien or just a shortcut for `easy task`. ET-grunt is a tool which makes a cleaner structure for your registered tasks

## Usage

### Gruntfile

```js
require('et-grunt')(grunt, tasksAsObject);
```

```js
require('et-grunt')(grunt, {
	// task
	manage: {
		// default task, means just 'manage'
		default: [
			'manage:sass',
			'manage:js',
			'manage:app',
		],
		// sub task -> 'manage:sass'
		sass: [
			'concat:scss',
			'sass:dev'
		],
		// sub task -> 'manage:js'
		js: [
			'concat:js',
			'concat:vendor',
			'clean:bower'
		],
		// sub task -> 'manage:app'
		app: [
			'concat:app',
			'clean:template',
		],
	},
});
```

*Result:*
```shell
manage
manage:sass
manage:js
manage:app
```

## Future

* Using jit-grunt for loading tasks faster