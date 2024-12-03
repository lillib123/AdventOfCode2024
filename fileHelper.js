import * as fs from 'fs';

export class FileHelper {
    readFile(filePath) {
        try {
            const data = fs.readFileSync(filePath);
            return data.toString();
        } catch (error) {
            console.error(`Got an error trying to read the file: ${error.message}`);
        }
    }
}