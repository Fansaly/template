export const fs = uni.getFileSystemManager();

interface Options extends UniApp.OpenDocumentOptions {
  fileName?: string;
}

export const openDocument = (options: Options) => {
  return new Promise((resolve, reject) => {
    let filePath = options.filePath;

    if (options.fileName) {
      const fileName = options.fileName;
      delete options.fileName;

      try {
        filePath = `${wx.env.USER_DATA_PATH}/${fileName}`;
        fs.saveFileSync(options.filePath, filePath);
      } catch (e) {
        // Swallow the exceptions.
      }
    }

    uni.openDocument({
      // showMenu: true,
      ...options,
      filePath,
      success: (res) => {
        resolve(res);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};
