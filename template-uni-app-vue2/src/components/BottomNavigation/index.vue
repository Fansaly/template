<template>
  <u-tabbar
    :value="current"
    :fixed="true"
    :placeholder="true"
    :safeAreaInsetBottom="true"
    :inactiveColor="inactiveColor"
    :activeColor="activeColor"
  >
    <u-tabbar-item
      v-for="(item, index) in menus"
      :key="index"
      :name="item.text"
      :text="item.text"
      @click="handleClick($event, item)"
    >
      <template v-if="item.icon">
        <u-icon
          slot="inactive-icon"
          class="u-page__item__slot-icon"
          :name="item.icon"
          :size="item.size"
          :color="inactiveColor"
        ></u-icon>
        <u-icon
          slot="active-icon"
          class="u-page__item__slot-icon"
          :name="item.icon"
          :size="item.size"
          :color="activeColor"
        ></u-icon>
      </template>

      <template v-else>
        <image
          slot="inactive-icon"
          class="u-page__item__slot-icon"
          :style="item.style"
          :src="item.normal"
        ></image>
        <image
          slot="active-icon"
          class="u-page__item__slot-icon"
          :style="item.style"
          :src="item.active"
        ></image>
      </template>
    </u-tabbar-item>
  </u-tabbar>
</template>

<script>
export default {
  name: 'BottomNavigation',
  props: {
    active: {
      type: String,
      default: '首页',
    },
  },
  data() {
    return {
      current: '首页',
      inactiveColor: '#7a7e83',
      activeColor: '#0faeff',
      menus: [
        {
          text: '首页',
          path: '/pages/home/index',
          normal: '/static/img/home.png',
          active: '/static/img/homeHL.png',
          style: 'width: 28px;height: 28px;',
        },
        {
          text: '用例',
          path: '/pages/examples/index',
          icon: 'grid',
          size: 28,
        },
        {
          text: '我的',
          path: '/pages/profile/index',
          normal: '/static/img/user.png',
          active: '/static/img/userHL.png',
          style: 'width: 28px;height: 28px;',
        },
      ],
    };
  },
  watch: {
    active(value) {
      this.handleChange(value);
    },
  },
  created() {
    this.handleChange(this.active);
  },
  methods: {
    handleChange(value) {
      this.current = value;
    },
    handleClick(value, item) {
      if (value !== this.current) {
        uni.redirectTo({ url: item.path });
      } else {
        // refresh current page
      }
    },
  },
};
</script>
