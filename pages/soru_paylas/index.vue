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
                      :src="$config.imageURL + paylasim.fotourl"
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
              <v-card-text class="pa-0">
                <v-img
                  contain
                  height="300px"
                  class="mt-1 mb-1"
                  :src="$config.imageURL + `paylasim_foto/` + paylasim.foto"
                >
                </v-img>
                <v-divider />
                <div class="aciklama px-2 py-1 secondary--text">
                  {{ paylasim.aciklama }}
                </div>

                <v-divider />
              </v-card-text>
              <v-card-actions>
                <v-row class="pa-3" align="center" justify="start">
                  <div @click="likeIt(paylasim.id, paylasim.isLike)">
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
    <infinite-loading
      v-if="paylasimList.length"
      spinner="bubbles"
      @infinite="infiniteScroll"
    >
      <span slot="no-more"></span>
    </infinite-loading>
    <div class="primary--text">{{ paylasimList }}</div>
  </div>
</template>

<script>
export default {
  socket: null,
  layout: "soru-paylas-layout",
  data: () => ({
    paylasimList: [],
    bolumID: 1,
    page: 1,
    options: {
      soruTipi: 0,
      dersID: 0,
      konuID: 0,
      kimler: 2,
    },
  }),

  computed: {
    url() {
      return "paylasim/getAllWithSponsor2/" + this.bolumID + "/" + this.page;
    },
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      const response = await this.$axios.post(this.url, this.options);
      this.paylasimList = response.data;
    },

    async likeIt(paylasimID, isLike) {
      let pay = this.paylasimList.find((item) => item.id === paylasimID);
      pay.isLike = !pay.isLike

      console.log("like it basıldı id:" + paylasimID);
      await this.socket.emit(
        "likeIt",
        { id: paylasimID, isLike: isLike },
        (resp) => {
          console.log("socket cevap geldi");
          console.log(resp);
        }
      );
    },

    infiniteScroll($state) {
      setTimeout(() => {
        this.page++;
        this.$axios
          .post(this.url, this.options)
          .then((response) => {
            if (response.data.length > 1) {
              response.data.forEach((item) => this.paylasimList.push(item));
              $state.loaded();
            } else {
              $state.complete();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    },
  },

  mounted() {
    this.socket = this.$nuxtSocket({
      // nuxt-socket-io opts:
      name: "home", // Use socket "home"

      // socket.io-client opts:
      reconnection: false,
    });

    this.socket.on("likeIt", (paylasim) => {
      console.log("socket cevap geldi");
      console.log(paylasim);
      let pay = this.paylasimList.find((item) => item.id === paylasim.id);
      if (paylasim.isLike) {
        pay.begeniSayisi--;
      } else {
        pay.begeniSayisi++;
      }
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





