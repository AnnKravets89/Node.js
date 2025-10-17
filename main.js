const fs = require('node:fs');
const fsPromises = require('node:fs/promises');
const path = require('node:path');
const readline = require('node:readline/promises');

const sortEmails = async () => {
    const emailsFilePath = path.join(process.cwd(), 'emails.txt');
    const gmailFilePath = path.join(process.cwd(), 'gmails.txt');
    const readStream = fs.createReadStream(emailsFilePath, 'utf-8');
    const rlInterface = readline.createInterface({input: readStream});

    try {
        for await (const line of rlInterface) {
            const email = line.split('\t').splice(-1)[0];
            const splitEmail = email.split('@');

            if (splitEmail.length !== 2) {
                continue
            }

            const domainName = splitEmail.splice(-1)[0];
            if (domainName === 'gmail.com') {
                await fsPromises.appendFile(gmailFilePath, `${email}\n`);

            }
        }
    } finally {
        await rlInterface.close();
    }
};
sortEmails();

