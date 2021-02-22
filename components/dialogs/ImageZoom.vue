<template>
  <v-dialog
    v-model="dialog"
    max-width="100%"
    transition="dialog-bottom-transition"
    @click:outside="closeDialog"
  >
    <v-btn absolute @click="closeDialog" class="ma-1" fab x-small color="white">
      <v-icon color="primary">mdi-close</v-icon>
    </v-btn>
    
      <img :src="imageUrl" v-viewer="options" />

  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    options: {
      inline: true,
      navbar: false,
      title: false,
    },
  }),

  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },

  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>