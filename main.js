// console.log("Hello World!");
//
// const {a, myFunc} = require('./services/test');
// console.log(a);
// myFunc();


//HTTP
//-------------------------------------------
// const http = require('http');
//
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//
//     if (req.url === '/cars') {
//         switch (req.method) {
//             case 'GET':
//                 return res.end(JSON.stringify({
//                     data: 'my cars'
//                 }))
//             case "POST":
//                 return res.end(JSON.stringify({
//                     data: 'Want to create car'
//                 }))
//         }
//     }
// });
//
// server.listen(5555);

// path
// //--------------------------------
// const path = require('node:path');
// const { myFunc } = require('./services/test');
//
// // c:\\myDirectory\ddd
// // /cde/dddd/
//
// const filePath = path.join(process.cwd(), 'services', 'test.js');
// console.log(path.basename(filePath)); // give the last part of the path
// console.log(filePath);
// console.log(path.dirname(filePath)); // give all path except the last part
// console.log(path.extname(filePath)); // give file extension
// console.log(path.parse(filePath)); // give object about your path
// console.log(path.normalize('//home/red/\\IdeaProjects////111///nodejs////service')); // normalize your path if it needs
// console.log(path.isAbsolute(filePath));

// readLine
//--------------------------
// const readline = require('node:readline/promises');
//
// const start = async () => {
//     const rlInterface = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//     const name = await rlInterface.question('What is your name? ');
//     const age = await rlInterface.question('How old are you? ');
//
//     console.log(`Hello! ${name} - ${age}`);
//     rlInterface.close();
//     // process.exit(0);
// }
// start();

// fs
// ------------------------------
// const fsPromises = require('node:fs/promises');
// const fs = require('node:fs');
// const path = require('path');
// const readline = require('readline');
//
// const start = async () => {
//     await fs.mkdir(path.join('storage', 'files'), { recursive: true });
//     const filePath = path.join('storage', 'adddd.txt');
//     await fs.writeFile(filePath, 'Hello World\n');
//     await fs.appendFile(filePath, 'Hello World!!!!!!\n'); //add to file
//     const buffer = await fs.readFile(filePath, { encoding: 'utf8' });
//     console.log(buffer);
//     await fs.rename(filePath, path.join(process.cwd(),'storage', 'asd','myFile2.txt'));
//     await fs.rename(filePath, path.join(path.dirname(filePath), 'addddd.txt'));
//     await fs.copyFile(filePath, path.join(path.dirname(filePath), 'myFile.txt'));
//     await fs.rm(path.join(process.cwd(), 'storage'), { recursive: true }); // delete directory
//     await fs.unlink('1111.txt'); // delete file
//     const stats = await fs.stat('services/test.js');
//     console.log(stats.isDirectory());
//
//     const fileStream = fs.createReadStream(filePath,'utf8' );
//     const rl= readline.createInterface({
//         input: fileStream
//     });
//     try {
//         for await (const line of rl) {
//             await fsPromises.appendFile('rest.txt', `${line}-----------------\n`);
//         }
//     } finally {
//         await rl.close();
//     }
//     const readStream = fs.createReadStream('4FMpI6Hr_uI.jpg');
//     const writeStream = fs.createWriteStream('123.jpg');
//     readStream.on('data', (chunk) => {
//         writeStream.write(chunk);
//     });
//     readStream.pipe(writeStream); // another way to copy picture file
// }
// start();

//os
//-----------------------
// const os = require("os");
//
// console.log(os.arch()); //give you your processor's architecture
// console.log(os.cpus()); //show count of cors(ядро) of your processor
// console.log(os.totalmem()/1024/1024/1024); //show all your memory
// console.log(os.freemem()/1024/1024/1024); //show  your free memory
// console.log(os.homedir()); //show  your work directory
// console.log(os.hostname()); //show  your host name
// console.log(os.release());
// console.log(os.tmpdir()); // temporary directory
// console.log(os.type()); // show type of OS
// console.log(os.uptime()); // show work time of OS in sec
// console.log(os.userInfo());
// console.log(os.version()); // your OS version
// console.log(os.networkInterfaces()); // info about your internet connection(devices)
// console.log(os.platform()); // win32

//events
//-----------------------
const emitter = require('events');

const em = new emitter.EventEmitter();
em.on('fCall', () => {
    console.log('fCall');
})

// em.on('sCall', (name, age) => {
//     console.log('sCall', name, age);
// })

em.once('sCall', (name, age) => {
    console.log('sCall', name, age);
})

// em.emit('sCall');
// em.emit('sCall');
// em.emit('sCall');
// em.emit('sCall');
// em.emit('sCall');
em.emit('sCall', 'Max', 18);
em.emit('sCall', 'Max', 18);
em.emit('sCall', 'Max', 18);
em.emit('sCall', 'Max', 18);
