<script setup>

</script>

<template>
	<div>
		<h1>Gallery</h1>
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