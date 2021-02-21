<template>
  <v-row justify="center">
    <div class="d-inline-block">
      <Logo />

      <v-btn to="/login/1" block class="mt-4" height="60" width="400" color="white">
        <v-img
          src="images/svg/ic_student.svg"
          max-height="32"
          max-width="32"
          class="mr-8">
        </v-img>
        Öğrenci Girişi
      </v-btn>

       <v-btn to="/login/2" block class="mt-4" height="60" width="400" color="white">
        <v-img
          src="images/svg/ic_ogretmen.svg"
          max-height="32"
          max-width="32"
          class="mr-8">
        </v-img>
        Öğretmen Girişi
      </v-btn>

      <v-btn to="/login/3" block class="mt-4" height="60" width="400" color="white">
        <v-img
          src="images/svg/ic_yonetici.svg"
          max-height="32"
          max-width="32"
          class="mr-8">
        </v-img>
        Yönetici Girişi
      </v-btn>
    </div>
  </v-row>
</template>

<script>
export default {
  layout: "auth",
};
</script>

<!--fill-height fluid-->