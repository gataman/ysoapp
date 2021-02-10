<template>
  <div class="container">
    <div>
      <LogoBig />
      <h1 class="title">
        Yavuz Selim Ortaokulu
      </h1>
      <div class="subtitle">
       Çok yakında hizmetinizde!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "main",
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 64px;
   color: #ffffff;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 200;
  font-size: 42px;
  color: #ffffff;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

