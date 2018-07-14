const del = require('del');
const fs = require('fs-extra');
const path = require('path');
const svgOptimize = require('./svgOptimize');

const createReactPackage = require('./createReactPackage');
const createIndexIconsFile = require('./createIndexIconsFile');

const BUILD_PATH = path.join(__dirname, '..', 'app/icons');

const writeFile = ({ filepath, source }) => {
  fs.outputFile(path.join(BUILD_PATH, filepath), source);
};

const createPackages = (svgDataList) => {
  const packagers = [createReactPackage, createIndexIconsFile];
  const packages = packagers.map(packager => packager(svgDataList));

  del.sync(BUILD_PATH);

  packages.forEach((pack) => {
    const array = Array.isArray(pack) ? pack : [pack];

    array.forEach(writeFile);
  });
};

svgOptimize('public/images/ic/*.svg', createPackages);
