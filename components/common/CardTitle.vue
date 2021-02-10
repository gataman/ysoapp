<template>
  <div class="d-flex text--subtitle primary--text justify-space-between">
    <v-icon @click="$emit('arrow-clicked',false)" class="d-inline ma-2" small color="primary">{{hasArrow? `mdi-chevron-left`: `mdi-brightness-1`}}</v-icon>
    <div width="100%" class="d-inline pt-2 text-subtitle-2">{{title}}</div>
    <v-icon @click="$emit('arrow-clicked',true)" class="d-inline ma-2" small color="primary"> {{hasArrow? `mdi-chevron-right`: `mdi-brightness-1`}}</v-icon>
  </div>
</template>
<script>
export default {
    props:{
        hasArrow: {
            type : Boolean,
            default:false
        },
        title:{
            type : String,
            default : ""
        }
    }
}
</script>