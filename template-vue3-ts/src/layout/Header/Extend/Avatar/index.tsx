import { UserOutlined } from '@ant-design/icons-vue';
import { Avatar } from 'ant-design-vue';
import { defineComponent } from 'vue';

import { useUserStore } from '@/store';

export default defineComponent({
  setup() {
    const userStore = useUserStore();

    return () =>
      userStore.token ? (
        <Avatar src="https://source.boringavatars.com/beam" />
      ) : (
        <Avatar
          v-slots={{
            icon: () => <UserOutlined />,
          }}
        />
      );
  },
});
