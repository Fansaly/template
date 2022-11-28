// https://uniapp.dcloud.net.cn/collocation/pages.html#style
export interface Style {
  navigationBarBackgroundColor: string;
  navigationBarTextStyle: string;
  navigationBarTitleText: string;
  navigationBarShadow: Record<string, any>;
  navigationStyle: string;
  disableScroll: boolean;
  backgroundColor: string;
  backgroundTextStyle: string;
  enablePullDownRefresh: boolean;
  onReachBottomDistance: number;
  backgroundColorTop: string;
  backgroundColorBottom: string;
  disableSwipeBack: boolean;
  titleImage: string;
  transparentTitle: string;
  titlePenetrate: string;
  'app-plus': Record<string, any>;
  h5: Record<string, any>;
  'mp-alipay': Record<string, any>;
  'mp-weixin': Record<string, any>;
  'mp-baidu': Record<string, any>;
  'mp-toutiao': Record<string, any>;
  'mp-lark': Record<string, any>;
  'mp-qq': Record<string, any>;
  'mp-kuaishou': Record<string, any>;
  'mp-jd': Record<string, any>;
  usingComponents: Record<string, any>;
  leftWindow: boolean;
  topWindow: boolean;
  rightWindow: boolean;
  maxWidth: number;
}

// https://uniapp.dcloud.net.cn/collocation/pages.html#pages
export interface Page {
  path: string;
  style?: Partial<Style>;
  meta?: Record<string, any>;
}

export type Pages = Page[];

export type SubPackages = Array<{
  root: string;
  pages: Pages;
}>;

// https://uniapp.dcloud.net.cn/collocation/pages.html#tabbar
export type TabBar = Partial<{
  color: string;
  selectedColor: string;
  backgroundColor: string;
  borderStyle: string;
  blurEffect: string;
  list: Array<{
    pagePath: string;
    text: string;
    iconPath: string;
    selectedIconPath: string;
    visible: boolean;
    iconfont: Record<string, any>;
  }>;
  position: string;
  fontSize: string;
  iconWidth: string;
  spacing: string;
  height: string;
  midButton: Record<string, any>;
  iconfontSrc: string;
}>;

export interface PagesJSON {
  pages: Pages;
  subPackages?: SubPackages;
  tabBar?: TabBar;
  [key: string]: any;
}
