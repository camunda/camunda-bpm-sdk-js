let { exec } = require('child_process');

let cmd = undefined;
if (process.env.E2E) {
  cmd = 'echo "require(\'./node_modules/superagent\');" > index.js';
} else {
  if (process.platform !== 'win32') {
    cmd = 'if [ ! -f index.js ]; then npm i --silent && node_modules/.bin/rollup -c --silent; fi';
  }
  else {
    cmd = 'if not exist "index.js" npm i --silent && node_modules\\.bin\\rollup -c --silent';
  }
}

return exec(cmd);