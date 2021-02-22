import colors from 'vuetify/es5/util/colors'

//degiş
//const url = 'https://www.hopayavuzselim.com/'
const url = 'http://localhost/'


export default {

  head: {
    titleTemplate: '%s - ysoapp2',
    title: 'Yavuz Selim',
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
          autoFetch: true
        },
        endpoints: {
          login: { url: 'user/web_student_login', method: 'post' },
          logout: { url: 'auth/logout', method: 'get' },
          user: { url: 'user/get_web_user', method: 'get' },
          //userUpdate: { url: '/profile/update', method: 'put'}
        }
      }
    },
    cookie: {
      cookie: {
        // (optional) If set we check this cookie exsistence for loggedIn check
        name: 'XSRF-TOKEN',
      },
      endpoints: {
        // (optional) If set, we send a get request to this endpoint before login
        csrf: {
          url: ''
        }
      }
    },

  },

  axios: {
    baseURL: url+'mobilapi/', // Used as fallback if no runtime config is provided
  },

  build: {
  },

  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',

  ],



  components: true,

  css: [
  ],


  env: {
    BASE_URL: url,
    API_URL: url+'mobilapi/'
  },

  io: {
    sockets: [ // Required
      { // At least one entry is required
        name: 'paylasim',
        url: '',
        default: true,
        vuex: { 
         },
        namespaces:{
        }
      }
    ]
  },

  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
    'nuxt-socket-io'
    ],

  plugins: [
    { src: '~/plugins/app-helper.js' },
    { src: '~/plugins/vue-clipper.js', ssr: false  },
    { src: '~/plugins/infiniteloading', ssr: false },
    { src: '~/plugins/vue-viewer', ssr: false },
    { src: '~/plugins/vue-chart', ssr: false },
    // { src: '~/plugins/socket-io', ssr:false}
  ],

//değiş
  proxy: {
    '/mobilapi': {
      target: 'http://localhost/mobilapi',
      pathRewrite: {
        '^/mobilapi': ''
      }
    },

    '/socket': {
      target: 'http://localhost:4000/',
      pathRewrite: {
        '^/socket': ''
      }
    },

  },

//--değiş

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: '/mobilapi/'
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: url+'mobilapi/'
    }
  },

  router: {
    middleware: ['auth']
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

 

 

}
