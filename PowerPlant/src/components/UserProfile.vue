<template>
    This is the userprofile page 
    <p>WELCOME TO THE ACCOUNT PAGE {{ userdata }}</p>
    <form>
        edit user information:
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
    <button @click="DeleteUser">DELETE ACCOUNT</button>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

let userdata = ref([]);

let UserID = sessionStorage.UserID;
UserID = 2;

function GetUserData() {
    const Getit = () => {
        let form = new FormData();
        form.append("userID", String(UserID));
        axios.post('http://127.0.0.1:8000/getuserprofile/', form)
            .then(response => 
            {
                userdata.value.pop();
                userdata.value.push(response.data);
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
        let first_name = (<HTMLInputElement>document.getElementById("first_name")).value;
        let last_name = (<HTMLInputElement>document.getElementById("last_name")).value;
        let email = (<HTMLInputElement>document.getElementById("email")).value;
        let password = (<HTMLInputElement>document.getElementById("password")).value;
        form.append("userID", String(UserID));
        form.append("update", "update");
        if (first_name){
            form.append("first_name", first_name);
        }
        if (last_name){
            form.append("last_name", last_name);
        }
        if (email){
            form.append("email", email);
        }
        if (password){
            form.append("password", password);
        }
        axios.post('http://127.0.0.1:8000/updateprofile/', form)
            .then(response => 
            {
                alert(response.data);
                GetUserData();
            },
            (error) =>
            {
                alert(error.message);
            });
    };
    Updateit();
};
    
function DeleteUser() {
    const deleteit = () => {
        let form = new FormData();
        form.append("userID", String(UserID));
        form.append("delete", "delete");
        axios.post('http://127.0.0.1:8000/updateprofile/', form)
            .then(response => 
            {
                alert(response.data);
                //TRANSPORT THE USER TO THE LANDING PAGE OR SOMETHING
            },
            (error) =>
            {
                alert(error.message);
            });
    };
    deleteit();
};



</script>