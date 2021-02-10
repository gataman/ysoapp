<template>
  <v-card>
    <v-carousel
      height="250"
      show-arrows-on-hover
      hide-delimiter-background
      v-model="cizelgeSlider"
    >
      <v-carousel-item
        height="auto"
        v-for="cizelge in cizelgeList"
        :key="cizelge.gun"
      >
       
        <card-title
          @arrow-clicked="cizelgeChange($event)"
          hasArrow
          :title="$getDayName(cizelge.gun) + ` Ders Programı`"
        />
        <v-row class="mx-2 my-2" align="center">
          <v-col cols="3" v-for="ders in cizelge.dersList" :key="ders.id">
            <cizelge-layout-item :ders="ders" />
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
import CizelgeLayoutItem from "./CizelgeLayoutItem.vue";
export default {
  components: { CizelgeLayoutItem },
  data: () => ({
    cizelgeSlider: 0,
  }),

  methods: {
    cizelgeChange(isIncrease) {
      if (isIncrease) {
        this.cizelgeSlider++;
      } else {
        if (this.cizelgeSlider == 0) {
          this.cizelgeSlider = 5;
        } else {
          this.cizelgeSlider--;
        }
      }
    },
  },
  props: {
    cizelgeList: {
      type: Array,
      required: true,
    },
  },
};
</script>


