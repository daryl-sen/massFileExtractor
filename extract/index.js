const { extract } = require('./mover');

const SOURCE_DIR = 'target';
const OUTPUT_DIR = 'collated';
const PRINT      = true; // prints the file structure in the terminal
const FILE_MODE  = process.argv[2]; // `ONLY` mode to only move the selected file types; `EXCLUDE` mode to move everything except the selected file types
const FILE_TYPES = process.argv.slice(3); // list all file types separated by a single space, i.e. `.jpg .png .gif`

extract();