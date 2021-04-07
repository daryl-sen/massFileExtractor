const { readdirSync } = require('fs');

const BASE_DIR = './target';

const fileTypes = [
  'jpg',
];


const readFolders = (targetFolder) => {
  folderList = [];
  for (const folderName of readdirSync(targetFolder)) {
    folderList.push(folderName);
  }
  return folderList;
};


const collateFolders = () => {
  const folderList = {};
  let folderLevel = 1;

  for (const folderName of readdirSync(BASE_DIR)) {
    const levelKey = `level-${folderLevel}`;
    if (folderList[levelKey]) {
      folderList[levelKey].push(folderName)
    } else {
      folderList[levelKey] = [];
      folderList[levelKey].push(folderName)
    }
  }
  folderLevel ++;
  return folderList;
}

console.log(readFolders());