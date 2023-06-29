<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const state = reactive({
	username: '',
	password: '',
	remembered: false,
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
		router.push('/gallery')
	} else {
		console.error('An error has occured while logging in')
	}
}
</script>

<template>
	<div class="flex-card">
		<v-card class="ma-auto" title="Login" max-width="500" density="compact">
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
						<v-checkbox v-model="state.remembered" label="Remember me ?"></v-checkbox>
					</v-col>

					<v-col cols="12">
						<v-btn @click="login()" block class="mt-2" text="Login"></v-btn>
					</v-col>
				</v-row>
			</v-form>
		</v-card>
	</div>
</template>