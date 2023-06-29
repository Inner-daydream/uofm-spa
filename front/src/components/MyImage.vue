<script setup>
import { ref } from 'vue'
const imageCount = ref(null)


</script>

<template>
	<div>
		<h1>My Image</h1>

		<v-slider v-model="imageCount" :min="0" :max="20" :step="1" thumb-label max-height="400" :label="imageCount">
		</v-slider>

		<v-row>
			<v-col v-for="img in images" :key="img" cols="2">
				<v-card class="d-flex flex-column" variant="elevated">
					<v-img cover aspect-ratio="1" width="300" :src="img.url"></v-img>

					<v-card-title>Image Url :</v-card-title>
					<v-card-text>
						{{ img.url }}
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>