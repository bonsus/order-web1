// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  devServer: {
    port: 3100,
  },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'ordeo-dev-secret-change-me-in-production',
    databaseUrl: process.env.DATABASE_URL || './ordeo.db',
    // Public keys (exposed to client)
    public: {
      appName: 'Ordeo',
    },
  },

  app: {
    head: {
      title: 'Ordeo — ERP & Omnichannel Platform untuk Seller',
      htmlAttrs: { lang: 'id' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Ordeo adalah platform ERP & omnichannel untuk seller. Kelola order marketplace, stok, gudang, pembayaran COD, dan laporan bisnis dalam satu sistem.',
        },
        { name: 'theme-color', content: '#4f46e5' },
        { property: 'og:title', content: 'Ordeo — ERP & Omnichannel Platform untuk Seller' },
        {
          property: 'og:description',
          content:
            'Kelola order marketplace, stok, gudang, pembayaran COD, dan laporan bisnis dalam satu sistem.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },

  nitro: {
    preset: 'node-server',
  },
})
