<template>
    This is the userprofile page 
    <!--userdata is a json package of the user information, I wasn't able to figure out
    how to take it apart and display it right. I hope you guys can figure it out. The
    information in it is automatically updated when the user updates their information-->
    <p>WELCOME TO THE ACCOUNT PAGE</p>
    <p>first_name: {{ userdata[0].first_name }}</p>
    <p>last_name: {{ userdata[0].last_name }}</p>
    <p>email: {{ userdata[0].email }}</p>
    <p>password: {{ userdata[0].password }}</p>
    <a href="Search">view plant library</a>
    <a href="UserPlant">view personal collection</a>
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

function GetUserData() {
    const Getit = () => {
        let form = new FormData();
        form.append("userID", String(UserID));
        axios.post('http://127.0.0.1:8000/getuserprofile/', form)
            .then(response => 
            {
                userdata.value.push(response.data[0].fields);
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
                if (password){
                    window.location.href = "../";
                }
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
                window.location.href = "../";
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