<template>
  <v-row justify="center">
    <div class="d-inline-block">
      <div min-height="200"><Logo /></div>

      <v-card width="400" class="pa-6">
        <v-card-title primary-title class="justify-center">
          {{ pageType }}
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation block>
          <v-text-field
            v-model="kod"
            :rules="getKodRules()"
            :label="type == 1 ? 'Öğrenci Numarası' : 'Kullanıcı Kodu'"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Şifre"
            :rules="passwordRules"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
            required
          ></v-text-field>

          <div>
            <v-btn
              block
              :disabled="!valid"
              color="success"
              class="mb-4"
              @click="validate"
            >
              Giriş
            </v-btn>

            <v-btn block color="warning" to="/login">
              <v-icon left color="white">mdi-reply</v-icon> Geri
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </div>
  </v-row>
</template>

<script>
export default {
  auth: false,
  layout: "auth",
  data: () => ({
    value: String,
    type: 1,
    valid: true,
    pageType: "Öğrenci Girişi",
    kod: "",
    password: "",
    passwordRules: [
      (v) => !!v || "Şifre gereklidir!",
      (v) => (v && v.length >= 5) || "En az 5 karakter olmalıdır!",
    ],
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.login()
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    getKodRules() {
      return this.type == 1
        ? [(v) => !!v || "Öğrenci Numarası gereklidir"]
        : [(v) => !!v || "Kullanıcı Kodu gereklidir!"];
    },
    login(){
      this.$auth
        .loginWith("local", { data: { kullaniciKodu: this.kod, password: this.password} })
        .then((response) => {
          let user = response.data.user;
          console.log("gelen user")
          console.log(user)

          if(user.bolumID){
            localStorage.setItem('bolumID',user.bolumID)
          }else{
             localStorage.setItem('bolumID',1)
          }
          
          if (user.userType == 1) {
            console.log("öğrenci");
             this.$router.push('/student_panel')
          } else if (user.userType == 3) {
            console.log("öğretmen");
             this.$router.push('/teacher_panel')
          } else {
               this.$router.push('/principal_panel')
              console.log("idare");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },

  created() {
    switch (this.$route.params.type) {
      case "2":
        this.pageType = "Öğretmen Girişi";
        this.type = 2;
        break;

      case "3":
        this.pageType = "Yönetici Girişi";
        this.type = 3;
        break;

      default:
        this.pageType = "Öğrenci Girişi";
        this.type = 1;
        break;
    }
  },
};
</script>

<!--fill-height fluid-->