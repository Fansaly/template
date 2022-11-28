import { acceptHMRUpdate, defineStore } from 'pinia';
import { pick } from '@/utils';

interface State {
  appId: null | string;
  location: Record<string, any>;
  confirmModalOpen: boolean;
  [key: string]: any;
}

const initialState: State = {
  appId: null,
  location: {},
  confirmModalOpen: false,
};

const store = defineStore({
  id: 'app',
  state: (): State => ({
    ...initialState,
  }),
  actions: {
    setAppId(payload: string) {
      this.appId = payload;
    },
    setAppInfo(payload: Record<string, any>) {
      Object.assign(this, payload);
    },
    setLocation(payload: Record<string, any>) {
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
        const appId = accountInfo?.miniProgram?.appId ?? initialState.appId;
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
