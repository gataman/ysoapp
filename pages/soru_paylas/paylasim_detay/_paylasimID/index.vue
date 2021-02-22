<template>
  <div class="pa-2">
    <image-zoom
      :imageUrl="imageUrl"
      :dialog="imageZoom"
      @closeDialog="closeZoomImage"
    />
    <v-card class="pa-2">
      <v-card-title class="py-0 pl-1">
        <v-list-item class="pa-0 ma-0">
          <v-list-item-avatar color="primary">
            <v-img
              class="elevation-6"
              alt=""
              :src="`/mobilapi/` + getSecilenPaylasim.fotourl"
            ></v-img>
          </v-list-item-avatar>

          <v-row align="center" justify="start">
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-2"
                >{{ getSecilenPaylasim.ad }}
                {{ getSecilenPaylasim.soyad }}</v-list-item-title
              >
            </v-list-item-content>
          </v-row>

          <span class="text-caption">{{
            $getGecenZaman(getSecilenPaylasim.tarih)
          }}</span>
        </v-list-item>
      </v-card-title>
      <v-divider />

      <v-card-text class="pa-0">
        <v-img
          @click="openZoomImage(`/mobilapi/` + getSecilenPaylasim.foto)"
          contain
          height="400px"
          class="mt-1 mb-1"
          :src="`/mobilapi/` + getSecilenPaylasim.foto"
        >
        </v-img>
        <v-divider />
        <div class="aciklama px-2 py-1 secondary--text">
          {{ getSecilenPaylasim.aciklama }}
        </div>
      </v-card-text>

      <v-card-actions>
        <v-row class="pa-3" align="center" justify="start">
          <div @click="$emit('begenClicked', getSecilenPaylasim)">
            <v-icon class="mr-1" dense color="error">
              {{
                getSecilenPaylasim.isLike ? `mdi-heart` : `mdi-heart-outline`
              }}
            </v-icon>
            <span class="caption mr-2 error--text">{{
              getSecilenPaylasim.begeniSayisi
            }}</span>
          </div>

          <div>
            <v-icon dense color="primary" class="mr-1">
              mdi-chat-outline
            </v-icon>
            <span class="caption primary--text">{{
              getSecilenPaylasim.yorumSayisi
            }}</span>
          </div>

          <v-row align="center" justify="end" class="pr-3 caption primary--text"
            >{{ getSecilenPaylasim.ders }} /
            {{ getSecilenPaylasim.konu }}</v-row
          >
        </v-row>
      </v-card-actions>
    </v-card>

    <div class="primary text-center">
      <span class="white--text text-overline">YORUMLAR</span>
    </div>
    <div class="pa-2 deep-purple lighten-5">
      <div
        v-if="yorumList === null || yorumList.length === 0"
        class="py-10 text-center text-caption"
      >
        <v-icon color="primary" large class="d-block"
          >mdi-alert-circle-outline</v-icon
        >
        Henüz yorum yapılmamış yorum yapmak ister misiniz?
      </div>

      <yorum-layout v-for="yorum in yorumList" :key="yorum.id" :yorum="yorum" @clickZoomImage="openZoomImage($event)" />

      <v-row class="mb-5 mt-3 pa-0">
        <v-col align="center" justify="start">
          <v-btn color="secondary" @click="dialog = true"> Yorum Gönder</v-btn>
          <yorum-gonder-dialog
            @refresh="refreshPage"
            :paylasimID="paylasimID"
            :dialog="dialog"
            @closeDialog="dialog = false"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import YorumGonderDialog from "~/components/dialogs/YorumGonderDialog.vue";
import ImageZoom from "~/components/dialogs/ImageZoom.vue";
import YorumLayout from "~/components/layouts/YorumLayout.vue";
export default {
  components: { YorumGonderDialog, YorumLayout, ImageZoom },

  data: () => ({
    dialog: false,
    imageZoom: false,
    imageUrl:"",
    paylasimID: 0,
    yorumList: null,
  }),

  methods: {
    async refreshPage() {
      this.dialog = false;
      this.yorumList = await this.$axios
        .get("yorumlar/getAll/" + this.paylasimID)
        .then((response) => {
          return response.data;
        });
    },

    openZoomImage(url){
      console.log(url)
      this.imageUrl = url
      this.imageZoom = true

    },

    closeZoomImage(){
      this.imageUrl = ""
      this.imageZoom = false
    }
  },
  computed: {
    ...mapGetters("all/soru_paylas", ["getSecilenPaylasim"]),
  },

  asyncData({ params }) {
    return new Promise((resolve, reject) => {
      resolve({
        paylasimID: parseInt(params.paylasimID),
      });
    });
  },

  async middleware({ store, route }) {
    const paylasimID = await route.params.paylasimID;
    await store.dispatch("all/soru_paylas/fetchPaylasimDetay", paylasimID);
  },

  async fetch() {
    this.yorumList = await this.$axios
      .get("yorumlar/getAll/" + this.paylasimID)
      .then((response) => {
        return response.data;
      });
  },
};
</script>

<style scoped>
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
