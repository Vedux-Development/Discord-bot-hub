exports.manage1 = `const readline = require('readline');
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

exports.manage2 = `
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

async function run
	let replResult = await replDemo()
	console.log('repl result:', replResult)

  } catch(e) {
	console.log('failed:', e)
  }
}

run()
`;

exports.managefile = `
const prompt = require("prompt-sync")();
var shell = require("shelljs");
shell.config.verbose = false;

shell.exec('clear')
shell.exec(
  "ls -I node_modules -I start.js -I managebots.js -I package.json -I package-lock.json -I app.js -I README.md -I LICENSE"
);
const cdfile = prompt("What bot would you like to manage: ");

shell.cd(\`./\${cdfile}\`);

require("child_process").fork("manage.js");

`;

exports.command1 = `
const Discord = require("discord.js")
module.exports.run = async (client, message, args) => {
    message.channel.send("Hellooooo")
}
module.exports.help = {
    name: "hello"
}
`;

exports.index = `
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
