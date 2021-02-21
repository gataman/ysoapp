<template>
  <div class="container">
    <div class="image-crop">
      <clipper-basic
        ref="clipper"
        @error="errorCb"
        @load="loadCb"
        :rotate="rotation"
        :touch-create="true"
        width="100"
        :src="src"
      />

    

      <v-row>
        <v-col cols="2">
          <v-icon @click="rotation -= 90"> mdi-rotate-left</v-icon>
        </v-col>
        <v-col>
          <clipper-range :min="0" :max="360" v-model="rotation" />
        </v-col>
        <v-col cols="2"
          ><v-icon @click="rotation += 90"> mdi-rotate-right</v-icon>
        </v-col>
      </v-row>

     
      <clipper-upload v-model="src">upload image</clipper-upload>
      <hr>
      <v-btn @click="uploadImage">Yükle</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: "main",

  data: () => ({
    rotation: 0,
    src: null
  }),

  methods: {
    errorCb(error) {
      console.log("clipper error", error);
    },

    loadCb(event) {
      console.log("clipper error", event);
    },

    getFiles(obj){
        console.log(obj);
      },

    uploadImage(){
      const canvas = this.$refs.clipper.clip(); //call component's clip method
      const dataUrl = canvas.toDataURL("image/jpeg", 1)
  
      this.dataUrlToFile(dataUrl, "deneme.png").then(res=>{
            console.log(res); //canvas->image

            const paylasim = {
              id : null,
              konuID : 275,
              kullaniciID : 429,
              aciklama: 'aciklamamamamam',
              tarih : '12345',
              foto : null
            }
            const paylasimJson = JSON.stringify(paylasim);
            const bodyFormData = new FormData();
            bodyFormData.append("paylasim", paylasimJson);
            bodyFormData.append("file", res);
            this.$axios.post("paylasim/insert", bodyFormData);
      })
    },

    async dataUrlToFile(dataUrl, fileName){
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
}
  },
};
</script>

<style>
.image-crop {
  width: 502px;
}
</style>

