<script setup>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import { watch } from 'vue';
import { computed } from 'vue';

const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
}

const state = reactive({
    ...initialState,
})
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const rules = {
    username: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    passwordConfirm: { required, sameAsPassword: passwordIsSame },
}

function passwordIsSame(value) {
    return value === state.password
}
const v$ = useVuelidate(rules, state)

function clear() {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
        state[key] = value
    }
}

const submitStatus = ref('')
const sucessDialog = ref(false)
const pendingDialog = ref(false)
const errorDialog = ref(false)

watch(submitStatus, (newVal) => {
    if (newVal === 'OK') {
        sucessDialog.value = true
        pendingDialog.value = false
        errorDialog.value = false
    } else if (newVal === 'PENDING') {
        pendingDialog.value = true
        sucessDialog.value = false
        errorDialog.value = false
    } else if (newVal === 'ERROR') {
        errorDialog.value = true
        sucessDialog.value = false
        pendingDialog.value = false
    } else {
        sucessDialog.value = false
        pendingDialog.value = false
        errorDialog.value = false
    }
})
function clearSubmitStatus() {
    submitStatus.value = ''
}
async function register() {
    if (v$.value.$invalid) {
        setStatus('ERROR')
        console.error('Invalid form')
        return
    }
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state })
    };
    setStatus('PENDING')
    const response = await fetch(import.meta.env.VITE_API_URL + "/user", requestOptions);
    if (response.ok) {
        submitStatus.value = 'OK'
        clear()
    } else {
        setStatus('ERROR')
        console.error('Error while registering')
    }
}
function setStatus(status) {
    submitStatus.value = status
}
</script>

<template>
    <form>
        <v-text-field v-model="state.username" :error-messages="v$.username.$errors.map(e => e.$message)" label="Username"
            required name="username"></v-text-field>

        <v-text-field v-model="state.email" :error-messages="v$.email.$errors.map(e => e.$message)" label="E-mail" required
            @input="v$.email.$touch" @blur="v$.email.$touch" name="email"></v-text-field>


        <v-text-field counter v-model="state.password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="v$.password.$errors.map(e => e.$message)" :type="showPassword ? 'text' : 'password'"
            label="Password" hint="At least 8 characters" @click:append="showPassword = !showPassword" name="password"
            @input="v$.password.$touch" @blur="v$.password.$touch"></v-text-field>

        <v-text-field counter v-model="state.passwordConfirm" :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="v$.passwordConfirm.$errors.map(e => e.$message)"
            :type="showPasswordConfirm ? 'text' : 'password'" label="Confirm Password" hint="At least 8 characters"
            @click:append="showPasswordConfirm = !showPasswordConfirm" @input="v$.passwordConfirm.$touch"
            @blur="v$.passwordConfirm.$touch"></v-text-field>

        <v-btn class="me-4" @click="v$.$validate, register()" :disabled="submitStatus === 'PENDING'">
            submit
        </v-btn>
        <v-btn @click="clear">
            clear
        </v-btn>    
        <v-dialog width="auto" v-model="sucessDialog">
            <v-card>
                <v-card-text>
                    <span class="text-h5">You have successfully registered!</span>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="clearSubmitStatus()">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="pendingDialog" width="auto">
            <v-card color="primary">
                <v-card-text>
                    Registering ...
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="errorDialog" width="auto">
            <v-card>
                <v-card-text>
                    <span class="text-h5">An error has occurred</span>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" block @click="clearSubmitStatus()">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </form>
</template>