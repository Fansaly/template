<script setup>
import { onReachBottom } from '@dcloudio/uni-app';
import { reactive, ref, onMounted, nextTick } from 'vue';

import * as ExamplesAPI from '@/api/examples';
import { download, openDocument } from '@/utils';

import LoadMore from '@/components/LoadMore';

const keyword = ref(undefined);
const typeId = ref(undefined);
const tabs = ref([{ name: '全部' }]);
const state = reactive({});
const list = ref([]);
const loadMoreRef = ref();

const handlePreview = async () => {
  try {
    const fileUrl = 'https://example.com/file/named.pdf';

    const res = await download({
      url: fileUrl,
      onProgressUpdate: (data) => {
        // eslint-disable-next-line no-console
        console.log('downloading percentage:', data.progress);
      },
    });

    await openDocument({
      filePath: res.tempFilePath,
      fileName: 'pdf.pdf',
      fileType: 'pdf',
      showMenu: true,
    });
  } catch (error) {
    uni.showToast({
      icon: 'none',
      title: error.errMsg,
      duration: 2000,
    });
  }
};

const handleSearch = () => {
  nextTick(() => {
    loadMore(true);
  });
};

const fetchTabs = () => {
  ExamplesAPI.fetchTabs()
    .then((res) => {
      if (!res.success) {
        throw { errMsg: res.message || '获取 tab 失败' };
      }
      tabs.value = [...tabs.value, ...res.data];
    })
    .catch((error) => {
      uni.showToast({
        icon: 'error',
        title: error.errMsg,
      });
    });
};
const handleClick = (item) => {
  if (item.id === typeId.value) {
    return;
  }

  typeId.value = item.id;
  nextTick(() => {
    loadMore(true);
  });
};

const fetchList = async (params) => {
  const res = await ExamplesAPI.fetchList({
    ...params,
    keyword: keyword.value,
    typeId: typeId.value,
  });
  if (!res.success) {
    return Promise.reject({ errMsg: res.message || '获取 list 失败' });
  }
  list.value = params.pageNum > 1 ? [...list.value, ...res.data.list] : res.data.list;
  return Promise.resolve(res);
};
const loadMore = (reload = false) => {
  loadMoreRef.value.load(reload);
};
const handleChange = (data) => {
  Object.assign(state, data);
};

onMounted(() => {
  fetchTabs();
  loadMore(true);
});
onReachBottom(() => {
  loadMore();
});
</script>

<template>
  <view class="page">
    <view class="header">
      <view class="wrapper">
        <button type="default" @click="handlePreview">预览 PDF</button>
        <view style="height: 26px"></view>
        <uni-search-bar
          v-model="keyword"
          cancelButton="none"
          placeholder="请输入关键字搜索"
          @confirm="handleSearch"
        ></uni-search-bar>
      </view>
    </view>

    <view class="container">
      <view class="tabs">
        <scroll-view class="scroll-view" scroll-x>
          <view
            v-for="(item, index) in tabs"
            :key="index"
            :class="['tab', { active: item.id === typeId }]"
            @click="handleClick(item)"
          >
            {{ item.name }}
          </view>
        </scroll-view>
      </view>

      <view class="list">
        <view v-if="state.status === 'noMore' && list.length === 0" class="empty">
          empty list
        </view>

        <view v-for="(item, index) in list" :key="index" class="item">
          <view class="box">
            <image class="img" :src="item.img" mode="aspectFill"></image>
          </view>
          <view class="text">
            <view class="name">
              {{ item.name }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <LoadMore ref="loadMoreRef" :request="fetchList" @change="handleChange" />
  </view>
</template>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
}
.header {
  height: 176px;
  background-size: 100%;
  background-image: linear-gradient(180deg, #67b0e7, 38%, #cfade9);
  background-repeat: no-repeat;
  .wrapper {
    padding-top: 30px;
    margin-left: 16px;
    margin-right: 16px;
    ::v-deep .uni-searchbar {
      padding: 0;
    }
  }
}

.container {
  margin-top: -10px;
  padding: 18px 16px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  .tabs {
    margin-bottom: 16px;
    .scroll-view {
      width: 100%;
      white-space: nowrap;
    }
    .tab {
      display: inline-flex;
      margin-left: 6px;
      margin-right: 6px;
      padding: 6px 16px;
      color: #333;
      font-size: 16px;
      background-color: #f0eff3;
      border-radius: 20px;
      &.active {
        color: #fff;
        background-color: #2aaae8;
      }
    }
  }
  .list {
    display: flex;
    flex-wrap: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .empty {
      flex: 1;
      display: flex;
      justify-content: center;
      padding: 30px 0;
    }
    .item {
      margin-bottom: 12px;
      width: 48%;
      background: #fff;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.16);
      border-radius: 6px;
      overflow: hidden;
      .box {
        position: relative;
        padding-top: 68%;
        height: 0;
        .img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .text {
        padding: 10px;
      }
      .name {
        color: #333;
        font-size: 14px;
      }
    }
  }
}
</style>
