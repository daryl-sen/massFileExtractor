const { readdirSync, lstatSync } = require('fs');

const BASE_DIR = 'target';

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
    console.log(dashes + 'Not a directory');
    return;
  }
  const subdirs = readdirSync(targetDir);
  
  if (subdirs.length === 0) {
    console.log(`${dashes}"${targetDir}" has no subdirectories`)
    // for (const level of breadCrumbs.splice(1)) {
    // }
    return {
      [currentDir]: []
    }
  }

  console.log(`${dashes}Contents for "${targetDir}":`)
  for (const dir of subdirs) {
    console.log(dashes + dir)
    // console.log('-----' + breadCrumbs)
    extract(targetDir + '/' + dir);
  }

  return {
    [currentDir]: subdirs
  }

};

extract(BASE_DIR)