const { readdirSync, lstatSync, rename, existsSync, mkdirSync } = require('fs');

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
      newLocArray = newLocation.split('.');
      const fileExt = newLocArray.pop();
      // handle filenames with multiple periods, such as file.test.js
      newLocation = newLocArray.join('.') + "-" + repeats + "." + fileExt;
    }
    if (repeats) {
      rename(targetDir, newLocation, () => {console.log(`(Duplicate name) Moving from "${targetDir}" to "${newLocation}"...`)});
    } else {
      rename(targetDir, newLocation, () => {console.log(`Moving from "${targetDir}" to "${newLocation}"...`)});
    }
    return;
  }

  // work on current target directory
  const subdirs = readdirSync(targetDir);
  if (subdirs.length === 0) {
    return {
      [currentDir]: []
    }
  }

  // work on subdirectories recursively
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