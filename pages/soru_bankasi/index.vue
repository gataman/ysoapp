<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="justify-center"> Dersler </v-card-title>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col cols="6" md="4" v-for="ders in getDersList" :key="ders.id"
              ><v-btn
                @click="secilenDers = ders.id"
                color="primary"
                width="100%"
              >
                {{ ders.ders }}
                <v-spacer />
                <v-icon dark left v-if="secilenDers == ders.id">
                  mdi-checkbox-marked-circle
                </v-icon>
              </v-btn></v-col
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="justify-center"> Konular </v-card-title>
        <v-divider />

        <v-card-text>
          <v-row>
            <v-col cols="6" md="4" v-for="konu in konuList" :key="konu.id">
              <v-btn color="secondary" width="100%" :disabled="konu.soruSayisi <=0"
                >{{ konu.konu }}
                <v-spacer />

                <doughnut
                  v-if="konu.soruSayisi > 0"
                  :chart-data="
                    fillData(
                      konu.soruSayisi,
                      konu.cozulenSayisi,
                      konu.dogruSayisi
                    )
                  "
                  :options="options"
                  style="width: 40px; height: 50px"
                />
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    {{ konuList }}
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      bolumID: null,
      secilenDers: null,
      konuList: null,
      options: {
        cutoutPercentage: 60,
        tooltips: {
          enabled: false,
        },
        responsive: true,
        aspectRatio: 1,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
      },
    };
  },
  methods: {
    async fetchDersList() {
      await this.$store.dispatch("all/dersler/fetchDersList", this.bolumID);
    },
    fillData(soruSayisi, cozulenSayi, dogruSayisi) {
      //10 soru 5 çözüldü 4 doğru
      const kalanSayi = soruSayisi - cozulenSayi;
      const yanlisSayisi = cozulenSayi - dogruSayisi;

      return {
        datasets: [
          {
            backgroundColor: ["#aeaeae", "#a4020f", "#1aa402"],
            hoverBackgroundColor: ["#999999", "#7f0008", "#147702"],
            data: [kalanSayi, yanlisSayisi, dogruSayisi],
            borderWidth: 0.3,
            borderAlign: "inner",
          },
        ],
      };
    },
  },

  mounted() {
    this.bolumID = localStorage.bolumID;
    this.fetchDersList();
  },

  computed: {
    ...mapGetters("all/dersler", ["getDersList", "getSecilenDers"]),
  },

  watch: {
    getDersList(list) {
      if (list.length > 0) {
        this.secilenDers = list[0].id;
      }
    },
    secilenDers(dersID) {
      this.$axios.get("konu/getAllWithStatics/" + dersID).then((res) => {
        this.konuList = res.data;
      });
    },
  },
};
</script>