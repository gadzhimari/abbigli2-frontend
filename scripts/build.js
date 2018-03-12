const createReactPackage = require('./createReactPackage');
const del = require('del');
const fs = require('fs-extra');
const path = require('path');
const svgOptimize = require('./svgOptimize');

const BUILD_PATH = path.join(__dirname, '..', 'app/icons');
console.log('path ', BUILD_PATH);

// Build the npm packages
const createPackages = (svgDataList) => {
  const packagers = [createReactPackage]; // list other packagers here
  const packages = packagers.map(packager => packager(svgDataList));
  del.sync(BUILD_PATH);
  packages.forEach((pack) => {
    console.log('Building package');
    pack.files.forEach((file) => {
      fs.outputFile(path.join(BUILD_PATH, file.filepath), file.source);
    });
  });
};

svgOptimize('public/images/icons/*.svg', createPackages);
