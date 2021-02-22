<template>
  <v-sheet color="white" elevation="1" class="mb-2 px-2 pb-2">
    <v-list-item class="pa-0 ma-0 pr-2">
      <v-list-item-avatar color="primary" size="30">
        <v-img
          class="elevation-6"
          alt=""
          :src="`/mobilapi/` + yorum.fotourl"
        ></v-img>
      </v-list-item-avatar>

      <v-row align="center" justify="start">
        <v-list-item-content>
          <v-list-item-title class="text-caption"
            >{{ yorum.ad }} {{ yorum.soyad }}</v-list-item-title
          >
        </v-list-item-content>
      </v-row>

      <span class="text-caption">{{ $getGecenZaman(yorum.tarih) }}</span>
    </v-list-item>
    <v-divider />
    <v-img
     @click="$emit('clickZoomImage',`/mobilapi/` + yorum.foto)"
      v-if="yorum.foto !== null"
      contain
      height="300px"
      class="mt-1 mb-1"
      :src="`/mobilapi/` + yorum.foto"
    >
    </v-img>

    <div class="text-caption ma-2">
      {{ yorum.yorum }}
    </div>

    <v-row class="pa-3" align="center" justify="start">
      <div @click="$emit('begenClicked', yorum)">
        <v-icon class="mr-1" dense color="error">
          {{ yorum.isLike ? `mdi-heart` : `mdi-heart-outline` }}
        </v-icon>
        <span class="caption mr-2 error--text">{{ yorum.begeniSayisi }}</span>
      </div>

      <v-row align="center" justify="end" class="pr-3 caption primary--text">
        Doğru Seç
      </v-row>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  props: {
    yorum: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.yorum-text {
  font-size: 0.8rem;
}
</style>