<script setup>
import { personData } from "../groupPerson.js"
</script>

<template>
	<div>
		<h1>Group</h1>

		<div>
			
		</div>
		<!-- logo esiea / umich-->


		<p>
			The objective of this project was to create a website inspired by Imgur, a popular image hosting and sharing
			platform. The project aimed to incorporate key functionalities such as image uploading, image gallery display,
			user registration and login systems, user authentication, and the utilization of Vue.js and Vuetify frameworks
			for the front-end development.
		</p>
		<!-- description du projet-->
		<!-- lien github -->

		<v-row>
			<v-col v-for="p in personData" :key="p" cols="3">
				<v-card class="d-flex flex-column" variant="elevated" :title="p.name">
					<v-img cover aspect-ratio="1" height="300" width="300" :src="p.url"></v-img>

				</v-card>
			</v-col>

		</v-row>
	</div>
</template>