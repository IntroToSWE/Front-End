<template>
    This is the userprofile page 
    <p>{{ UserData }}</p>
    <p>edit user data:</p><br>
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
    <button @click="UpdateUserData">Edit User</button>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

let UserData = ref([]);

function GetUserData() {
    const Getit = () => {
        let form = new FormData();
        let UserID = sessionStorage.UserID;
        form.append("UserID", UserID);
        axios.post('http://127.0.0.1:8000/getuserprofile/', form)
            .then(response => 
            {
                UserData.value.push(response.data);
            },
            (error) =>
            {
                alert(error.message);
            });
    };
    Getit();
};
GetUserData();

function UpdateUserData() {
    const Updateit = () => {
        let form = new FormData();
        let UserID = sessionStorage.UserID;
        form.append("UserID", UserID);
        axios.post('http://127.0.0.1:8000/getuserprofile/', form)
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
    Updateit();
};
    



</script>