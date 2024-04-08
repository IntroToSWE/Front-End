<template>
    This is the landing page 
    <form>
        email:
        <input type="text" id="email">
        password:
        <input type="text" id="password">
    </form>
    <button @click="attemptLogin">Login</button>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

let UserID;

function attemptLogin() {
    const Login = () => {
        let form = new FormData();
        let email = (<HTMLInputElement>document.getElementById("email")).value;
        let password = (<HTMLInputElement>document.getElementById("password")).value;
        form.append("email", email);
        form.append("password", password);
        axios.post('http://127.0.0.1:8000/login/', form)
            .then(response => 
            {
                UserID = response.data;
                sessionStorage.setItem("UserID", UserID)
            },
            (error) =>
            {
                alert(error.message);
            });
    };
    Login();
};


</script>

