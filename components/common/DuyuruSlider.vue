<template>
  <v-carousel
    height="200"
    hide-delimiter-background
    hide-delimiters
    cycle
  >
    <v-carousel-item
      height="auto"
      v-for="duyuru in duyuruList"
      :key="duyuru.id"
    >
      <div reverse-transition="fade-transition" transition="fade-transition">
        <v-img :src="duyuru.foto"></v-img>
      </div>
      <div class="carosel-bottom">
        <div class="d-block text-h6 text-truncate">{{ duyuru.title }}</div>
        <div class="block subtitle text-truncate">{{ duyuru.mesaj }}</div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
    props:{
        duyuruList : {
            type : Array,
            required : true
        }
    }
}
</script>

<style scoped>
.carosel-bottom {
    width: 100%;
    padding: 5px 10px 5px 10px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  background-color: rgba(0, 0, 0, .5);
}

.subtitle{
    font-size: 14px;
}
</style>>