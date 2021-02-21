<template>
  <div class="navbar" :class="{ 'navbar--hidden': !showNavbar }">
    <v-bottom-navigation fixed class="elevation-6" color="primary">
      <v-btn>
        <span>Ana Sayfa</span>

        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn>
        <span>Öğrenci Ara</span>

        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn hidden>
        <span></span>
      </v-btn>

      <v-btn>
        <span>Bildirimler</span>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn>
        <span>Profil</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <paylasim-gonder-dialog @refresh="refreshPage" />
  </div>
</template>

<script>
import PaylasimGonderDialog from "~/components/dialogs/PaylasimGonderDialog.vue";

export default {
  data: () => ({
    showNavbar: true,
    lastScrollPosition: 0,
  }),
  components: { PaylasimGonderDialog },
  methods: {
    refreshPage() {
      this.$emit("refresh");
    },

    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
};
</script>

<style scoped>
  .navbar {
  height: 80px;
  width: 100vw;
  position: fixed;
  bottom: 0px;
  left:0px;
  transform: translate3d(0, 0, 0);
  transition: 0.3s all ease-out;
}
.navbar.navbar--hidden {
  box-shadow: none;
  transform: translate3d(0, 100%, 0);
}
</style>