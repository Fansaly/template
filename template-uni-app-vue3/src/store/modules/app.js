import { acceptHMRUpdate, defineStore } from 'pinia';
import { pick } from '@/utils';

const initialState = {
  appId: null,
  location: {},
  confirmModalOpen: false,
};

const store = defineStore({
  id: 'app',
  state: () => ({
    ...initialState,
  }),
  actions: {
    setAppId(payload) {
      this.appId = payload;
    },
    setAppInfo(payload) {
      Object.assign(this, payload);
    },
    setLocation(payload) {
      this.location = payload;
    },
    clearLocation() {
      this.location = { ...initialState.location };
    },
    openConfirmModal() {
      this.confirmModalOpen = true;
    },
    closeConfirmModal() {
      this.confirmModalOpen = false;
    },
    getAppInfo() {
      return new Promise((resolve) => {
        const accountInfo = uni.getAccountInfoSync();
        const appId =
          (accountInfo && accountInfo.miniProgram && accountInfo.miniProgram.appId) ||
          initialState.appId;
        this.setAppId(appId);

        let systemInfo = {};
        try {
          systemInfo = pick(uni.getSystemInfoSync(), [
            'appVersion',
            'hostVersion',
            'hostSDKVersion',
          ]);
          this.setAppInfo(systemInfo);
        } catch (e) {
          // Swallow the exceptions.
        }

        return resolve({ ...systemInfo, appId });
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot));
}

export default store;
