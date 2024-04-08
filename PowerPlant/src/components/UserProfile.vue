<template>
    This is the userprofile page 
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

function GetUserData() {
    const Getit = () => {
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