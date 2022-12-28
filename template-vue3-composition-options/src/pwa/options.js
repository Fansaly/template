const pwaOptions = {
  includeAssets: ['favicon.svg'],
  manifest: {
    lang: 'zh-CN',
    name: 'template-vue3-composition-options',
    short_name: 'template-vue3-composition-options',
    description: 'template-vue3-composition-options',
    start_url: './',
    theme_color: '#0088fe',
    background_color: '#f0f2f5',
    display: 'standalone',
    icons: [
      {
        src: 'icons/vite-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'icons/vite-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: 'icons/vite-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icons/vite-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'icons/vite-640x640.png',
        sizes: '640x640',
        type: 'image/png',
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
};

const replaceOptions = { __DATE__: new Date().toISOString() };
const claims = process.env.CLAIMS === 'true';
const reload = process.env.RELOAD_SW === 'true';
const selfDestroying = process.env.SW_DESTROY === 'true';

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src/pwa';
  pwaOptions.filename = claims ? 'claims-sw.js' : 'prompt-sw.js';
  pwaOptions.strategies = 'injectManifest';
}

if (claims) {
  pwaOptions.registerType = 'autoUpdate';
}

if (reload) {
  replaceOptions.__RELOAD_SW__ = 'true';
}

if (selfDestroying) {
  pwaOptions.selfDestroying = selfDestroying;
}

export { pwaOptions, replaceOptions };
