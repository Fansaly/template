import { Card } from 'ant-design-vue';
import clsx from 'clsx';
import { defineComponent, ref, onMounted } from 'vue';
import styles from './index.module.less';

import Child from './Child';
import Item from './Item.vue';

export default defineComponent({
  setup() {
    const childRef = ref();
    const color = ref('gray');
    const count = ref(0);

    const handleIncrement = () => {
      count.value++;
    };
    const handleDecrement = () => {
      count.value--;
    };
    const handleDouble = () => {
      count.value *= 2;
    };
    const handleReset = () => {
      count.value = 0;
    };
    const handleChildDouble = () => {
      childRef.value.double();
    };

    onMounted(() => {
      setTimeout(() => {
        color.value = 'orange';
      }, 3e3);
    });

    return () => (
      <Card class={clsx('page-container', styles.page)}>
        <div class={styles.text}>
          color:
          <span class={clsx([styles.color, { disabled: color.value === 'gray' }])}>
            {color.value}
          </span>
        </div>

        <Item color={color.value} />

        <div class="box">
          <span class="label">parent</span>
          <div class="count">
            count: {count.value}
            <button class="btn" onClick={handleReset}>
              reset
            </button>
            <button class="btn" onClick={handleChildDouble}>
              ExecChildDouble
            </button>
          </div>

          <Child
            ref={childRef}
            count={count.value}
            v-slots={{
              decrement: () => (
                <button class="btn" onClick={handleDecrement}>
                  decrement
                </button>
              ),
            }}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onDouble={handleDouble}
          />
        </div>
      </Card>
    );
  },
});
