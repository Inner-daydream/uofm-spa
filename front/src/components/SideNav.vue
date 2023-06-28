<script setup>
import { ref } from 'vue'
const drawer = ref(true)
defineOptions({
    name: "SideNav"
})
const props = defineProps({
    items: {
        type: Map,
        default: new Map()
    },
})
</script>

<template>
    <v-navigation-drawer app expand-on-hover rail>
        <v-list nav>
            <v-list-item v-for="(item, i) in items" :key="i" link :to="item.route" :title="item.title"
                :prepend-icon="item.icon">
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
