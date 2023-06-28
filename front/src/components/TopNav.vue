<script setup>
import { ref } from 'vue'
const drawer = ref(true)
defineOptions({
    name: "TopNav"
})
const props = defineProps({
    items: {
        type: Map,
        default: new Map()
    },
})
</script>

<template>
    <v-app-bar>
        <v-list-item v-for="(item, i) in items" :key="i" link :to="item.route" :title="item.title"
            :prepend-icon="item.icon">
        </v-list-item>
    </v-app-bar>
</template>