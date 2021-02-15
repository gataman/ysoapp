<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="6"
        v-for="(paylasim, index) in paylasimList"
        :key="index"
      >
        <v-card class="white">
          <v-layout>
            <v-flex>
              <v-card-title class="py-0 pl-1">
                <v-list-item class="grow">
                  <v-list-item-avatar color="primary">
                    <v-img
                      class="elevation-6"
                      alt=""
                      :src="`mobilapi/` + paylasim.fotourl"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-row align="center" justify="start">
                    <v-list-item-content>
                      <v-list-item-title class="text-subtitle-2"
                        >{{ paylasim.ad }}
                        {{ paylasim.soyad }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-row>
                </v-list-item>
              </v-card-title>
              <v-divider />
              <nuxt-link :to="'soru_paylas/paylasim_detay/' + paylasim.id">
                <v-card-text class="pa-0">
                  <v-img
                    contain
                    height="300px"
                    class="mt-1 mb-1"
                    :src="`mobilapi/` + paylasim.foto"
                  >
                  </v-img>
                  <v-divider />
                  <div class="aciklama px-2 py-1 secondary--text">
                    {{ paylasim.aciklama }}
                  </div>

                  <v-divider />
                </v-card-text>
              </nuxt-link>
              <v-card-actions>
                <v-row class="pa-3" align="center" justify="start">
                  <div @click="begen(paylasim)">
                    <v-icon class="mr-1" dense color="error">
                      {{ paylasim.isLike ? `mdi-heart` : `mdi-heart-outline` }}
                    </v-icon>
                    <span class="caption mr-2 error--text">{{
                      paylasim.begeniSayisi
                    }}</span>
                  </div>

                  <div>
                    <v-icon dense color="primary" class="mr-1">
                      mdi-comment-outline
                    </v-icon>
                    <span class="caption primary--text">{{
                      paylasim.yorumSayisi
                    }}</span>
                  </div>

                  <v-row
                    align="center"
                    justify="end"
                    class="pr-3 caption primary--text"
                    >{{ paylasim.ders }} / {{ paylasim.konu }}</v-row
                  >
                </v-row>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
    <infinite-loading v-if="paylasimList.length" @infinite="infiniteScroll">
      <span slot="no-more"></span>
      <span slot="no-results"></span>
    </infinite-loading>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  socket: null,
  layout: "soru-paylas-layout",
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

      await this.socket.emit("paylasimBegen", data, (resp) => {
        console.log(resp);
      });
    },

    infiniteScroll($state) {
      this.page++;

      this.$store.dispatch("all/soru_paylas/fetchInfiniteList", {
        url: this.url,
        options: this.options,
        state: $state,
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
      console.log("cevap geldi");
      console.log(paylasim);

      this.$store.commit("all/soru_paylas/setBegeni", {
        paylasim: paylasim,
        userID: this.userID,
      });
    });
  },
};
</script>

<style scoped>
.theme--light.v-card {
  background-color: #f5f5f5;
}

.aciklama {
  font-size: 12px;
  line-height: 15px;
  height: 35px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>





