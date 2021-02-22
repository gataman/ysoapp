<template>
    <div>
        <doughnut :chart-data="fillData(10,6,4)" :options="options" style="width:50px"/>
    </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        cutoutPercentage : 60,
        tooltips:{
            enabled: false
        }
      }
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData(soruSayisi, dogruSayisi,yanlisSayisi) {
      return {
        datasets: [
          {
            backgroundColor: ["#f36e60", "#ffdb3b", "#185190"],
            hoverBackgroundColor: ["#fbd2cd", "#fef5c9", "#d1e3f7"],
            data: [soruSayisi, dogruSayisi, yanlisSayisi]
          }
        ]
      };
    }
  }
};
</script>