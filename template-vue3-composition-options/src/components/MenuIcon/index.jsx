import { defineComponent } from 'vue';

import icons from './icons';

const kebabToPascal = (str = '') => {
  return str.replace(/(^[a-z])|(?:-([a-z]))/g, (_, start, matched) => {
    return start ? start.toUpperCase() : matched ? matched.toUpperCase() : '';
  });
};
// eslint-disable-next-line no-unused-vars
const pascalToKebab = (str = '') => {
  return str.replace(/(^[A-Z])|([A-Z])/g, (_, start, matched) => {
    return start ? start.toLowerCase() : matched ? `-${matched.toLowerCase()}` : '';
  });
};

export default defineComponent({
  name: 'MenuIcon',
  props: {
    icon: {
      required: false,
      type: String,
    },
  },
  setup(props) {
    const key = kebabToPascal(props.icon);
    const Icon = icons[key] || icons.Default;

    return () => <Icon />;
  },
});
