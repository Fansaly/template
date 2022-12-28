<template>
  <Card class="page-container page">
    <div class="text">
      color:
      <span :class="['color', { disabled: color === 'gray' }]">
        {{ color }}
      </span>
    </div>

    <div class="box">
      <span class="label">parent</span>
      <div class="count">
        count: {{ count }}
        <button class="btn" @click="handleReset">reset</button>
        <button class="btn" @click="handleChildDouble">ExecChildDouble</button>
      </div>

      <Child
        ref="childRef"
        :count="count"
        @increment="handleIncrement"
        @decrement="handleDecrement"
        @double="handleDouble"
      >
        <template #decrement>
          <button class="btn" @click="handleDecrement">decrement</button>
        </template>
      </Child>
    </div>
  </Card>
</template>

<script>
import { Card } from 'ant-design-vue';
import Child from './Child.vue';

export default {
  components: {
    Card,
    Child,
  },
  data() {
    return {
      color: 'gray',
      count: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.color = 'orange';
    }, 3e3);
  },
  methods: {
    handleIncrement() {
      this.count++;
    },
    handleDecrement() {
      this.count--;
    },
    handleDouble() {
      this.count *= 2;
    },
    handleReset() {
      this.count = 0;
    },
    handleChildDouble() {
      this.$refs.childRef.double();
    },
  },
};
</script>

<style lang="less" scoped src="./index.less"></style>
