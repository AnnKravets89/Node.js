const fsPromises = require('node:fs/promises');
const fs = require('node:fs');
const EventEmitter = require('node:events');
const os = require('node:os');
const {exec} = require('child_process');

const {foo: helperFoo} = require('./lessons/lesson1/helpers/helper');
const path = require("node:path");


const foo = async () => {
   //FS
   //  const pathToFile= path.join(__dirname, 'test.txt');
   //  await fsPromises.writeFile(pathToFile, 'Hello World!\n');
   //  const data = await fsPromises.readFile(pathToFile, 'utf-8');
   //  console.log(data);
   //  await fsPromises.appendFile(pathToFile, 'Some new data');
   //  await fsPromises.mkdir(path.join(__dirname, 'new-folder'), { recursive: true });
    //await fsPromises.mkdir(path.join(__dirname, 'new-folder', 'another-folder', 'another-another-folder')); - will be error
    //await fsPromises.mkdir(path.join(__dirname, 'new-folder', 'another-folder', 'another-another-folder'), { recursive: true });
    //await fsPromises.rm(path.join(__dirname, 'new-folder'), { recursive: true });
    //await fsPromises.unlink(pathToFile); //delete file
     //await fsPromises.rename(pathToFile, path.join(__dirname, 'new-folder', 'new-file.txt'));
    // await fsPromises.copyFile(pathToFile, path.join(__dirname, 'new-folder', 'new-file.txt'));
    // const stat = await fsPromises.stat(pathToFile);
    // console.log(stat);
    // console.log(stat.isDirectory());
    // console.log(stat.isFile());

   //Streams
   //  const pathToFile = path.join(__dirname, 'science_and_art.pptx');
   //  const readStream = fs.createReadStream(pathToFile);
   //  const writeStream = fs.createWriteStream(path.join(__dirname, 'new-big-file.pptx'));
   //  readStream.on('data', (chunk) => {
   //      console.log('chunk', chunk.length);
   //      writeStream.write(chunk);
   //  });
   //
   //  another variant
   //  readStream.pipe(writeStream);

   //Events
   //  const emitter = new EventEmitter();
   //  emitter.once('event', (...args) => {
   //      console.log('__________________');
   //      console.log('Event 1 Happened');
   //      console.log(args);
   //      console.log('__________________');
   //  })
   //  emitter.on('event', (...args) => {
   //      console.log('Event 2 Happened');
   //      console.log(args);
   //  })
   //  emitter.emit('event', 'Hello)!', 345, 44);
   //  emitter.emit('event');
   //  emitter.emit('event', 555);

   //OS
    console.log(os.arch());
    console.log(os.cpus());
    console.log(os.totalmem() / 1024 / 1024 / 1024, 'gb');
    console.log(os.freemem() / 1024 / 1024 / 1024, 'gb');
    console.log(os.homedir());
    console.log(os.hostname());
    console.log(os.platform());
    console.log(os.userInfo());


}
void foo();
