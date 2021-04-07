const { readdirSync } = require('fs');

const BASE_DIR = './empty';

const fileTypes = [
  'jpg',
];


const extract = (targetDir) => {
  const subdirs = readdirSync(targetDir);
  for (const dir of subdirs) {
    extract(dir);
  }

  
};