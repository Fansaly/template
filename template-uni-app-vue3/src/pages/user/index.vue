<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store';
import defaultAvatar from '@/static/img/avatar.png';

const userStore = useUserStore();

const submitting = ref(false);
const formRef = ref();
const data = reactive({
  avatarUrl: defaultAvatar,
  nickName: '',
});
const rules = ref({
  avatarUrl: {
    rules: [
      {
        required: true,
        format: 'string',
        errorMessage: '请选择头像',
      },
    ],
  },
  nickName: {
    rules: [
      {
        required: true,
        format: 'string',
        minLength: 2,
        maxLength: 16,
        errorMessage: '请填写 2~16 位昵称',
      },
    ],
  },
});

const handleChooseAvatar = (e) => {
  const { avatarUrl } = e.detail;
  data.avatarUrl = avatarUrl;
};

const handleSubmit = () => {
  formRef.value.validate().then(() => {
    submit();
  });
};
const submit = async () => {
  try {
    submitting.value = true;

    const res = await uni.login({ provider: 'weixin' });
    const code = res.code;

    await userStore.signin({ ...data, code });

    uni.navigateBack({
      delta: 1,
      success: () => {
        setTimeout(() => {
          uni.showToast({
            icon: 'success',
            title: '登录成功',
          });
        }, 300);
      },
    });
  } catch (error) {
    uni.showToast({
      icon: 'error',
      title: error.errMsg,
    });
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <view class="page">
    <uni-forms ref="formRef" :modelValue="data" :rules="rules">
      <uni-forms-item name="avatarUrl">
        <button
          class="avatar-box"
          open-type="chooseAvatar"
          @chooseavatar="handleChooseAvatar"
        >
          <image class="avatar" :src="data.avatarUrl"></image>
        </button>
      </uni-forms-item>
      <uni-forms-item label="昵称" :labelWidth="42" name="nickName">
        <uni-easyinput
          v-model="data.nickName"
          type="text"
          placeholder="请输入 2~16 位昵称"
        ></uni-easyinput>
      </uni-forms-item>
    </uni-forms>

    <view class="btn">
      <button :loading="submitting" @click="handleSubmit">确认</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  padding: 30px;
}
.avatar-box {
  margin: 40px auto;
  padding: 0;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  .avatar {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.btn {
  margin: 32px 0;
}
</style>
