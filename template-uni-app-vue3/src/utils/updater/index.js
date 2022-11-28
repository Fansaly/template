let updateManager = null;

const updateSuccessHandler = () => {
  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否应用更新？',
      success: (res) => {
        if (res.confirm) {
          updateManager.applyUpdate();
        }
      },
    });
  });
};

const updateErrorHandler = () => {
  updateManager.onUpdateFailed(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本更新失败，您可以删除当前小程序，再次搜索使用，或者再次尝试更新',
      confirmText: '更新',
      success: (res) => {
        if (res.confirm) {
          checkUpdate();
        }
      },
    });
  });
};

const checkUpdate = () => {
  updateManager.onCheckForUpdate((res) => {
    if (!res.hasUpdate) {
      return;
    }

    updateSuccessHandler();
    updateErrorHandler();
  });
};

export const autoUpdater = () => {
  if (!uni.canIUse('getUpdateManager')) {
    uni.showModal({
      title: '温馨提示',
      content: '当前微信版本过低，可能无法使用该功能，请升级到最新版本后重试。',
    });

    return;
  }

  updateManager = uni.getUpdateManager();

  checkUpdate();
};
