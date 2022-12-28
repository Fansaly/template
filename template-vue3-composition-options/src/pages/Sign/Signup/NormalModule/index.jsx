import {
  LockOutlined,
  MailOutlined,
  TabletOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputPassword,
  message as Message,
  Row,
} from 'ant-design-vue';
import clsx from 'clsx';
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { fetchSmsCode } from '@/api/common';
import { signup } from '@/api/user';
import { useSMS } from '@/hooks';
import { useUserStore } from '@/store';
import { omit, pick, validateMobile, validatePassword, validateSmsCode } from '@/utils';
import LogoSvg from '@/assets/logo.svg';

import styles from '@/pages/Sign/Signin/NormalModule/index.module.less';

import usePayload from '../../usePayload';

export default defineComponent({
  props: {
    onSignin: {
      required: true,
      type: Function,
    },
  },
  emits: ['signin'],
  setup(props, { emit }) {
    const router = useRouter();
    const userStore = useUserStore();
    const payload = usePayload();

    const agreed = ref(false);
    const submitting = ref(false);
    const form = ref(null);
    const data = reactive({
      name: 'name',
      mobile: '19899999999',
      password: 'W-.i_7',
      captcha: '120952',
    });

    const sms = useSMS({
      validate: async () => {
        try {
          await form.value?.validateFields('mobile');
          return Promise.resolve();
        } catch (err) {
          return Promise.reject(err);
        }
      },
      fetch: async () => {
        try {
          const params = { biz: 'MEMBER_SIGNUP', mobile: data.mobile };
          const res = await fetchSmsCode(params);
          if (res.code !== 0) {
            const message = res.message || '请检查手机号是否可用';
            throw new Error(message);
          }
          Message.success('验证码发送成功，请注意查收');
          return Promise.resolve();
        } catch (err) {
          Message.error(err.message);
          return Promise.reject(err);
        }
      },
    });

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!agreed.value) {
        Message.error('请先阅读并同意服务协议和隐私政策。');
        return;
      }
      form.value?.validateFields().then(() => {
        submit();
      });
    };
    const submit = async () => {
      try {
        submitting.value = true;

        const res = await signup({ ...omit(payload.value, 'token'), ...data });
        if (res.code !== 0) {
          throw new Error(res.message || '注册失败');
        }

        Message.success('注册成功');
        userStore.cleanup();
        router.push({
          name: 'Signin',
          query: pick(payload.value, 'code'),
        });
      } catch (err) {
        Message.error(err.message);
      } finally {
        submitting.value = false;
      }
    };

    const handleView = (type) => (event) => {
      event.preventDefault();
      // eslint-disable-next-line no-console
      console.log(type);
    };
    const handleForgot = () => {
      // eslint-disable-next-line no-console
      console.log('handleForgot');
    };
    const handleSignin = () => {
      emit('signin');
    };

    return () => (
      <Form
        ref={form}
        class={clsx(styles.wrapper, styles.signup)}
        v-model:model={data}
        onSubmit={handleSubmit}
      >
        <div class={styles.header}>
          <LogoSvg class={styles.logo} />
          <div class={styles.title}>欢迎使用</div>
        </div>

        <Form.Item
          name="mobile"
          rules={[
            {
              required: true,
              type: 'string',
              validator: validateMobile,
              trigger: ['change', 'blur'],
            },
          ]}
        >
          <Input
            v-model:value={data.mobile}
            size="large"
            autocomplete="off"
            placeholder="手机号"
            v-slots={{
              prefix: () => <TabletOutlined />,
            }}
          />
        </Form.Item>
        <Form.Item
          name="captcha"
          rules={[
            {
              required: true,
              type: 'string',
              validator: validateSmsCode,
              trigger: ['change', 'blur'],
            },
          ]}
        >
          <Input
            v-model:value={data.captcha}
            class={styles['code-input']}
            size="large"
            autocomplete="off"
            placeholder="验证码"
            v-slots={{
              prefix: () => <MailOutlined />,
              addonAfter: () => (
                <Button
                  size="large"
                  type="link"
                  disabled={sms.state.timing}
                  onClick={() => sms.fetchSMS()}
                >
                  {sms.state.text}
                </Button>
              ),
            }}
          />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              type: 'string',
              min: 2,
              max: 16,
              message: '请输入 2-16 个字符用户名',
              trigger: ['change', 'blur'],
            },
          ]}
        >
          <Input
            v-model:value={data.name}
            size="large"
            autocomplete="off"
            placeholder="用户名"
            v-slots={{
              prefix: () => <UserOutlined />,
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              type: 'string',
              validator: validatePassword,
              trigger: ['change', 'blur'],
            },
          ]}
        >
          <InputPassword
            v-model:value={data.password}
            size="large"
            autocomplete="off"
            placeholder="密码"
            v-slots={{
              prefix: () => <LockOutlined />,
            }}
          />
        </Form.Item>

        <Button
          class={styles.submit}
          block
          size="large"
          type="primary"
          htmlType="submit"
          loading={submitting.value}
          onClick={handleSubmit}
        >
          注册
        </Button>

        <Row class={styles.extra}>
          <Checkbox v-model:checked={agreed.value} class={styles.rules}>
            我已阅读并同意
            <a onClick={handleView('agreement')}>服务协议</a>和
            <a onClick={handleView('privacy')}>隐私条款</a>
          </Checkbox>
          <a class={clsx(styles['type-link'], styles.forgot)} onClick={handleForgot}>
            忘记密码？
          </a>
          <a class={styles['type-link']} onClick={handleSignin}>
            前往登录
          </a>
        </Row>
      </Form>
    );
  },
});
