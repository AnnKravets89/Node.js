console.log(__dirname); //path
console.log(__filename); //absolute path

console.log(process.cwd()); //show file you run

const a = 5;
const myFunc = () => {
    console.log('hello');
}
module.exports = {
    a,
    myFunc
}
