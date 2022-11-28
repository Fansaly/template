<script setup>
import { onShow } from '@dcloudio/uni-app';
import { autoUpdater } from '@/utils';
import { useAppStore } from '@/store';

const appStore = useAppStore();

onShow(() => {
  autoUpdater();
  appStore.getAppInfo();
});
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>
