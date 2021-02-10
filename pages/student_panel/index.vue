<template>
  <div>
    <duyuru-slider :duyuruList="getDuyuruList" />
    <v-container class="mt-5">
      <v-row>
       
          <v-col cols="12" md="6">
            <cizelge-layout :cizelgeList="getCizelgeList" />
          </v-col>
          <v-col cols="12" md="6" xl="6">
            <deneme-layout
              :denemeList="getOgrenciDetay.okulDenemeleri"
              @btn-clicked="showDenemeIstatistik"
            />
          </v-col>
      
      
          <v-col cols="12" md="6">
            <soru-istatistik-layout
              :soruSayisi="getOgrenciDetay.soruSayisi"
              @btn-clicked="showSoruIstatistik"
            />
          </v-col>
          <v-col cols="12" md="6">
            <calisma-programi-layout
              :calismaProgramiList="getCalismaProgrami"
              @btn-clicked="showSoruIstatistik"
            />
          </v-col>
     
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardTitle from "~/components/common/CardTitle.vue";
import DuyuruSlider from "~/components/common/DuyuruSlider.vue";
import CalismaProgramiLayout from "~/components/layouts/CalismaProgramiLayout.vue";
import CizelgeLayout from "~/components/layouts/CizelgeLayout.vue";
import DenemeLayout from "~/components/layouts/DenemeLayout.vue";
export default {
  components: {
    DuyuruSlider,
    CizelgeLayout,
    CardTitle,
    DenemeLayout,
    CalismaProgramiLayout,
  },

  methods: {
    showSoruIstatistik() {
      console.log("Soru İstatistik");
    },
    showDenemeIstatistik() {
      console.log("Deneme İstatistik");
    },
  },

  computed: {
    ...mapGetters("student/student_main", [
      "getDuyuruList",
      "getCizelgeList",
      "getOgrenciDetay",
      "getCalismaProgrami",
    ]),
  },

  async fetch({ store }) {
    await store.dispatch("student/student_main/fetchDuyuruList");
    await store.dispatch("student/student_main/fetchCizelgeList");
    await store.dispatch("student/student_main/fetchOgrenciDetay");
    await store.dispatch("student/student_main/fetchCalismaProgrami");
  },
};
</script>



