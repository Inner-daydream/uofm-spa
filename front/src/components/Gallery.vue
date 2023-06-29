
<script setup>
import { computed, ref, watch } from 'vue'
defineOptions({
    name: "Gallery"
})
const imageAmount = ref(0)
const images = ref([])
async function getImages() {
    const requestOptions = {
        method: "GET",
        credentials: "include",
    };
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/image?amount=" + imageAmount.value, requestOptions);
        if (response.ok) {
            const data = await response.json()
            return data.images
        } else {
            console.error('An error has occured while using image function in')
        }
    } catch (error) {
        console.error('an error has occured while fetching images', error)
    }
}

watch(imageAmount, async (newValue, oldValue) => {
    console.log('imageAmount changed from', oldValue, 'to', newValue)
    const fetchedImages = await getImages()
    images.value = fetchedImages
    console.log(images.value)
})
imageAmount.value = 10

</script>

<template>
    <v-slider v-model="imageAmount" :min="0" :max="30" :step="1" thumb-label></v-slider>
    <v-row>
        <v-col v-for="image in images" :key="_id" class="d-flex child-flex" cols="4">
            <!-- <v-img :src="image.link" aspect-ratio="1" cover class="bg-grey-lighten-2">
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                    </v-row>
                </template>
            </v-img> -->
            <v-card class="mx-auto">
                <v-img class="align-end text-black" aspect-ratio="1" :src="image.link" cover>

                </v-img>
                <v-card-title class="ma-0 pb-0">{{ image.name }}</v-card-title>
                <v-card-subtitle class="ma-0">
                    author: {{ image.user }}
                </v-card-subtitle>
                <v-card-text>
                    {{ image.description }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>