const { readdirSync } = require('fs');

const BASE_DIR = './sampleDir';

const fileTypes = [
  'jpg',
];


const dirMap = {};

const extract = (targetDir) => {
  const breadCrumbs = targetDir.split('/');
  const currentDir = breadCrumbs[breadCrumbs.length - 1];
  console.log(`Currently analyzing: "${targetDir}"...`)
  const subdirs = readdirSync(targetDir);
  
  if (subdirs.length === 0) {
    console.log(`"${targetDir}" has no subdirectories`)
    return {
      [currentDir]: []
    }
  }

  console.log(`Subdirectories for "${targetDir}":`)
  for (const dir of subdirs) {
    console.log('-----' + dir)
    console.log('-----' + breadCrumbs)
    extract(targetDir + '/' + dir);
  }

  return {
    [currentDir]: subdirs
  }

};

extract(BASE_DIR)