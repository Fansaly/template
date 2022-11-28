<script>
import { mapActions } from 'vuex';
import { autoUpdater } from '@/utils';

export default {
  onShow() {
    this.getAppInfo();
    autoUpdater();
  },
  methods: {
    ...mapActions(['getAppInfo']),
  },
};
</script>

<style lang="scss">
/* uView 基础样式 */
@import 'uview-ui/index.scss';

@import '@/styles/index.scss';
</style>
