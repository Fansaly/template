#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const appPath = fs.realpathSync(process.cwd());
const resolveApp = (dir) => path.resolve(appPath, dir);
const paths = {
  appPath,
  appDist: resolveApp('dist'),
  appPackageJson: resolveApp('package.json'),
};

if (!fs.existsSync(paths.appDist)) {
  console.log('please build the project first.');
  process.exit(1);
}

const packageJson = (() => {
  try {
    const packageJsonPath = paths.appPackageJson;
    const packageJson = fs.readFileSync(packageJsonPath, { encoding: 'utf8', flag: 'r' });
    return JSON.parse(packageJson);
  } catch (error) {
    return {};
  }
})();

const filename = `${packageJson.name}_v${packageJson.version}.zip`;

// create a file to stream archive data to.
const output = fs.createWriteStream(paths.appPath + '/' + filename);
const archive = archiver('zip', {
  zlib: { level: 9 }, // Sets the compression level.
});

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function () {
  console.log(filename + ' file: ' + archive.pointer() + ' total bytes');
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function () {
  console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on('error', function (err) {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory(paths.appDist, false);

// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize();
