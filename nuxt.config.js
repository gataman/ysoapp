import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ysoapp2',
    title: 'ysoapp2',
    htmlAttrs: {
      lang: 'tr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/app-helper.js' },
    { src: '~/plugins/infiniteloading', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
    'nuxt-socket-io'
  ],

  io: {
    sockets: [ // Required
      { 
        name: 'home', 
        url: 'https://www.hopayavuzselim.com/socket/',
        vuex:{
          //mutations:[{likeIt:'all/soru_paylas/setLike'}]
          //actions:[{likeIt:'all/soru_paylas/setLike'}]
        }
      
      }
    ]
  },

  publicRuntimeConfig: {
    imageURL: process.env.IMAGE_URL
  },
  privateRuntimeConfig: {
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:3000/api'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#74267D',
          accent: '#74267D',
          secondary: '#678B57',
          info: '#1E539C',
          warning: '#74267D',
          error: '#A4020F',
          success: '#678B57',
          white: '#ffffff'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    middleware: ['auth']
  },

  proxy: {
    '/api': {
      target: 'http://localhost/mobilapi',
      pathRewrite: {
        '^/api': ''
      }
    },

    '/socket': {
      target: 'https://www.hopayavuzselim.com/socket/',
      pathRewrite: {
        '^/socket': ''
      }
    },

  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: false,
          maxAge: 604800
          // type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: 'user/web_student_login', method: 'post' },
          logout: { url: 'auth/logout', method: 'get' },
          user: { url: 'user/get_web_user', method: 'get' },
          //userUpdate: { url: '/profile/update', method: 'put'}
        }
      }
    }
  },
}
