import { defineComponent } from 'vue';

import icons, { IconKey } from './icons';

const kebabToPascal = (str = '') => {
  return str.replace(/(^[a-z])|(?:-([a-z]))/g, (_, start, matched) => {
    return start ? start.toUpperCase() : matched ? matched.toUpperCase() : '';
  });
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pascalToKebab = (str = '') => {
  return str.replace(/(^[A-Z])|([A-Z])/g, (_, start, matched) => {
    return start ? start.toLowerCase() : matched ? `-${matched.toLowerCase()}` : '';
  });
};

interface Props {
  icon?: string;
}

export default defineComponent({
  name: 'MenuIcon',
  props: {
    icon: {
      required: false,
      type: String as PropType<Props['icon']>,
    },
  },
  setup(props) {
    const key = kebabToPascal(props.icon) as IconKey;
    const Icon = icons[key] || icons.Default;

    return () => <Icon />;
  },
});
