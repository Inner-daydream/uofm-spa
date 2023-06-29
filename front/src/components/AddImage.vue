<script setup>
import { reactive, ref } from 'vue'

const state = reactive({
    name: '',
    description: '',
    image: FormData,
})
const sucessDialog = ref(false)
async function submitFiles() {
    if (this.file) {
        let formData = new FormData();

        formData.append("image", file, file.name);
        formData.append("name", state.name);
        formData.append("description", state.description)

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
            body: formData,
            credentials: 'include'
        };

        const response = await fetch(import.meta.env.VITE_API_URL + "/login", requestOptions);

        if (response.ok) {
            sucessDialog.value = true;
        }
    } else {
        console.log("there are no files.");
    }
}
async function redirect() {
    this.$router.push('gallery');
}
</script>

<template>
    <v-form>
        <v-text-field label="Name of the image" required name="name"></v-text-field>

        <v-text-field label="Description of the image (Optional)" required image_description="image_description"
            name="description"></v-text-field>

        <v-file-input accept="image/*" label="File input"></v-file-input>
        <v-btn @click="redirect" color="red">
            submit
        </v-btn>

        <v-dialog width="auto" v-model="sucessDialog">
            <v-card>
                <v-card-text>
                    <span class="text-h5">You have successfully uploaded the image!</span>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-form>
</template>