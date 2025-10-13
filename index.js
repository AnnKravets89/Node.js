const fsPromises = require("node:fs/promises");
const path = require("node:path");

const makeDirectory = async () => {
    const mainFolder = path.join(__dirname, 'baseFolder');
    const subFolders = ['firstFolder', 'secondFolder', 'thirdFolder', 'fourthFolder', 'fifthFolder'];
    const files = ['firstFile.txt', 'secondFile.txt', 'thirdFile.txt', 'fourthFile.txt', 'fifthFile.txt'];

    await fsPromises.mkdir(mainFolder,{ recursive: true });
    for (const folder of subFolders) {
        const pathToFolder = path.join(mainFolder, folder);
        await fsPromises.mkdir(pathToFolder, { recursive: true });

        const folderPath = await fsPromises.realpath(pathToFolder);
        const statFolder = await fsPromises.stat(pathToFolder);
        if (statFolder.isDirectory()) {
            const trueFolder = `Folder: ${folderPath}`;
            console.log(trueFolder);
        }

            for (const file of files) {
                const pathToFiles = path.join(pathToFolder, file);
                await fsPromises.writeFile(pathToFiles, `Hello from ${folder}/${file}`);

                const filePath = await fsPromises.realpath(pathToFiles);
                const statFile = await fsPromises.stat(pathToFiles);
                    if (statFile.isFile()) {
                        const trueFile = `File: ${filePath}`;
                        console.log(trueFile);
                    }
            }

    }
}
void makeDirectory();
