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
                  <v-spacer/>
                <v-icon dark left v-if="secilenDers == ders.id">
                  mdi-checkbox-marked-circle </v-icon
                >
               
                
              
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
            <v-col cols="6" md="4" v-for="konu in konuList" :key="konu.id"
              ><v-btn
                color="secondary"
                width="100%"
                >{{ konu.konu }}
                 <v-spacer/>

              </v-btn>
              
              
              </v-col
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
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
    };
  },
  methods: {
    async fetchDersList() {
      await this.$store.dispatch("all/dersler/fetchDersList", this.bolumID);
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