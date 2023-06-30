<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const state = reactive({
	username: '',
	password: '',
})

async function login() {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ ...state }),
		credentials: 'include'
	};

	const response = await fetch(import.meta.env.VITE_API_URL + "/login", requestOptions);

	if (response.ok) {
		const data = await response.json()
		console.log(data)
		localStorage.setItem('username', data.username)
		window.dispatchEvent(new CustomEvent('login'));
		router.push('/gallery')
	} else {
		console.error('An error has occured while logging in')
	}
}
</script>

<template>
	<div class="flex-card">
		<v-card class="ma-auto login-form pa-15" density="compact" variant="elevated">
			<v-form validate-on="submit">
				<v-row>
					<v-col cols="12">
						<v-text-field v-model="state.username" label="Enter username" required>

						</v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field v-model="state.password" type="password" label="Enter password" required>

						</v-text-field>
					</v-col>
					<v-col cols="12">
						<v-btn @click="login()" block class="mt-2" text="Login" color="secondary"></v-btn>
					</v-col>
				</v-row>
			</v-form>
		</v-card>
	</div>
</template>

<style scoped>
.login-form {
	width: clamp(300px, 75ch, 80%)
}
</style>