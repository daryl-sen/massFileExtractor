const { readdirSync, lstatSync, renameSync, existsSync, mkdirSync } = require('fs');

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
  console.log(`${dashes}Currently analyzing: "${targetDir}"...`)

  if (!lstatSync(targetDir).isDirectory()) {
    console.log(dashes + 'Not a directory, moving file...');
    const newLocation = OUTPUT_DIR + '/' + currentDir
    renameSync(targetDir, newLocation, () => {console.log('File moved.')});
    return;
  }
  const subdirs = readdirSync(targetDir);
  
  if (subdirs.length === 0) {
    console.log(`${dashes}"${targetDir}" has no subdirectories`)
    return {
      [currentDir]: []
    }
  }

  console.log(`${dashes}Contents for "${targetDir}":`)
  for (const dir of subdirs) {
    console.log(dashes + dir)
    extract(targetDir + '/' + dir);
  }

  return {
    [currentDir]: subdirs
  }

};

module.exports = {
  extract
};