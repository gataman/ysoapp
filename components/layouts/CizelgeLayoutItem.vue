<template>
   
      <v-card color="white" height="70" class="ma-0 pa-0">
        <v-card-text class="ma-0 pa-0">
          <div
            height="5"
            class="ders-card-header text-truncate white--text px-1"
            align="center"
          >
            {{ $getMergedTime(ders.startTime, ders.endTime) }}
          </div>
          <div
            class="ders-card-title primary--text text-truncate px-1"
            align="center"
          >
            {{ ders.ders }}
          </div>
          <div
            class="ders-card-text secondary--text text-truncate px-1"
            align="center"
          >
            {{ ders.ad }} {{ ders.soyad }}
          </div>
        </v-card-text>
      </v-card>
  
</template>

<style scoped>
.ders-card-header {
  border-radius: 5px 5px 0px 0px;
  font-weight: 500;
  font-size: 6pt;
  background-color: #74267d;
}

.ders-card-title {
  font-weight: 500;
  font-size: xx-small;
}

.ders-card-text {
  font-weight: 500;
  font-size: 6pt;
}
</style>


<script>
export default {
    props: {
    ders: {
      type: Object,
      required: true,
    },
  },
}
</script>