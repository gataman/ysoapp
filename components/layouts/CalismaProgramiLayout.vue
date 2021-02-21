<template>
  <v-card>
    <v-carousel
      height="250"
      show-arrows-on-hover
      hide-delimiter-background
      v-model="programSlider"
    >
      <v-carousel-item
        height="auto"
        v-for="calismaProgram in calismaProgramiList"
        :key="calismaProgram.gun"
      >
        <card-title
          @arrow-clicked="cizelgeChange($event)"
          hasArrow
          :title="$getDayName(calismaProgram.gun) + ` Çalışma Programı`"
        />

        <div  v-show="calismaProgram.programList.length <= 0" class="empty-info info--text text-center ">Bugüne ait çalışma programınız ayarlanmamış!</div>

        <v-virtual-scroll
         v-show="calismaProgram.programList.length > 0"
          height="179"
          :items="calismaProgram.programList"
          item-height="45"
        >
          <template v-slot:default="{ item }">
            <div class="pa-2">
              <v-card
                :to="'/deneme/' + item.id"
                block
                class="pa-0 ma-0 px-0 mx-0 d-flex"
                color="white"
              >
                <div class="bg-left-rounded py-1 px-1 mr-2 text-caption">
                  <span class="d-block">08.00</span> <v-divider></v-divider>
                  <span class="d-block">08.40</span>
                </div>

                <div class="primary--text deneme-title px-1 py-2">
                  {{ item.aciklama }}
                </div>
              </v-card>
            </div>
          </template>
        </v-virtual-scroll>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

 <script>
export default {
  data: () => ({
    programSlider: 0,
  }),
  methods: {
    programChange(event) {
      consolo.log(event);
    },
  },
  props: {
    calismaProgramiList: {
      type: Array,
      required: true,
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

.empty-info {
  bottom: 50%;
  align-content: center;
}
</style>
