<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['click']);

const item = ref('_');

const exec = () => {};

onMounted(() => {
  setTimeout(() => {
    item.value = 'item';
    emit('click');
  }, 1.8e3);
});

defineExpose({ exec });
</script>

<template>
  <div class="item">{{ item }}&nbsp;&nbsp;{{ props.color }}</div>
</template>

<style lang="less" scoped>
.item {
  margin-bottom: 32px;
}
</style>
