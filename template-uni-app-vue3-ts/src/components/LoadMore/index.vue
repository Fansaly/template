<script lang="ts" setup>
import { reactive, watchEffect, onMounted } from 'vue';

import { pick } from '@/utils';
import { LoadMoreText, LoadMoreState, LoadMoreRequest, LoadMore } from './types';

const defaultText: LoadMoreText = {
  loading: '加载中……',
  loadmore: '上拉加载更多',
  nomore: '已加载全部数据',
};
const defaultState: LoadMoreState = {
  status: 'loading',
  pageNum: 1,
  pageSize: 6,
  pages: -1,
  total: 0,
};

interface Props {
  renderElement?: boolean;
  text?: Partial<LoadMoreText>;
  state?: Partial<LoadMoreState>;
  request: LoadMoreRequest;
}

const props = withDefaults(defineProps<Props>(), {
  renderElement: true,
});
const emit = defineEmits(['change']);

const localText: LoadMoreText = reactive({ ...defaultText });
const localState: LoadMoreState = reactive({ ...defaultState });

watchEffect(() => {
  Object.assign(localText, props.text);
});
onMounted(() => {
  Object.assign(localState, props.state);
});

const update = (state?: LoadMoreState) => {
  emit('change', state || localState);
};
watchEffect(() => {
  update(localState);
});

const setState = (data: Record<string, any>) => {
  data = pick(data, Object.keys(localState));

  const localPages = localState.pages || 1;
  const pages = data.pages || Math.ceil(data.total / data.pageSize) || 0;
  const status = localPages >= pages ? 'noMore' : 'more';

  Object.assign(localState, { ...data, pages, status });
};
const load: LoadMore = async (reload = false) => {
  if (reload) {
    Object.assign(localState, defaultState);
  } else {
    if (localState.pageNum >= localState.pages) {
      return;
    }

    if (Number.isFinite(localState.pages)) {
      localState.pageNum++;
    }
  }

  try {
    localState.status = 'loading';
    const params = pick(localState, ['pageNum', 'pageSize']);
    const res = await props.request(params);
    setState(res.data);
    return Promise.resolve(res);
  } catch (error: any) {
    uni.showToast({
      icon: 'error',
      title: error.errMsg,
    });
    return Promise.reject(error);
  }
};
defineExpose({ load });
</script>

<template>
  <view
    v-if="props.renderElement && localState.pages >= localState.pageNum"
    style="padding-bottom: 20px"
  >
    <uni-load-more
      :status="localState.status"
      :contentText="{
        contentdown: localText.loadmore,
        contentrefresh: localText.loading,
        contentnomore: localText.nomore,
      }"
    ></uni-load-more>
  </view>
</template>
