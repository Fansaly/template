import { Card } from 'ant-design-vue';
import { defineComponent } from 'vue';

import Development from '@/components/Development';

export default defineComponent({
  name: 'Home',
  setup() {
    return () => (
      <Card class="page-container">
        <Development />
      </Card>
    );
  },
});
