import {NIcon} from 'naive-ui';

const renderIcon = (icon: Component) => () =>
  h(NIcon, null, { default: () => h(icon) });

export {
  renderIcon,
};