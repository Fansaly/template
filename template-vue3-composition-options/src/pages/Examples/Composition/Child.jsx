import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    count: {
      type: [String, Number],
      default: 0,
    },
  },
  emits: ['increment', 'decrement', 'double'],
  setup(props, { emit, slots, expose }) {
    const handleIncrement = () => {
      emit('increment');
    };
    const double = () => {
      emit('double');
    };

    expose({ double });

    return () => (
      <div class="box">
        <span class="label">child</span>
        <div class="count">
          count: {props.count}
          <button class="btn" onClick={handleIncrement}>
            increment
          </button>
          {slots.decrement && slots.decrement()}
        </div>
      </div>
    );
  },
});
