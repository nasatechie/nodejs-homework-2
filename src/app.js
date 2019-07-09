import { Importer } from './importer';
import { DirWatcher } from './dirwatcher';

let dirwatcher = new DirWatcher();
new Importer(dirwatcher);