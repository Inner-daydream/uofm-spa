<script setup>
import { ref, watch } from 'vue'
const drawer = ref(true)
defineOptions({
    name: "TopNav"
})

const authenticated = ref(false)
window.addEventListener('noAuth', (event) => {
    authenticated.value = false;
});
window.addEventListener('login', (event) => {
    authenticated.value = true;
});
const username = ref(localStorage.getItem('username'))

</script>

<template>
    <v-app-bar color="anchor">
        <v-list-item v-if="authenticated">
            <v-list-item class="text-subtitle-1" prepend-icon="mdi-account">
                {{ username }}
            </v-list-item>
        </v-list-item>
        <v-list-item v-if="!authenticated" link to="/login" title="Login" prepend-icon="mdi-login-variant">
        </v-list-item>
        <v-list-item v-if="!authenticated" link to="/register" title="Register" prepend-icon="mdi-account-plus">
        </v-list-item>
        <v-chip variant="elevated" class="text-subtitle-1 mr-5" color="secondary">
            Imgur Project
        </v-chip>
    </v-app-bar>
</template>

<style>
.v-chip {

    margin-left: auto;
}
</style>