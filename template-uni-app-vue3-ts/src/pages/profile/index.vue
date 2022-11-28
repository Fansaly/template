<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useAppStore, useUserStore } from '@/store';
import { compareVersion } from '@/utils';
import defaultAvatar from '@/static/img/avatar.png';

const appStore = useAppStore();
const userStore = useUserStore();

const { info: userInfo, signed } = storeToRefs(userStore);

const handleSignin = async () => {
  if (signed.value) {
    return;
  }

  // https://developers.weixin.qq.com/community/develop/doc/00022c683e8a80b29bed2142b56c01
  if (compareVersion.gte(appStore.hostSDKVersion, '2.27.1')) {
    uni.navigateTo({ url: '/pages/user/index' });
    return;
  }

  try {
    let res;
    res = await uni.login({ provider: 'weixin' });
    const code = (res as any).code;

    res = await uni.getUserProfile({
      desc: 'get user info',
      lang: 'zh_CN',
    });

    await userStore.signin({ ...(res as any).userInfo, code });

    uni.showToast({
      icon: 'success',
      title: '登录成功',
    });
  } catch (error: any) {
    uni.showToast({
      icon: 'none',
      title: error.errMsg,
    });
  }
};
const handleFakeSignin = async () => {
  try {
    await userStore.signin({
      code: 'code',
      nickName: 'nickName',
      avatarUrl: '/static/img/avatar.png',
    });

    uni.showToast({
      icon: 'success',
      title: '登录成功',
    });
  } catch (error: any) {
    uni.showToast({
      icon: 'none',
      title: error.errMsg,
    });
  }
};

const handleSignout = async () => {
  try {
    await userStore.signout();

    uni.showToast({
      icon: 'success',
      title: '登出成功',
    });
  } catch (error: any) {
    uni.showToast({
      icon: 'none',
      title: error.errMsg,
    });
  }
};
</script>

<template>
  <view class="center">
    <view class="user" :hover-class="!signed ? 'user-hover' : ''" @click="handleSignin">
      <image class="avatar" :src="signed ? userInfo.avatarUrl : defaultAvatar"></image>
      <view class="box">
        <text class="user-name">Hi，{{ signed ? userInfo.nickName : '您未登录' }}</text>
        <text v-if="!signed" class="arrow-right">&#xe65e;</text>
      </view>
    </view>
    <view class="center-list">
      <view class="center-list-item">
        <text class="list-icon">&#xe639;</text>
        <text class="list-text">新消息通知</text>
        <text class="arrow-right">&#xe65e;</text>
      </view>
    </view>
    <view class="center-list">
      <view class="center-list-item border-bottom">
        <text class="list-icon">&#xe60b;</text>
        <text class="list-text">帮助与反馈</text>
        <text class="arrow-right">&#xe65e;</text>
      </view>
      <view class="center-list-item">
        <text class="list-icon">&#xe65f;</text>
        <text class="list-text">服务条款及隐私</text>
        <text class="arrow-right">&#xe65e;</text>
      </view>
    </view>
    <view class="center-list">
      <view class="center-list-item">
        <text class="list-icon">&#xe614;</text>
        <text class="list-text">关于应用</text>
        <text class="arrow-right">&#xe65e;</text>
      </view>
    </view>

    <view class="button">
      <button v-if="!signed" class="primary" type="primary" @click="handleFakeSignin">
        登录（Fake）
      </button>
      <button v-if="signed" class="primary" type="warn" @click="handleSignout">
        登出
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: texticons;
  font-weight: normal;
  font-style: normal;
  src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
}

page,
view {
  display: flex;
}

page {
  background-color: #f8f8f8;
}

.button {
  margin: 32px;
  button {
    width: 100%;
  }
}

.center {
  flex-direction: column;
}

.user {
  flex-direction: row;
  align-items: center;
  padding: 10px;
  width: 376px;
  height: 120px;
  background-color: #0faeff;
}

.user-hover {
  opacity: 0.8;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.box {
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  height: 76px;
  .user-name {
    height: 30px;
    color: #ffffff;
    line-height: 30px;
  }

  .arrow-right {
    color: #ffffff;
  }
}

.arrow-right {
  width: 20px;
  height: 46px;
  color: #555;
  line-height: 46px;
  font-family: texticons;
  text-align: right;
}

.center-list {
  flex-direction: column;
  margin-top: 10px;
  width: 376px;
  background-color: #ffffff;
}

.center-list-item {
  flex-direction: row;
  padding: 0 10px;
  width: 376px;
  height: 46px;
}

.border-bottom {
  border-bottom: 1px solid #c8c7cc;
}

.list-icon {
  margin-right: 10px;
  width: 20px;
  height: 46px;
  color: #0faeff;
  line-height: 46px;
  font-family: texticons;
  text-align: center;
}

.list-text {
  flex: 1;
  height: 46px;
  color: #555;
  line-height: 46px;
  text-align: left;
}
</style>
