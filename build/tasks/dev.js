let gulp = require('gulp');
let runSequence = require('run-sequence');
let tools = require('aurelia-tools');
let args = require('../args');

// source code for the tasks called in this file
// is located at: https://github.com/aurelia/tools/blob/master/src/dev.js

// updates dependencies in this folder
// from folders in the parent directory
gulp.task('update-own-deps', function() {
    tools.updateOwnDependenciesFromLocalRepositories(args.depth);
});

// quickly pulls in all of the aurelia
// github repos, placing them up one directory
// from where the command is executed,
// then runs `npm install`
// and `gulp build` for each repo
gulp.task('build-dev-env', function() {
    tools.buildDevEnv();
});


// calls the listed sequence of tasks in order
gulp.task('dev-release', function(callback) {
    return runSequence(
        'build',
        'lint',
        callback
    );
});
