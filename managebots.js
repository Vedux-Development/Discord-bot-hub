const prompt = require("prompt-sync")();
var shell = require("shelljs");
shell.config.verbose = false;

shell.exec(
  "ls -I node_modules -I start.js -I managebots.js -I package.json -I package-lock.json -I app.js -I README.md -I LICENSE"
);
const cdfile = prompt("What bot would you like to manage: ");

shell.cd(`${cdfile}`);

require("child_process").fork("manage.js");
