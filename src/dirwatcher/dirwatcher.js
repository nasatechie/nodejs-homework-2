import fs from 'fs';
import { EventEmitter } from 'events';

export class DirWatcher extends EventEmitter{
    watch(path, delay){
        let files = [];
        let latestFiles = [];
        setInterval(() => {
            latestFiles = fs.readdirSync(path);
            if (Array.isArray(files) && files.length) {
                // For addition of files
                let change = this.compare(files, latestFiles);
                if (change) {
                    this.emit('changed', change);
                } else {
                    //For changes in any files.
                    files.forEach((file, index) => {
                        if ((Date.now() - fs.statSync(path + '/' + file).mtimeMs) < 1000) {
                            this.emit('changed', latestFiles[index]);
                        }
                    });
                }
            }
            files = fs.readdirSync(path);
        }, delay);
    }

    compare(filesArray, new_filesArray){
        let element = '';
        if(filesArray.length === new_filesArray.length){
            for(let i=0; i<filesArray.length; i++) {
                if(new_filesArray[i] !== filesArray[i]){
                    element = new_filesArray[i];
                }
            };
        }
        else{
            for(let i=0; i<Math.max(filesArray.length, new_filesArray.length); i++) {
                if(new_filesArray[i] !== filesArray[i]){
                    element = filesArray[i] 
                    ? filesArray[i]
                    : new_filesArray[i];
                }
            };
        }
        return element;
    }
}