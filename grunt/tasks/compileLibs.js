let { promisify } = require('util');
let exec = promisify(require('child_process').exec);
let path = require('path');
let libs = ['vendor/superagent'];

module.exports = function(grunt) {
  grunt.registerTask('compileLibs', function() {
    let done = this.async();

    let cmd = 'npm run build';
    if (process.platform === 'win32') {
      cmd = cmd.replace(/\//g, '\\');
    }

    let builds = libs.map(lib => {
      let libPath = path.join(__dirname, `../../${lib}/`);      
      return exec(cmd, { maxBuffer: 1024 * 500, cwd: libPath });
    });

    Promise.all(builds)
      .then(() => done())
      .catch(console.error);
  });
};
