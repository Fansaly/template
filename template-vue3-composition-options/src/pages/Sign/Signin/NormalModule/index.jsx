import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
import {
  Button,
  Divider,
  Form,
  Input,
  InputPassword,
  message as Message,
  Row,
} from 'ant-design-vue';
import clsx from 'clsx';
import { defineComponent, Fragment, reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

import { fetchSmsCode } from '@/api/common';
import { useSMS } from '@/hooks';
import { useUserStore } from '@/store';
import { pick, validateMobile, validatePassword, validateSmsCode } from '@/utils';
import LogoSvg from '@/assets/logo.svg';

import usePayload from '../../usePayload';
import styles from './index.module.less';

export default defineComponent({
  props: {
    onSignup: {
      required: true,
      type: Function,
    },
    onGotoWhere: {
      required: true,
      type: Function,
    },
  },
  emits: ['signup', 'gotoWhere'],
  setup(props, { emit }) {
    const router = useRouter();
    const userStore = useUserStore();
    const payload = usePayload();

    const tabs = ref([
      { value: 'account', label: '账号密码登录' },
      { value: 'mobile', label: '手机验证码登录' },
    ]);
    const tab = ref('account');
    const fields = ref([]);

    const submitting = ref(false);
    const form = ref(null);
    const data = reactive({
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
          const params = { biz: 'MEMBER_SIGNIN', mobile: data.mobile };
          const res = await fetchSmsCode(params);
          if (res.code !== 0) {
            const message = res.message || '请检查手机号是否可用';
            throw new Error(message);
          }
          Message.success('验证码发送成功');
          return Promise.resolve();
        } catch (err) {
          Message.error(err.message);
          return Promise.reject(err);
        }
      },
    });

    watchEffect(() => {
      if (tab.value === 'account') {
        fields.value = ['mobile', 'password'];
      } else {
        fields.value = ['mobile', 'captcha'];
      }
    });

    const handleChangeTab = (value) => {
      if (tab.value !== value) {
        tab.value = value;
        form.value?.resetFields();
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      form.value?.validateFields(fields.value).then(() => {
        submit();
      });
    };
    const submit = async () => {
      try {
        submitting.value = true;
        const res = await userStore.signin(pick(data, fields.value));

        if (res.code !== 0) {
          throw new Error(res.message || '登录失败');
        }

        if (!payload.value.code) {
          emit('gotoWhere');
          return;
        }

        router.push('/');
      } catch (err) {
        Message.error(err.message);
      } finally {
        submitting.value = false;
      }
    };

    const handleForgot = () => {
      // eslint-disable-next-line no-console
      console.log('handleForgot');
    };
    const handleSignup = () => {
      emit('signup');
    };

    return () => (
      <Form
        ref={form}
        class={styles.wrapper}
        v-model:model={data}
        onSubmit={handleSubmit}
      >
        <div class={styles.header}>
          <LogoSvg class={styles.logo} />
          <div class={styles.title}>欢迎登录</div>
        </div>

        <Row class={styles.tabs}>
          {tabs.value.map((item, index) => (
            <Fragment key={item.value}>
              {index > 0 && <Divider type="vertical" />}
              <Button
                class={clsx(styles.item, {
                  [styles.current]: item.value === tab.value,
                })}
                type="link"
                onClick={() => handleChangeTab(item.value)}
              >
                {item.label}
              </Button>
            </Fragment>
          ))}
        </Row>

        {tab.value === 'account' && (
          <Fragment>
            <Form.Item
              key="account-user"
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
                placeholder="用户名"
                v-slots={{
                  prefix: () => <UserOutlined />,
                }}
              />
            </Form.Item>
            <Form.Item
              key="account-pwd"
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
          </Fragment>
        )}

        {tab.value === 'mobile' && (
          <Fragment>
            <Form.Item
              key="account-phone"
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
                  prefix: () => '+86',
                }}
              />
            </Form.Item>
            <Form.Item
              key="account-code"
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
                size="large"
                autocomplete="off"
                class={styles['code-input']}
                placeholder="验证码"
                v-slots={{
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
          </Fragment>
        )}

        <Button
          class={styles.submit}
          block
          size="large"
          type="primary"
          htmlType="submit"
          loading={submitting.value}
          onClick={handleSubmit}
        >
          登录
        </Button>

        <Row class={styles.extra}>
          <a class={clsx(styles['type-link'], styles.forgot)} onClick={handleForgot}>
            忘记密码？
          </a>
          <span>
            <span class={styles.account}>还没有账号？</span>
            <a class={styles['type-link']} onClick={handleSignup}>
              免费注册
            </a>
          </span>
        </Row>
      </Form>
    );
  },
});
