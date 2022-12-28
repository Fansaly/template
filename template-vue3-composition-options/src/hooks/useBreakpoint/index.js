import { onBeforeMount, onBeforeUnmount, ref } from 'vue';

/*
 * https://www.antdv.com/components/grid-cn#Col
 * --------------------------------------------
 * xs   <576px
 * sm   ≥576px
 * md   ≥768px
 * lg   ≥992px
 * xl   ≥1200px
 * xxl  ≥1600px
 * xxxl ≥2000px
 * --------------------------------------------
 * https://github.com/vueComponent/ant-design-vue/blob/main/components/layout/Sider.tsx#L14-L22
 */
const dimensionMaxMap = {
  xs: '479.98px',
  sm: '575.98px',
  md: '767.98px',
  lg: '991.98px',
  xl: '1199.98px',
  xxl: '1599.98px',
  xxxl: '1999.98px',
};

export const useBreakpoint = () => {
  const breakpoint = ref();

  const setBreakpoint = () => {
    const matchMedia = window.matchMedia;
    if (!matchMedia) {
      return;
    }

    const breakpoints = [];

    Object.entries(dimensionMaxMap).forEach(([key, value]) => {
      const { matches } = matchMedia(`(min-width: ${value})`);
      if (matches) {
        breakpoints.push(key);
      }
    });

    breakpoint.value = breakpoints.pop();
  };

  onBeforeMount(() => {
    setBreakpoint();
    window.addEventListener('resize', setBreakpoint);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', setBreakpoint);
  });

  return breakpoint;
};
