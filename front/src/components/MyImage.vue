
<script setup>
import { computed, ref, watch } from 'vue'
defineOptions({
	name: "MyImage",
})
const images = ref([])
async function getImages() {
	const requestOptions = {
		method: "GET",
		credentials: "include",
	};
	try {
		const response = await fetch(import.meta.env.VITE_API_URL + "/image/user", requestOptions);
		const data = await response.json()
		return data.images
	} catch (error) {
		console.error('an error has occured while fetching images', error)
	}
}

async function deleteImage(id) {
	const requestOptions = {
		method: "DELETE",
		credentials: "include",
	};
	try {
		const response = await fetch(import.meta.env.VITE_API_URL + "/image/" + id, requestOptions);
		if (response.ok) {
			images.value = images.value.filter((image) => image._id !== id)
			console.log(images.value)
		}

	} catch (error) {
		console.error('an error has occured while deleting image', error)
	}
}

images.value = await getImages()

</script>

<template>
	<v-row>
		<v-col v-for="image in images" :key="_id" class="d-flex child-flex" cols="4">
			<v-card class="mx-auto">
				<v-img class="align-end text-black" aspect-ratio="1" :src="image.link" cover>

				</v-img>
				<v-card-title class="ma-0 pb-0">{{ image.name }}</v-card-title>
				<v-card-text>
					{{ image.description }}
				</v-card-text>
				<v-card-actions>
					<a :href="image.link" target="_blank"><v-btn text color="secondary">View</v-btn></a>
					<v-btn text color="secondary" @click="deleteImage(image._id)">Delete</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>