let { exec } = require('child_process');

return exec('npm i --silent && echo "module.exports = { default: require(\'./node_modules/superagent\') };" > index.js');
