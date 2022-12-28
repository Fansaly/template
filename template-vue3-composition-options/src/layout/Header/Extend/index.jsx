import { BellFilled } from '@ant-design/icons-vue';
import { Dropdown, Menu, message as Message } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/store';

import Avatar from './Avatar';
import styles from './index.module.less';

export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    const handleSignout = async () => {
      try {
        await userStore.signout();
        router.push('/signin');
      } catch (error) {
        Message.error(error.message);
      }
    };

    return () => (
      <div class={styles.extend}>
        <BellFilled class={styles.message} />
        <Dropdown
          placement="bottomRight"
          v-slots={{
            default: () => <Avatar />,
            overlay: () => (
              <Menu>
                <Menu.Item onClick={handleSignout}>登出</Menu.Item>
              </Menu>
            ),
          }}
        />
      </div>
    );
  },
});
