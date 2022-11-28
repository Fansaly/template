<template>
  <view
    v-if="renderElement && localState.pages >= localState.pageNum"
    style="padding-bottom: 20px"
  >
    <u-loadmore
      :status="localState.status"
      :loading-text="localText.loading"
      :loadmore-text="localText.loadmore"
      :nomore-text="localText.nomore"
    />
  </view>
</template>

<script>
import { pick } from '@/utils';

const defaultText = {
  loading: '加载中……',
  loadmore: '上拉加载更多',
  nomore: '已加载全部数据',
};
const defaultState = {
  status: 'loadmore',
  pageNum: 1,
  pageSize: 6,
  pages: -1,
  total: 0,
};

export default {
  name: 'LoadMore',
  props: {
    renderElement: {
      required: false,
      type: Boolean,
      default: true,
    },
    text: {
      required: false,
      type: Object,
      default: () => ({}),
    },
    state: {
      required: false,
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['change'],
  data() {
    return {
      localText: {
        ...defaultText,
      },
      localState: {
        ...defaultState,
      },
    };
  },
  watch: {
    text(text) {
      Object.assign(this.localText, text);
    },
    localState(state) {
      this.update(state);
    },
  },
  created() {
    Object.assign(this.localText, this.text);
    Object.assign(this.localState, this.state);
    this.$nextTick(() => {
      this.update();
    });
  },
  methods: {
    async load(reload, request) {
      if (reload) {
        this.localState = { ...defaultState };
      } else {
        if (this.localState.pageNum >= this.localState.pages) {
          return;
        }

        if (Number.isFinite(this.localState.pages)) {
          this.localState.pageNum++;
        }
      }

      try {
        this.localState.status = 'loading';
        const params = pick(this.localState, ['pageNum', 'pageSize']);
        const res = await request(params);
        this.setState(res.data);
        return Promise.resolve(res);
      } catch (error) {
        uni.showToast({
          icon: 'error',
          title: error.errMsg,
        });
        return Promise.reject(error);
      }
    },
    setState(data) {
      const { localState } = this;
      data = pick(data, Object.keys(localState));

      const localPages = localState.pages || 1;
      const pages = data.pages || Math.ceil(data.total / data.pageSize) || 0;
      const status = localPages >= pages ? 'nomore' : 'loadmore';

      this.localState = { ...localState, ...data, pages, status };
    },
    update(state) {
      this.$emit('change', state || this.localState);
    },
  },
};
</script>
