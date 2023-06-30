<script setup>
import { personData } from "../groupPerson.js"
</script>

<template>
	<div>
		<h1>Group 6 - Bad imgur clone</h1>

		<v-row justify="center" class="d-flex">
			<v-col cols="6">
				<v-img src="https://cdn.discordapp.com/attachments/1063499443346878472/1124074589916508210/esiea.png"
					height="300px"></v-img>
			</v-col>
			<v-col cols="6">
				<v-img src="https://cdn.discordapp.com/attachments/1063499443346878472/1124074590193324122/umich-logo.jpg"
					height="300px"></v-img>
			</v-col>
		</v-row>
		<!-- logo esiea / umich-->

		<div class="my-8">
			<p>
				The objective of this project was to create a website inspired by Imgur, a popular image hosting and sharing
				platform.</p>
			<p> The project aimed to incorporate key functionalities such as image uploading, image gallery display,
				user registration and login systems, user authentication, and the utilization of Vue.js and Vuetify
				frameworks
				for the front-end development.
			</p>
		</div>
		<div style="text-align: center;" class="mb-10">
			<a href="https://github.com/Inner-daydream/uofm-spa"><b>Github link</b></a>
		</div>

		<!-- description du projet-->
		<!-- lien github -->

		<v-row>
			<v-col v-for="p in personData" :key="p" cols="3">
				<v-card class="d-flex flex-column img-card" variant="elevated" color="primary" :title="p.name">
					<v-img cover aspect-ratio="1" height="300" width="300" :src="p.url"></v-img>

				</v-card>
			</v-col>

		</v-row>
	</div>
</template>

<style>
.img-card {
	max-width: 300px;
	margin: 16px;
}

h1 {
	text-align: center;
	margin: 1rem;
	color: #362580;
}

p {
	color: #362580
}
</style>