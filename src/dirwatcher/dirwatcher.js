import fs from 'fs';
import { EventEmitter } from 'events';

export class DirWatcher extends EventEmitter{
    constructor(){
        let files = [];
        let new_files = [];
        super();
    }
    watch(path, delay){
        
        setInterval(()=>{
            fs.readdir(path, (err, data) => {
                this.new_files = data;
            if(Array.isArray(this.files) && this.files.length){
                // For addition of files
                let changed_files = this.compare(this.files, this.new_files);
                if(changed_files) {
                    this.emit('changed', changed_files);
                }else{
                    //For changes in any files.
                    this.files.forEach((file, index) => {
                        if((Date.now() - fs.statSync(path+'/'+file).mtimeMs) < 1000){
                            this.emit('changed',this.new_files[index]);
                        }
                    });
                }
            }
            });
            fs.readdir(path, (err, data) => {
                this.files = data;
            });
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