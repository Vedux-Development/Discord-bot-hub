#!/usr/bin/env node

const inquirer = require('inquirer');
const shell = require('shelljs');
const fs = require('fs-extra');
const cmdhandler = require("./templates/cmdhandler")
const errormessages = require("./templates/errors.json")


// console.log(process.cwd());

const dir = './discord-bot-hub';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}
shell.cd(dir);

const file = './managebots.js';

fs.writeFileSync(file, cmdhandler.managefile);



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
						console.log('But you can always make a pull request with this feature')
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
													shell.exec(`git clone ${answer.repo} ${botDir}`)
													fs.writeFile(`./${botDir}/manage.js`, cmdhandler.manage2, (err) => {
														
													});
													inquirer.prompt([{
														type: 'list',
														name: 'managehub',
														message: 'Would you like to go to manage hub, By going here you can manage your bot!',
														choices: ['Yes', 'No']
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


											fs.writeFile(`./${botDir}/manage.js`, cmdhandler.manage2, (err) => {
											});
											inquirer.prompt([
												{
												type: 'list',
												name: 'managehub22',
												message: 'Would you like to go to manage hub, By going here you can manage your bot!',
												choices: ["Yes","No"],
												}
											])
												.then(function(answer) {
													if (answer.managehub22 == 'No'){
														console.log("Ok bye")
													}
													if (answer.managehub22 == 'Yes') {
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

											fs.writeFile(`./${botDir}/index.js`, cmdhandler.index, (err) => {
												// throws an error, you could also catch it here
												if (err) throw err;

												// success case, the file was saved
											});

											fs.writeFile(`./${botDir}/${commandsf}/hello.js`, cmdhandler.command1, (err) => {
												// throws an error, you could also catch it here
												if (err) throw err;

												// success case, the file was saved
											});


											fs.writeFile(`./${botDir}/manage.js`, cmdhandler.manage1, (err) => {
												// throws an error, you could also catch it here
												
											});
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
								}
							});
					}
				});
		}
		if (answer.startanswer == 'Update DBH') {
			console.log("Updating DBH")
			inquirer.prompt([{
				type: 'list',
				name: 'os',
				message: 'What is your OS',
				choices: ['Windows','Linux/Mac']
			}])
			.then(function(answer){
				if (answer.os == 'Windows'){
					console.log("Updating DBH, This may take awhile")
					shell.exec('npm i -g discord-bot-hub')
					console.log("Finished install")
				}
				else if (answer.os == 'Linux/Mac'){
					console.log("Updating DBH, This may take awhile")
					shell.exec('sudo npm i -g discord-bot-hub')
					console.log("Finished updating")
				}
			})
		}
	});
