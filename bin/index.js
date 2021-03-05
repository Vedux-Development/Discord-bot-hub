#!/usr/bin/env node

const inquirer = require('inquirer');
const shell = require('shelljs');
const fs = require('fs-extra');
const managejs1 = `
const readline = require('readline');
const shell = require("shelljs")
const prompt = require('prompt-sync')();

shell.exec("clear")
console.log("You can type help to find out the commands")

function replDemo() {
  return new Promise(function(resolve, reject) {
	let rl = readline.createInterface(process.stdin, process.stdout)
	rl.setPrompt('ready> ')
	rl.prompt();
	rl.on('line', function(line) {
	  if (line === "exit" || line === "quit" || line == 'q') {
		rl.close()
		return // bail here, so rl.prompt() isn't called again
	  }

	  if (line === "help" || line === '?') {
		console.log(\`[vsc] Open vsc \n[start] Start The Bot \n[update] Update Needed Packages \n[install] Install Packages \n[needed] Run this to install needed packages \n [exit] this will exit this script\`)
	  } else if (line === "start") {
		shell.exec("node index.js")
		rl.close()
	  } else if (line === "vsc") {
		shell.exec("code .")
	  } else if (line === "update"){
		console.log("Updating packages")
		shell.exec("npm i")
	  } else if (line === "install"){
		console.log("What package do you wish to install")
		var package = prompt()
		shell.exec(\`npm i \${package}\`)
		console.log("Installed fs")
	  } else if (line === "needed"){
		console.log("Installing the packages")
		shell.exec("npm i discord.js")
		console.log("Installed Discord.js")
		shell.exec("npm i fs")
		console.log("Installed fs")
	  } else {
		console.log(\`Unknown command: "$\{line}"\`)
	  }
	  rl.prompt()

	}).on('close',function(){
	  console.log('bye')
	  resolve(42) // this is the final result of the function
	});
  })
}

async function run() {
  try {
	let replResult = await replDemo()
	console.log('repl result:', replResult)

  } catch(e) {
	console.log('failed:', e)
  }
}

run()
`;
const managejs2 = `
const readline = require('readline');
const shell = require("shelljs")
const prompt = require('prompt-sync')();

shell.exec("clear")
console.log("You can type help to find out the commands")

function replDemo() {
  return new Promise(function(resolve, reject) {
	let rl = readline.createInterface(process.stdin, process.stdout)
	rl.setPrompt('ready> ')
	rl.prompt();
	rl.on('line', function(line) {
	  if (line === "exit" || line === "quit" || line == 'q') {
		rl.close()
		return // bail here, so rl.prompt() isn't called again
	  }

	  if (line === "help" || line === '?') {
		console.log(\`[vsc] Open vsc \n[start] Start The Bot \n[update] Update Needed Packages \n[install] Install Packages \n[needed] Run this to install needed packages \n [exit] this will exit this script\`)
	  } else if (line === "start") {
		shell.exec("node index.js")
		rl.close()
	  } else if (line === "vsc") {
		shell.exec("code .")
	  } else if (line === "update"){
		console.log("Updating packages")
		shell.exec("npm i")
	  } else if (line === "install"){
		console.log("What package do you wish to install")
		var package = prompt()
		shell.exec(\`npm i \${package}\`)
		console.log("Installed fs")
	  } else if (line === "needed"){
		console.log("Installing the packages")
		shell.exec("npm i discord.js")
		console.log("Installed Discord.js")
		shell.exec("npm i fs")
		console.log("Installed fs")
	  } else {
		console.log(\`Unknown command: "$\{line}"\`)
	  }
	  rl.prompt()

	}).on('close',function(){
	  console.log('bye')
	  resolve(42) // this is the final result of the function
	});
  })
}

async function run() {
  try {
	let replResult = await replDemo()
	console.log('repl result:', replResult)

  } catch(e) {
	console.log('failed:', e)
  }
}

run()
`;


// console.log(process.cwd());

const dir = './discord-bot-hub';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}
shell.cd(dir);

const file = './managebots.js';
const managefile = `

const prompt = require("prompt-sync")();
var shell = require("shelljs");
shell.config.verbose = false;

shell.exec('clear')
shell.exec(
  "ls -I node_modules -I start.js -I managebots.js -I package.json -I package-lock.json -I app.js -I README.md -I LICENSE"
);
const cdfile = prompt("What bot would you like to manage: ");

shell.cd(\`\${cdfile}\`);

require("child_process").fork("manage.js");

`;
fs.writeFileSync(file, managefile);

