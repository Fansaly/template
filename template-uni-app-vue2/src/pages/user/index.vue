<template>
  <view class="page">
    <u--form
      ref="form"
      :model="data"
      :rules="rules"
      :labelPosition="'left'"
      :labelWidth="64"
      :labelAlign="'right'"
      :labelStyle="{ paddingLeft: '16px' }"
    >
      <u-form-item prop="avatarUrl" borderBottom>
        <button
          class="avatar-box"
          open-type="chooseAvatar"
          @chooseavatar="handleChooseAvatar"
        >
          <image class="avatar" :src="data.avatarUrl"></image>
        </button>
      </u-form-item>
      <u-form-item label="昵称" prop="nickName" borderBottom style="padding-left: 16px">
        <u--input
          v-model="data.nickName"
          border="none"
          placeholder="请输入 2~16 位昵称"
        ></u--input>
      </u-form-item>
    </u--form>

    <view class="btn">
      <u-button
        text="确认"
        type="primary"
        loadingText="登录中..."
        :loading="submitting"
        @click="handleSubmit"
      ></u-button>
    </view>
  </view>
</template>

<script>
import { mapActions } from 'vuex';
import defaultAvatar from '@/static/img/avatar.png';

export default {
  data() {
    return {
      submitting: false,
      data: {
        avatarUrl: defaultAvatar,
        nickName: '',
      },
      rules: {
        avatarUrl: {
          required: true,
          type: 'string',
          message: '请选择头像',
          trigger: ['blur', 'change'],
        },
        nickName: {
          required: true,
          type: 'string',
          min: 2,
          max: 16,
          message: '请填写 2~16 位昵称',
          trigger: ['blur', 'change'],
        },
      },
    };
  },
  methods: {
    ...mapActions(['signin']),
    handleChooseAvatar(e) {
      const { avatarUrl } = e.detail;
      this.data.avatarUrl = avatarUrl;
    },
    handleSubmit() {
      this.$refs.form.validate().then(() => {
        this.submit();
      });
    },
    async submit() {
      try {
        this.submitting = true;

        const [err, res] = await uni.login({ provider: 'weixin' });
        if (err) {
          throw err;
        }
        const code = res.code;

        await this.signin({ ...this.data, code });

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
        this.submitting = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
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
  margin: 32px 30px;
}
</style>
