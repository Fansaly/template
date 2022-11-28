<script lang="ts" setup>
import { computed } from 'vue';
import { useUserStore } from '@/store';

const userStore = useUserStore();

const userInfo = computed(() => userStore.info);
const signed = computed(() => userStore.signed);

const handleClick = (url: string) => {
  uni.navigateTo({ url });
};
</script>

<template>
  <view class="page">
    <view class="hello">
      <view class="title">您好 {{ signed ? userInfo.nickName : '游客' }}。</view>
      <view class="ul">
        <view>这是 uni-app 带登录示例模板的首页。</view>
        <view v-if="signed">在“我的”页面中点击“登出”，注销当前账户。</view>
        <view v-if="!signed">在“我的”页面中点击“登录”，登录您的账户。</view>
      </view>
    </view>

    <view class="route">
      <button @click="handleClick('../examples/index')">
        <uni-icons type="locked-filled" size="20"></uni-icons>
        <span class="text">用例</span>
        <span class="path">/pages/examples/index</span>
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page {
  padding: 18px;
}

.title {
  margin-top: 24px;
  color: #8f8f94;
}

.ul {
  margin-top: 20px;
  color: #8f8f94;
  font-size: 16px;
  > view {
    line-height: 1.8;
  }
}

.route {
  margin-top: 90px;
  .text {
    margin-left: 10px;
    margin-right: 10px;
  }
  .path {
    opacity: 0.4;
  }
}
</style>
