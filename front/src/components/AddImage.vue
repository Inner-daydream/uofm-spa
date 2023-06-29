<script setup>

const initialState = {
    name: '',
    image_description: '',
    url: '',
}



function clear() {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
        state[key] = value
    }
}

async function redirect(){
    this.$router.push('gallery');
}
</script>
<!--
<script>
export default {
  methods: {
    redirectToPage() {
      // Modifier la route ci-dessous pour rediriger vers la page souhaitée
      this.$router.push('/gallery');
    }
  }
};
</script>
-->
<template>
    
    <v-form>
        <v-text-field label="Name of the image"
            required name="name"></v-text-field>

        <v-text-field label="Description of the image (Optional)"
            required image_description="image_description"></v-text-field>
            
        <v-text-field label="Url of the image"
            required url="url"></v-text-field>
        <v-btn @click="redirect" color= "red">
            submit  
        </v-btn>
       
        <v-dialog width="auto" v-model="sucessDialog">
            <v-card>
                <v-card-text>
                    <span class="text-h5">You have successfully add the image!</span>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-form>
</template>