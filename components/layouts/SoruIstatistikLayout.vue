<template>
  <v-card height="250" class="d-flex flex-column ma-0 pa-0">
    <card-title :hasArrow="false" title="Çözdüğün Soru Sayıları" />
    <v-card-text>
      <v-row class="justify-space-between">
        <v-col class="text-left font-weight-black secondary--text">Bugün : {{(soruSayisi.bugun)?soruSayisi.bugun : `0`}}</v-col>
        <v-col class="text-right font-weight-black secondary--text">Bu Hafta : {{(soruSayisi.buHafta)?soruSayisi.buHafta : `0`}}</v-col>
      </v-row>
      <v-row class="justify-space-between">
        <v-col class="text-left font-weight-black secondary--text"> Bu Ay : {{(soruSayisi.buAy)?soruSayisi.buAy : `0`}}</v-col>
        <v-col class="text-right font-weight-black secondary--text">Toplam : {{(soruSayisi.toplam)?soruSayisi.toplam : `0`}}</v-col>
      </v-row>
    </v-card-text>

    <v-btn
      class="btn-bottom-rounded"
      justify="center"
      align="center"
      height="35"
      color="secondary"
      @click="$emit('btn-clicked')" 
      ><span class="white--text"
        ><v-icon color="white">mdi-finance</v-icon> Soru İstatistikleri</span
      ></v-btn
    >
  </v-card>
</template>

 <script>
export default {
  props: {
    soruSayisi: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style scoped>
.deneme-title {
  font-weight: 500;
  font-size: 10pt;
}

.deneme-puan {
  font-weight: 600;
  font-size: 8pt;
}

.v-responsive {
  flex: unset;
}
</style>
