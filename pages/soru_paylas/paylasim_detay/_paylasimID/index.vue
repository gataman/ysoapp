<template>
  <div class="pa-2">
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
        <nuxt-link :to="'soru_paylas/paylasim_detay/' + getSecilenPaylasim.id">
          <v-img
            contain
            height="400px"
            class="mt-1 mb-1"
            :src="`/mobilapi/` + getSecilenPaylasim.foto"
          >
          </v-img>
        </nuxt-link>
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
      <!--
      <div class="py-10 text-center text-caption">
        <v-icon color="primary" large class="d-block"
          >mdi-alert-circle-outline</v-icon
        >
        Henüz yorum yapılmamış yorum yapmak ister misiniz?
      </div>

      -->
      <v-sheet color="white" elevation="1" class="mb-2 px-2 pb-2">
        <v-list-item class="pa-0 ma-0 pr-2">
          <v-list-item-avatar color="primary" size="30">
            <v-img
              class="elevation-6"
              alt=""
              :src="`/mobilapi/` + getSecilenPaylasim.fotourl"
            ></v-img>
          </v-list-item-avatar>

          <v-row align="center" justify="start">
            <v-list-item-content>
              <v-list-item-title class="text-caption"
                >{{ getSecilenPaylasim.ad }}
                {{ getSecilenPaylasim.soyad }}</v-list-item-title
              >
            </v-list-item-content>
          </v-row>

          <span class="text-caption">{{
            $getGecenZaman(getSecilenPaylasim.tarih)
          }}</span>
        </v-list-item>

        <v-divider />
        <div class="text-caption ma-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
          sint quasi quisquam ipsam quo voluptas molestias magni provident rerum
          aspernatur? Eius enim ullam quis. Odit harum minima id praesentium
          eius? Nam, facere quos dolor iste praesentium error fuga explicabo, et
          mollitia ipsa maiores maxime itaque temporibus consequatur, optio
          asperiores ex cupiditate repellendus culpa eligendi odio! Id sint
          voluptatem fuga maiores. Ratione sunt similique, possimus dicta error
          commodi aliquid aut laudantium necessitatibus tempora doloremque quae
          aliquam debitis? Quibusdam repudiandae laudantium mollitia dolore,
          incidunt repellat ad harum, optio voluptates itaque molestiae rerum?
        </div>

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

          <v-row
            align="center"
            justify="end"
            class="pr-3 caption primary--text"
          >
            Doğru Seç
          </v-row>
        </v-row>
      </v-sheet>

<v-sheet  color="white" elevation="1" class="mb-2 px-2 pb-2">
     <v-file-input
        v-show="hasImage"
        :rules="rules"
        class="mx-2"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
      ></v-file-input>
      <v-textarea
        flat solo
        placeholder="Yorumunuzu bu alandan yazabilirsiniz..."
        rows="3"
        prepend-inner-icon="mdi-emoticon"
        append-outer-icon="mdi-send"
        :append-icon="!hasImage? 'mdi-camera' : ''"
         @click:append="hasImage = !hasImage"
      >
      
       
      </v-textarea>

        </v-sheet>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    hasImage: false,
    rules: [
      value =>
        !value ||
        value.size < 5000000 ||
        "Fotoğraf boyutu 5 mb'tan küçük olmalı",
    ],
  }),
  computed: {
    ...mapGetters("all/soru_paylas", ["getSecilenPaylasim"]),
  },

  async fetch({ store, $axios, route }) {
    const paylasimID = await route.params.paylasimID;
    await store.dispatch("all/soru_paylas/fetchPaylasimDetay", paylasimID);
    const yorumList = await $axios
      .get("yorumlar/getAll/" + paylasimID)
      .then((response) => {
        return response.data;
      });

    console.log("yorum list", yorumList);
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

.yorum-text {
  font-size: 0.8rem;
}
</style>
