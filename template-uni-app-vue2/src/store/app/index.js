import { pick } from '@/utils';

const initialState = {
  appId: null,
  location: {},
  confirmModalOpen: false,
};

export default {
  state: {
    ...initialState,
  },
  mutations: {
    setAppId: (state, payload) => {
      state.appId = payload;
    },
    setAppInfo: (state, payload) => {
      Object.assign(state, payload);
    },
    setLocation: (state, payload) => {
      state.location = payload;
    },
    clearLocation: (state) => {
      state.location = { ...initialState.location };
    },
    openConfirmModal: (state) => {
      state.confirmModalOpen = true;
    },
    closeConfirmModal: (state) => {
      state.confirmModalOpen = false;
    },
  },
  actions: {
    getAppInfo({ commit }) {
      return new Promise((resolve) => {
        const accountInfo = uni.getAccountInfoSync();
        const appId =
          (accountInfo && accountInfo.miniProgram && accountInfo.miniProgram.appId) ||
          initialState.appId;
        commit('setAppId', appId);

        let systemInfo = {};
        try {
          systemInfo = pick(uni.getSystemInfoSync(), [
            'appVersion',
            'hostVersion',
            'hostSDKVersion',
          ]);
          commit('setAppInfo', systemInfo);
        } catch (e) {
          // Swallow the exceptions.
        }

        return resolve({ ...systemInfo, appId });
      });
    },
  },
};
