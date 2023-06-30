<script setup>
import { ref } from 'vue'
const drawer = ref(true)
defineOptions({
    name: "SideNav"
})
const props = defineProps({
    items: {
        type: Object,
        default: new Object()
    },
})

async function logout() {
    const requestOptions = {
        method: "POST",
        credentials: 'include'
    };

    const response = await fetch(import.meta.env.VITE_API_URL + "/logout", requestOptions);

    if (response.ok) {
        window.dispatchEvent(new CustomEvent('noAuth'));
        window.location.href = "/login"
    } else {
        console.error('An error has occured while logging out')
    }
}

</script>

<template>
    <v-navigation-drawer app expand-on-hover rail permanent color="anchor">
        <v-list nav>
            <v-list-item v-for="(item, i) in items" :key="i" link :to="item.route" :title="item.title"
                :prepend-icon="item.icon">
            </v-list-item>
            <v-list-item @click="logout" link title="Logout" prepend-icon="mdi-logout"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
