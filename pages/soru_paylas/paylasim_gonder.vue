<template>
  <v-container>
    <v-card>
      <v-card-title class="justify-center"> Soru Paylaş </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-textarea
              outlined
              counter="180"
              label="Açıklama"
              :rules="rules"
              v-model="aciklama"
              rows="4"
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              outlined
              v-model="secilenDers"
              :items="dersList"
              :item-value="'id'"
              :item-text="'ders'"
              label="Ders Seçin"
              @change="dersSelected($event)"
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              outlined
              v-model="secilenKonu"
              :disabled="secilenDers === null"
              :items="konuList"
              :item-value="'id'"
              :item-text="'konu'"
              label="Konu Seçin"
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              outlined
              :disabled="secilenDers === null || secilenKonu === null"
              v-model="secilenCevap"
              :items="cevapList"
              :item-value="'cevap'"
              :item-text="'cevap'"
              label="Cevap Seçin"
            ></v-select>
          </v-col>

          <v-col cols="12" justify="center" align="center">
            <clipper-upload v-model="secilenFoto"
              ><v-btn
                class="ma-2 justify-center"
                outlined
                large
                fab
                color="secondary"
              >
                <v-icon>mdi-camera</v-icon>
              </v-btn></clipper-upload
            >
          </v-col>

          <v-col cols="12" justify="center" align="center">
            <clipper-basic
              class="mx-10 my-clipper"
              ref="clipper"
              :rotate="rotation"
              :src="secilenFoto"
            />
          </v-col>

          <v-col cols="12">
            <v-alert
              v-model="isError"
              absolute
              dense
              border="left"
              type="error"
              dismissible
              transition="slide-y-transition"
            >
              {{ errorText }}
            </v-alert>
          </v-col>

          <v-col cols="12" justify="center" align="center">
            <v-btn
              @click="savePaylasim"
              class="ma-2 justify-center"
              color="primary"
            >
              KAYDET
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    bolumID: null,
    secilenDers: null,
    secilenKonu: null,
    secilenCevap: null,
    aciklama: "",
    isError: false,
    errorText: "",
    secilenFoto: null,
    rotation: 0,
    dersList: [],
    konuList: [],
    cevapList: ["A", "B", "C", "D", "Bilinmiyor"],
    rules: [(v) => v.length <= 180 || "En fazla 180 karakter olmalı"],
  }),

  methods: {
    async dersSelected(dersID) {
      await this.$axios.get("konu/getAll/" + dersID).then((res) => {
        this.konuList = res.data;
      });
    },

    savePaylasim() {
      if (this.aciklama === "") {
        this.errorText = "Lütfen bir açıklama yazınız";
        this.isError = true;
      } else if (this.secilenDers == null) {
        this.errorText = "Lütfen bir ders seçin";
        this.isError = true;
      } else if (this.secilenKonu == null) {
        this.errorText = "Lütfen bir konu seçin";
        this.isError = true;
      } else if (this.secilenCevap == null) {
        this.errorText = "Lütfen bir cevap seçin";
        this.isError = true;
      } else if (this.secilenFoto == null) {
        this.errorText = "Lütfen paylaşacağınız sorunun fotoğrafını seçin";
        this.isError = true;
      } else {
        const canvas = this.$refs.clipper.clip(); //call component's clip method
        const dataUrl = canvas.toDataURL("image/jpeg", 1);
        const time = new Date().getTime();
        this.dataUrlToFile(dataUrl, time+".png").then((res) => {
          const paylasim = {
            id: null,
            konuID: this.secilenKonu,
            aciklama: this.aciklama,
            tarih: time,
            foto: null,
          };
          const paylasimJson = JSON.stringify(paylasim);
          const bodyFormData = new FormData();
          bodyFormData.append("paylasim", paylasimJson);
          bodyFormData.append("file", res);
          this.$axios.post("paylasim/insert", bodyFormData).then(res=>{
             this.$router.push('/soru_paylas')
          })
        });
      }
    },

    async dataUrlToFile(dataUrl, fileName) {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      return new File([blob], fileName, { type: "image/png" });
    },
  },

  mounted() {
    if (localStorage.bolumID) {
      this.bolumID = localStorage.bolumID;
      this.$axios.get("ders/getAll/" + this.bolumID).then((res) => {
        this.dersList = res.data;
      });
    }
  },
};
</script>








