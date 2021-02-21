<template>
  <v-card height="250" class="d-flex flex-column ma-0 pa-0">
    <card-title :hasArrow="false" title="Deneme Sınavları" />
    <v-virtual-scroll height="179" :items="denemeList" item-height="45">
      <template v-slot:default="{ item }">
        <div class="pa-2">
          <v-btn
            :to="'/deneme/'+item.id"
            block
            class="justify-space-between"
            height="40"
            color="white"
          >
            <span class="primary--text deneme-title text-truncate px-1">{{
              item.adi
            }}</span>
            <span class="secondary--text deneme-puan text-truncate px-1">{{
              item.puan.toFixed(3)
            }}</span>
          </v-btn>
        </div>
      </template>
    </v-virtual-scroll>
    <v-btn
      class="btn-bottom-rounded"
      justify="center"
      align="center"
      height="35"
      color="secondary"
      @click="$emit('btn-clicked')"
      ><span class="white--text"
        ><v-icon color="white">mdi-finance</v-icon> Deneme İstatistikleri</span
      ></v-btn
    >
  </v-card>
</template>

 <script>
export default {
  props: {
    denemeList: {
      type: Array,
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
