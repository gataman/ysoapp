<template>
  <v-app>
    <paylasim-layout
      :paylasimList="paylasimList"
      @begenClicked="begen($event)"
    />
    <infinite-loading v-if="paylasimList.length" @infinite="infiniteScroll">
      <span slot="no-more"></span>
      <span slot="no-results"></span>
    </infinite-loading>
    

      <bottom-menu @refresh="refreshPage" />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import BottomMenu from "~/components/menu/BottomMenu.vue";

export default {
  components: {BottomMenu },
  socket: null,
  data: () => ({
   
    userID: null,
    bolumID: 1,
    page: 1,
    options: {
      soruTipi: 0,
      dersID: 0,
      konuID: 0,
      kimler: 2,
    },
  }),

  methods: {
    async begen(paylasim) {
      const bodyFormData = new FormData();
      bodyFormData.append("paylasimID", paylasim.id);
      this.$axios.post("paylasim/updateBegeni", bodyFormData);

      const data = {
        paylasimID: paylasim.id,
        isLike: paylasim.isLike,
        begenenID: this.userID,
      };

      this.$store.commit("all/soru_paylas/setSelfBegeni", data);
      //await this.socket.emit("paylasimBegen", data, (resp) => {});
      this.socket.emit("paylasimBegen", data);
    },

    infiniteScroll($state) {
      this.page++;

      this.$store.dispatch("all/soru_paylas/fetchInfiniteList", {
        url: this.url,
        options: this.options,
        state: $state,
      });
    },

    refreshPage() {
      this.userID = this.$auth.user.id;
      this.$store.dispatch("all/soru_paylas/fetchPaylasimList", {
        url: this.url,
        options: this.options,
      });
    },

    
  },

  computed: {
    url() {
      return "/paylasim/getAllWithSponsor2/" + this.bolumID + "/" + this.page;
    },
    ...mapGetters("all/soru_paylas", ["paylasimList"]),
  },

  created() {
    this.userID = this.$auth.user.id;
    this.$store.dispatch("all/soru_paylas/fetchPaylasimList", {
      url: this.url,
      options: this.options,
    });
  },

 

  mounted() {
    this.socket = this.$nuxtSocket({
      name: "paylasim",
      path: "/socket/socket.io",
      channel: "/paylasim",
      reconnection: false,
    });

    this.socket.on("paylasimBegen", (paylasim) => {
      this.$store.commit("all/soru_paylas/setBegeni", {
        paylasim: paylasim,
        userID: this.userID,
      });
    });
  },
};
</script>









