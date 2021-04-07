const { readdirSync, lstatSync, renameSync, existsSync, mkdirSync } = require('fs');

const SOURCE_DIR = 'target';
const OUTPUT_DIR = 'collated';

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR);
}

const fileTypes = [
  'jpg',
];


const dirMap = {};

const extract = (targetDir) => {
  const breadCrumbs = targetDir.split('/');
  const currentDir = breadCrumbs[breadCrumbs.length - 1];

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

extract(SOURCE_DIR)