<template>
  <view class="page">
    <view class="header">
      <view class="wrapper">
        <u-button type="primary" text="预览 PDF" @click="handlePreview"></u-button>
        <view style="height: 26px"></view>
        <u-search
          v-model="keyword"
          :show-action="false"
          placeholder="请输入关键字搜索"
          @search="handleSearch"
        ></u-search>
      </view>
    </view>

    <view class="container">
      <u-tabs
        :list="tabs"
        :activeStyle="{
          color: '#fff',
          backgroundColor: '#2aaae8',
        }"
        @click="handleClick"
      ></u-tabs>

      <view class="list">
        <view v-if="state.status === 'nomore' && list.length === 0" class="empty">
          <u-empty mode="list"></u-empty>
        </view>

        <view v-for="(item, index) in list" :key="index" class="item">
          <view class="box">
            <image class="img" :src="item.img" mode="aspectFill"></image>
          </view>
          <view class="text">
            <view class="name">
              <u--text
                style="color: inherit; font-size: inherit"
                :lines="1"
                :text="item.name"
              ></u--text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <LoadMore ref="loadMore" @change="handleChange" />

    <BottomNavigation active="用例" />
  </view>
</template>

<script>
import * as ExamplesAPI from '@/api/examples';
import { download, openDocument } from '@/utils';

import LoadMore from '@/components/LoadMore';
import BottomNavigation from '@/components/BottomNavigation';

export default {
  components: {
    LoadMore,
    BottomNavigation,
  },
  data() {
    return {
      keyword: undefined,
      typeId: undefined,
      tabs: [{ name: '全部' }],
      state: {},
      list: [],
    };
  },
  mounted() {
    this.fetchTabs();
    this.loadMore(true);
  },
  onReachBottom() {
    this.loadMore();
  },
  methods: {
    async handlePreview() {
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
    },
    handleSearch() {
      this.$nextTick(() => {
        this.loadMore(true);
      });
    },
    fetchTabs() {
      ExamplesAPI.fetchTabs()
        .then((res) => {
          if (!res.success) {
            throw { errMsg: res.message || '获取 tab 失败' };
          }
          this.tabs = [...this.tabs, ...res.data];
        })
        .catch((error) => {
          uni.showToast({
            icon: 'error',
            title: error.errMsg,
          });
        });
    },
    handleClick(item) {
      if (item.id === this.typeId) {
        return;
      }

      this.typeId = item.id;
      this.$nextTick(() => {
        this.loadMore(true);
      });
    },
    async fetchList(params) {
      const res = await ExamplesAPI.fetchList({
        ...params,
        keyword: this.keyword,
        typeId: this.typeId,
      });
      if (!res.success) {
        return Promise.reject({ errMsg: res.message || '获取 list 失败' });
      }
      this.list = params.pageNum > 1 ? [...this.list, ...res.data.list] : res.data.list;
      return Promise.resolve(res);
    },
    loadMore(reload = false) {
      this.$refs.loadMore.load(reload, this.fetchList);
    },
    handleChange(state) {
      this.state = state;
    },
  },
};
</script>

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
  }
}

.container {
  margin-top: -10px;
  padding: 18px 16px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  ::v-deep .u-tabs {
    margin-bottom: 10px;
    .u-tabs__wrapper__nav__item {
      padding-left: 6px;
      padding-right: 6px;
    }
    .u-tabs__wrapper__nav__item__text {
      padding: 6px 16px;
      color: #333;
      font-size: 16px;
      background-color: #f0eff3;
      border-radius: 20px;
    }
    .u-tabs__wrapper__nav__line {
      display: none;
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
