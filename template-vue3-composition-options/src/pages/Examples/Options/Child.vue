<template>
  <div class="box">
    <span class="label">child</span>
    <div class="count">
      count: {{ count }}
      <button class="btn" @click="handleIncrement">increment</button>
      <slot name="decrement" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: [String, Number],
      default: 0,
    },
  },
  emits: ['increment', 'decrement', 'double'],
  methods: {
    handleIncrement() {
      this.$emit('increment');
    },
    double() {
      this.$emit('double');
    },
  },
};
</script>
