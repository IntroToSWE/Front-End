<template>
    This is the landing page 
    <form>
        email:
        <input type="text" id="email">
        password:
        <input type="text" id="password">
    </form>
    <button @click="attemptLogin">Login</button>
    <a href="/SignUp">Create an Account</a>
</template>

<script setup lang="ts">
import axios from 'axios';

//create the userID variable
let UserID;

//this the function that sends data to backend, it gets called by the button above
function attemptLogin() {
    //for some reason we create another function then call it immediately idk.
    const Login = () => {
        //a form is created to send to the backend
        let form = new FormData();

        //get the email and password text from the html page by looking for the correspong Id 
        let email = (<HTMLInputElement>document.getElementById("email")).value;
        let password = (<HTMLInputElement>document.getElementById("password")).value;

        //we put data into the form in a JSON (dictionary) format
        form.append("email", email);
        form.append("password", password);

        //axios.post means we use axios (imported above) and a POST method (send info to server)
        //goes to the address with the form we made
        axios.post('http://127.0.0.1:8000/login/', form)
            .then(response => 
            {
                //if we get a response then its data only includes the userID of our user
                UserID = response.data;

                //the userid is stored in session storage so we can access it everywhere (all pages)
                sessionStorage.setItem("UserID", UserID)
                console.log(UserID)
                window.location.href = "/UserPlant";
            },
                //if an error is sent back then we alert the user
            (error) =>
            {
                alert(error.message);
            });
    };
    Login();
};


</script>

