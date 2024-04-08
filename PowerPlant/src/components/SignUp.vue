<template>
    This is the signup page 
    <form>
        first name:
        <input type="text" id="first_name">
        last name:
        <input type="text" id="last_name">
        email:
        <input type="text" id="email">
        password:
        <input type="text" id="password">
    </form>
    <button @click="MakeNewUser">Create User</button>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

let UserID;

function MakeNewUser() {
    const make = () => {
        let form = new FormData();
        let first_name = (<HTMLInputElement>document.getElementById("first_name")).value;
        let last_name = (<HTMLInputElement>document.getElementById("last_name")).value;
        let email = (<HTMLInputElement>document.getElementById("email")).value;
        let password = (<HTMLInputElement>document.getElementById("password")).value;
        form.append("first_name", first_name);
        form.append("last_name", last_name);
        form.append("email", email);
        form.append("password", password);
        axios.post('http://127.0.0.1:8000/signup/', form)
            .then(response => 
            {
                alert(response.data);
            },
            (error) =>
            {
                alert(error.message);
            });
    };
    make();
};


</script>

