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
    <v-app-bar color="#36A9E1" >

        <v-list-item v-for="(item, i) in items" :key="i" link :to="item.route" :title="item.title"
            :prepend-icon="item.icon">
        </v-list-item>    
        <v-chip variant="elevated" class="text-subtitle-1" background-color="#212121">       
                 Imgur Project
        </v-chip>  
    </v-app-bar>
</template>

<style>
.v-chip{

    margin-left: auto;
}
</style>