inquirer.prompt([{
	type: 'list',
	name: 'startanswer',
	message: 'Select what you wanna do!',
	choices: ['Manage bots?', 'Setup a bot?', 'Update DBH'],
}])
	.then(function(answer) {
		if (answer.startanswer == 'Manage bots?') {
			require('child_process').fork('managebots.js');
		} else if (answer.startanswer == 'Setup a bot?') {
			inquirer.prompt([{
				type: 'list',
				name: 'language',
				message: 'Please select your language',
				choices: ['discord.js', 'discord.py'],
			}])
				.then(function(answer) {
					if (answer.language == 'discord.py') {
						console.log('Sorry this feature is not out yet');
					}
					if (answer.language == 'discord.js') {
						inquirer.prompt([{
							type: 'list',
							name: 'djssetup',
							message: 'What template do you want to use?',
							choices: ['Basic bot with a command handler', 'Make your own bot', 'Install a github repo'],
						}])
							.then(function(answer) {
								if (answer.djssetup == 'Install a github repo') {
									inquirer.prompt([{
										type: 'input',
										name: 'dirname',
										message: 'What do you want your bot dir to be?',
										default: 'discord-bot',
									}])
										.then(function(answer) {
											const botDir = `${answer.dirname}`;

											inquirer.prompt([
												{
													type: 'input',
													name: 'repo',
													message: 'Git install link',
												},
											])
												.then(function(answer) {
													console.log('Installing the repository');
													shell.exec(`git clone ${answer.repo} ${botDir}`);
													fs.writeFile(`./${botDir}/manage.js`, managejs2, (err) => {
														// throws an error, you could also catch it here
														console.log(err);
													});
													inquirer.prompt([{
														type: 'list',
														name: 'managehub',
														message: 'Would you like to go to manage hub, By going here you can manage your bot!',
														choices: ['Yes', 'No'],
													}])
														.then(function(answer) {
															if (answer.managehub == 'Yes') {
																require('child_process').fork('managebots.js');
															}
														});
												});
										});
								}
								if (answer.djssetup == 'Make your own bot') {
									inquirer.prompt([{
										type: 'input',
										name: 'dirname',
										message: 'What do you want your bot dir to be?',
										default: 'discord-bot',
									}])
										.then(function(answer) {
											const botDir = `${answer.dirname}`;
											if (!fs.existsSync(botDir)) {
												fs.mkdirSync(botDir);
											}


											fs.writeFile(`./${botDir}/manage.js`, managejs2, (err) => {
												// throws an error, you could also catch it here
												console.log(err);
											});
											inquirer.prompt([{
												type: 'list',
												name: 'managehub',
												message: 'Would you like to go to manage hub, By going here you can manage your bot!',
												choices: ['Yes', 'No'],
											}])
												.then(function(answer) {
													if (answer.managehub == 'Yes') {
														require('child_process').fork('managebots.js');
													}
												});
										});
								}
								if (answer.djssetup == 'Basic bot with a command handler') {
									inquirer.prompt([{
										type: 'input',
										name: 'dirname',
										message: 'What do you want the bot dir to be?',
										default: 'discord-bot',
									},
									{
										type: 'input',
										name: 'token',
										message: 'What is your bots token?',
									},
									{
										type: 'input',
										name: 'prefix',
										message: 'What do you want your bots prefix to be?',
										default: '!',
									},
									{
										type: 'input',
										name: 'status',
										message: 'What do you want your bots status to be?',
									},
									])
										.then(function(answer) {
											const commandsf = 'commands';
											const botDir = `${answer.dirname}`;
											if (!fs.existsSync(botDir)) {
												fs.mkdirSync(botDir);
											}
											fs.mkdir(
												`${botDir}/${commandsf}`, {
													recursive: true,
												},
												(err) => {
													if (err) throw err;
												},
											);
											const writeStream = fs.createWriteStream(`./${botDir}/config.json`);
											writeStream.write('{ \n');
											writeStream.write(`  "token": "${answer.token}", \n`);
											writeStream.write(`  "prefix": "${answer.prefix}", \n`);
											writeStream.write(`  "status": "${answer.status}" \n`);
											writeStream.write('} \n');
											writeStream.end();

											const index = `
      let Discord = require("discord.js");
      let fs = require("fs")
      let client = new Discord.Client();
      client.commands = new Discord.Collection();
      const config = require("./config.json")
      client.token = config.token;
      client.status = config.status;
      fs.readdir("./commands/", (err, files) => {
          if (err) console.log(err)
          let jsfile = files.filter(f => f.split(".").pop() === "js")
          if(jsfile.length <= 0){
              console.log("No commands found...")
              return;
          }
          jsfile.forEach((f, i) => {
              let props = require(\`./commands/\${f}\`)
              console.log(\`\${f} loaded\`)
              client.commands.set(props.help.name, props);
          })
      })
      client.on('message', async message => {
          if(message.author.bot) return;
          if(message.channel.type === 'dm') return;
          let prefix = config.prefix;
          let messageArray = message.content.split(" ")
          let cmd = messageArray[0]
          let args = messageArray.slice(1)
          let commandfile = client.commands.get(cmd.slice(prefix.length));
          if(commandfile) commandfile.run(client, message, args);
      })
      client.on("ready", () =>{
          client.user.setPresence({
              status: 'online',
              activity: {
                  name: config.status,
                  type: 'WATCHING',
                  url: 'https://www.twitch.tv/'
              }
          })
       });
      client.login(client.token)
      
`;
											fs.writeFile(`./${botDir}/index.js`, index, (err) => {
												// throws an error, you could also catch it here
												if (err) throw err;

												// success case, the file was saved
											});
											const command1 = `
const Discord = require("discord.js")
module.exports.run = async (client, message, args) => {
    message.channel.send("Hellooooo")
}
module.exports.help = {
    name: "hello"
}
`;

											fs.writeFile(`./${botDir}/${commandsf}/hello.js`, command1, (err) => {
												// throws an error, you could also catch it here
												if (err) throw err;

												// success case, the file was saved
											});


											fs.writeFile(`./${botDir}/manage.js`, managejs1, (err) => {
												// throws an error, you could also catch it here
												if (err) throw err;
												console.log('Bot done generating');

												inquirer.prompt([{
													type: 'list',
													name: 'managehub',
													message: 'Would you like to go to manage hub, By going here you can install needed packages!',
													choices: ['Yes', 'No'],
												}])
													.then(function(answer) {
														if (answer.managehub == 'Yes') {
															require('child_process').fork('managebots.js');
														}
														if (answer.managehub == 'No') {
															console.log('Closing');
														}
													});
											});
										});
								}
							});
					}
				});
		}
		if (answer.startanswer == 'Update DBH') {
			console.log('Sorry this feature is currently not out!');
		}
	});
