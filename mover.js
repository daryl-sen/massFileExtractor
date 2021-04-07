const { readdirSync } = require('fs');

const BASE_DIR = './sampleDir';

const fileTypes = [
  'jpg',
];


const dirMap = {};

const extract = (targetDir) => {
  const breadCrumbs = targetDir.split('/');
  const currentDir = breadCrumbs[breadCrumbs.length - 1];
  console.log(breadCrumbs, currentDir);
  const subdirs = readdirSync(targetDir);
  
  if (subdirs.length === 0) {
    return {
      [currentDir]: []
    }
  }

  for (const dir of subdirs) {
    console.log(breadCrumbs)
    extract(targetDir + '/' + dir);
  }

};

extract(BASE_DIR)