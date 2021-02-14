<template>
  <v-row justify="center">
    <div class="d-inline-block">
      <div min-height="200"><Logo /></div>

      <v-card width="400" class="pa-6">
        <v-card-title primary-title class="justify-center">
          {{paylasimID}}
        </v-card-title>
      </v-card>
    </div>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    paylasimID: null,
   
  }),


  created() {
    this.paylasimID = this.$route.params.paylasimID
  },
};
</script>
