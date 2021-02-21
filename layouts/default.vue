<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      color="primary"
      fixed
      temporary
      hide-overlay
      left
      app
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img
              :src="
                'https://www.hopayavuzselim.com/mobilapi/' + $auth.user.fotourl
              "
            />
          </v-list-item-avatar>

          <v-list-item-content class="d-inline" justify="center" align="center">
            <v-list-item-title class="white--text"
              >{{ $auth.user.ad }} {{ $auth.user.soyad }}</v-list-item-title
            >
            <v-btn wto="logout" x-small color="secondary">Çıkış Yap</v-btn>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" color="primary" fixed app>
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
      <!--
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      -->
<v-spacer/>
<LogoToolbar/>
<v-toolbar-title class="ml-2 white--text " v-text="title" />
    
  <v-spacer/>
  <v-badge
        class="mr-3"
         color="red"
          content="6"
        
        overlap
      >
  <v-icon color="white">mdi-send</v-icon>
   </v-badge>
      <!--
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      -->
    </v-app-bar>
    <v-main class="">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <!--
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
   -->
  
    
      
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: "Yavuz Selim Ortaokulu",

      items: [
        {
          icon: "mdi-apps",
          title: "Ana Sayfa",
          to: "/student_panel",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Soru Paylaş",
          to: "/soru_paylas",
        },
      ],
      
    };
  },
};
</script>
<style>
.btn-bottom-rounded {
  border-radius: 0px 0px 5px 5px !important;
  background-color: #678b57;
  position: absolute;
  bottom: 0px;
  width: 100%;
}

.bg-left-rounded {
  border-radius: 4px 0px 0px 4px !important;
  background-color: #678b57;
}


</style>