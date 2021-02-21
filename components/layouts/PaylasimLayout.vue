<template>
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
                    :src="`/mobilapi/` + paylasim.fotourl"
                  ></v-img>
                </v-list-item-avatar>

                <v-row align="center" justify="start">
                  <v-list-item-content>
                    <v-list-item-title class="text-subtitle-2"
                      >{{ paylasim.ad }} {{ paylasim.soyad }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-row>

                <span class="text-caption">{{
                  $getGecenZaman(paylasim.tarih)
                }}</span>
              </v-list-item>
            </v-card-title>
            <v-divider />

            <v-card-text class="pa-0">
              <nuxt-link :to="'soru_paylas/paylasim_detay/' + paylasim.id">
                <v-img
                  contain
                  height="300px"
                  class="mt-1 mb-1"
                  :src="`/mobilapi/` + paylasim.foto"
                >
                </v-img>
              </nuxt-link>  
              <v-divider />
              <div class="aciklama px-2 py-1 secondary--text">
                {{ paylasim.aciklama }}
              </div>

              <v-divider />
            </v-card-text>

            <v-card-actions>
              <v-row class="pa-3" align="center" justify="start">
                <div @click="$emit('begenClicked', paylasim)">
                  <v-icon class="mr-1" dense color="error">
                    {{ paylasim.isLike ? `mdi-heart` : `mdi-heart-outline` }}
                  </v-icon>
                  <span class="caption mr-2 error--text">{{
                    paylasim.begeniSayisi
                  }}</span>
                </div>

                <div>
                  <v-icon dense color="primary" class="mr-1">
                    mdi-chat-outline
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
</template>

 <<script>
 export default {
    props: {
        paylasimList: {
        type: Array,
        required: false,
        default:[]
    },
  },
 }
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
