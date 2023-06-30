<script setup>
import MyImage from "../components/MyImage.vue";
</script>

<template>
	<h1 class="mb-5">Personnal image gallery</h1>
	<Suspense>
		<MyImage></MyImage>
	</Suspense>
</template>

<style scoped>
h1 {
	text-align: center;
	margin: 1rem;
	color: #362580;
}
</style>
