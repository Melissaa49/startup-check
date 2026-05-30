<template>

  <div class="app-shell">

    <NuxtPage />

  </div>

</template>

<style>

html {

  scroll-behavior: smooth;

}

html,
body,
#__nuxt {

  margin: 0;
  padding: 0;

  min-height: 100%;

}

body {

  font-family:
    Inter,
    system-ui,
    sans-serif;

  background:
    #faf7f2;

  color:
    #111827;

}

* {

  box-sizing:
    border-box;

}

img {

  display: block;

  max-width: 100%;

}

button,
input,
textarea {

  font: inherit;

}

a {

  color: inherit;

  text-decoration: none;

}

.app-shell {

  min-height: 100vh;

}

</style>