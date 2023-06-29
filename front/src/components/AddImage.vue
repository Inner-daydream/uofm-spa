<script setup>
import { reactive, ref } from 'vue'
const initialState = {
    name: '',
    description: '',
    file: null,
}
const state = reactive({
    ...initialState
})
const shareLink = ref('')
const sucessDialog = ref(false)
async function submitFile() {
    if (state.file) {
        let formData = new FormData();

        formData.append("image", state.file[0], state.file[0].name);
        formData.append("name", state.name);
        formData.append("description", state.description)

        const requestOptions = {
            method: "POST",
            body: formData,
            credentials: 'include'
        };

        const response = await fetch(import.meta.env.VITE_API_URL + "/image", requestOptions);

        if (response.ok) {
            const data = await response.json()
            sucessDialog.value = true;
            shareLink.value = data.link
            clear()
        }
    } else {
        console.log("there are no files.");
    }
}
function clear() {
    for (const [key, value] of Object.entries(initialState)) {
        state[key] = value
    }
}
</script>

<template>
    <v-form>
        <v-text-field label="Name of the image" required name="name" v-model="state.name"></v-text-field>

        <v-text-field label="Description of the image" required image_description="image_description" name="description"
            v-model="state.description"></v-text-field>

        <v-file-input accept="image/*" label="File input" v-model="state.file"></v-file-input>
        <v-btn @click="submitFile" color="primary">
            submit
        </v-btn>

        <v-dialog width="auto" v-model="sucessDialog">
            <v-card>
                <v-card-text>
                    <p class="text-h5">You have successfully uploaded the image! You can share it with:</p>
                    <p><a :href="shareLink">{{ shareLink }}</a></p>
                </v-card-text>
                <v-btn @click="sucessDialog = false">Close</v-btn>
            </v-card>
        </v-dialog>
    </v-form>
</template>