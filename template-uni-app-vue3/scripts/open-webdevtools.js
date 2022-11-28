#!/usr/bin/env node

/* eslint-disable no-console */
const os = require('os');
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const isMacOS = os.platform() === 'darwin';
const isWindowsOS = os.platform() === 'win32';
const kernelRelease = os.release();
const isWSLOS = /Microsoft/i.test(kernelRelease);

if (!isMacOS && !isWindowsOS && !isWSLOS) {
  console.log('“微信 web 开发者工具”目前仅支持 macOS、Windows 系统');
  process.exit(0);
}

const fileExists = (file) => {
  if (!file) {
    return false;
  }

  try {
    const stats = fs.statSync(file);
    return stats.isFile();
  } catch (e) {
    // Swallow the exceptions.
  }
};

const spawnSync = (cmd, args = [], options = {}) => {
  let result, stdout;

  try {
    result = childProcess.spawnSync(cmd, args, options);
    stdout = result.stdout.toString('utf8').trim();
    stdout = stdout === 'null' ? null : stdout === 'undefined' ? undefined : stdout;
  } catch (e) {
    // Swallow the exceptions.
  }

  return stdout;
};

const mergePaths = (filePath) => {
  let macOS = ['/Applications/wechatwebdevtools.app/Contents/MacOS/cli'];
  let windows = ['C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat'];

  if (fileExists(filePath)) {
    const content = fs.readFileSync(filePath, { encoding: 'utf8' });

    let webdevtoolsWechatMacOS = content.match(/WEBDEVTOOLS_WECHAT_MACOS=(.*)/)[1];
    if (webdevtoolsWechatMacOS) {
      webdevtoolsWechatMacOS = webdevtoolsWechatMacOS.replace(/\\/g, '');
    }
    const webdevtoolsWechatWindows = content.match(/WEBDEVTOOLS_WECHAT_WINDOWS=(.*)/)[1];

    macOS = [...new Set([webdevtoolsWechatMacOS, ...macOS])];
    windows = [...new Set([webdevtoolsWechatWindows, ...windows])];
  }

  return { macOS, windows };
};

const confirmPath = (paths, appMpWeixin) => {
  paths = isMacOS ? paths.macOS : paths.windows;
  let wechatWebDevtools, wechatWebDevtoolsAlias;

  while (paths.length > 0) {
    const path = paths.shift();
    let aliasPath = path;

    if (isWSLOS) {
      aliasPath = spawnSync('wslpath', ['-u', path]);
    }

    if (fileExists(aliasPath)) {
      wechatWebDevtools = path;
      wechatWebDevtoolsAlias = aliasPath;

      if (isWSLOS) {
        appMpWeixin = spawnSync('wslpath', ['-w', appMpWeixin]);
      }

      break;
    }
  }

  return { appMpWeixin, wechatWebDevtoolsAlias, wechatWebDevtools };
};

const start = () => {
  const appPath = fs.realpathSync(process.cwd());
  const resolvePath = (p) => path.resolve(appPath, p);

  const paths = {
    appPath,
    appDist: resolvePath('dist'),
    appMpWeixin: resolvePath('dist/dev/mp-weixin'),
    WEBDEVTOOLS_ENV: resolvePath('.webdevtools.local'),
    wechatWebDevtools: null,
    wechatWebDevtoolsAlias: null,
  };

  Object.assign(paths, confirmPath(mergePaths(paths.WEBDEVTOOLS_ENV), paths.appMpWeixin));

  if (!fileExists(paths.wechatWebDevtoolsAlias)) {
    console.log('未找到“微信 web 开发者工具”');
    process.exit(1);
  }

  let cmd, args;
  if (isMacOS) {
    cmd = paths.wechatWebDevtools;
    args = ['open', '--project', paths.appMpWeixin];
  } else {
    cmd = 'cmd.exe';
    args = ['/c', paths.wechatWebDevtools, 'open', '--project', paths.appMpWeixin];
  }

  childProcess.spawn(cmd, args, { stdio: 'inherit' });
};

start();
