const { readdirSync, lstatSync, rename, existsSync, mkdirSync } = require('fs');

const SOURCE_DIR = 'target';
const OUTPUT_DIR = 'collated';
const PRINT      = true; // prints the file structure in the terminal
const FILE_MODE  = process.argv[2]; // `ONLY` mode to only move the selected file types; `EXCLUDE` mode to move everything except the selected file types
const FILE_TYPES = process.argv.slice(3); // list all file types separated by a single space, i.e. `.jpg .png .gif`

const extract = (targetDir = SOURCE_DIR) => {
  // create the output directory
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR);
  }

  const breadCrumbs = targetDir.split('/');
  const currentDir = breadCrumbs[breadCrumbs.length - 1]; // last item in path
  let dashes = '-- '.repeat(breadCrumbs.length);

  // if current directory is not a directory, it is a file
  if (!lstatSync(targetDir).isDirectory()) {
    let newLocation = OUTPUT_DIR + '/' + currentDir;

    // if a file with the same name exists, rename to `filename-n`, where `n` is the number of repeats
    let repeats = 0;
    while (existsSync(newLocation)) {
      repeats++;
      newLocation += "-" + repeats;
    }
    rename(targetDir, newLocation, () => {console.log(`Moving "${currentDir}"...`)});
    return;
  }

  const subdirs = readdirSync(targetDir);
  
  if (subdirs.length === 0) {
    return {
      [currentDir]: []
    }
  }

  // PRINT && console.log(`${dashes}/${targetDir} (current dir)`)
  for (const dir of subdirs) {
    PRINT && console.log(dashes + dir);
    extract(targetDir + '/' + dir);
  }

  return {
    [currentDir]: subdirs
  }

};

module.exports = {
  extract
};