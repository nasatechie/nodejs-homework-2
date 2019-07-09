import fs from 'fs';
import { CsvToJson } from '../utils';

export class Importer{
    constructor(dirwatcher){
        this.dirwatcher = dirwatcher;
        this.path = 'src/data';

        this.dirwatcher.watch(this.path, 1000);
        this.dirwatcher.on('changed', (filename) => {
            // Asynchronous
            this.import(this.path+'/'+filename).then(csvData =>{
                console.log(CsvToJson(csvData));
            });

            //Synchronous
            let csvData = this.importSync(this.path + '/' + filename);
            console.log(CsvToJson(csvData));
        });
    }

    import(path){
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf-8', (error, data) => {
                if(error) reject(error);
                
                resolve(data);
            });
        });
    }
    //Synchronous
    importSync(path) {
        let data = fs.readFileSync(path, { encoding: 'utf-8' });
        return data;
    }
}