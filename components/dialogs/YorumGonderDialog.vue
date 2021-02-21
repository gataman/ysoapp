<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="80%"
      transition="dialog-bottom-transition"
      @click:outside="closeDialog"
    >
      <v-card>
        <v-toolbar dark fixed color="secondary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title>Yorum Gönder</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="saveYorum"> KAYDET </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row class="mt-4 px-2 pb-2 d-block">
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
            <v-col>
              <v-sheet color="white" elevation="1">
                <v-textarea
                  v-model="aciklama"
                  solo
                  flat
                  placeholder="Yorumunuzu bu alana yazabilirsiniz..."
                  rows="3"
                >
                </v-textarea>
              </v-sheet>
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
                class="my-clipper"
                ref="clipper"
                :rotate="rotation"
                :src="secilenFoto"
              />
            </v-col>

            <v-col cols="12" justify="center" align="center">
              <v-btn
                @click="saveYorum"
                class="ma-2 justify-center"
                color="primary"
              >
                KAYDET
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    aciklama: "",
    secilenFoto: null,
    rotation: 0,
    isError: false,
    errorText: "",
  }),

  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    paylasimID:{
      type: Number,
      required: true
    }
  },

  methods: {
    saveYorum() {
      if (this.aciklama === "") {
        this.errorText = "Lütfen bir açıklama yazınız";
        this.isError = true;
      } else {
        const time = new Date().getTime();
        const yorum = {
          id: null,
          paylasimID: this.paylasimID,
          yorum: this.aciklama,
          tarih: time,
          foto: null,
        };
        const yorumJson = JSON.stringify(yorum);
        const bodyFormData = new FormData();
        bodyFormData.append("yorum", yorumJson);

        if (this.secilenFoto != null) {
          const canvas = this.$refs.clipper.clip(); //call component's clip method
          const dataUrl = canvas.toDataURL("image/jpeg", 1);
          
          this.dataUrlToFile(dataUrl, time + ".png").then((res) => {
            bodyFormData.append("file", res);
            this.$axios.post("yorumlar/insert", bodyFormData).then((res) => {
              //this.$router.app.refresh();
              this.$emit("refresh");
              this.refreshDialog();
            });
          });
        } else {
          this.$axios.post("yorumlar/insert", bodyFormData).then((res) => {
            //this.$router.app.refresh();
            this.$emit("refresh");
            this.refreshDialog();
          });
        }
      }
    },

     async dataUrlToFile(dataUrl, fileName) {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      return new File([blob], fileName, { type: "image/png" });
    },

    refreshDialog() {
      this.aciklama = "";
      this.secilenFoto = null;
      this.errorText = "";
      this.isError = false;
    },

    closeDialog() {
      this.$emit("closeDialog");
    },
  },

  mounted() {},
};
</script>

<style scoped>
.my-clipper {
  width: 100%;
  max-width: 500px;
}
</style>