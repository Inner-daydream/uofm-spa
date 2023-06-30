<script setup>
import { RouterView } from 'vue-router'
import TopNav from './components/TopNav.vue';
import SideNav from './components/SideNav.vue';
import Footer from './components/Footer.vue';


const sideNavItems = {
  "Home": {
    "title": "About Us",
    "route": "/about",
    "icon": "mdi-information",

  },
  "About": {
    "title": "My Images",
    "route": "/myImages",
    "icon": "mdi-folder"
  },
  "Add Image": {
    "title": "Add Image",
    "route": "/add_image",
    "icon": "mdi-plus-box"
  },
  "Gallery": {
    "title": "Gallery",
    "route": "/gallery",
    "icon": "mdi-image"
  },

}
const topNavItems = {
  "Login": {
    "title": "Login",
    "route": "/login",
    "icon": "mdi-login-variant"
  },
  "Register": {
    "title": "Register",
    "route": "/register",
    "icon": "mdi-account-plus"
  },
}

</script>

<template>
  <v-app>
    <TopNav :items="topNavItems"></TopNav>
    <SideNav :items="sideNavItems"></SideNav>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<style scoped>
.v-application {
  background-color: #F7F5FF;
}
</style>