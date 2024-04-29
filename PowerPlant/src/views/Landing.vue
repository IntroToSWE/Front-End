<template>

    <div class="page-container">
      <div class="landing-container">
        <h1>Welcome to Plant Tracker</h1>
        <form class="login-form">
          <label for="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" required>
          <label for="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" required>
          <button @click="attemptLogin">Login</button>
        </form>
        <p>Don't have an account? <a href="/SignUp">Create an Account</a></p>
      </div>
    </div>
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
        axios.post('http://ec2-3-14-13-63.us-east-2.compute.amazonaws.com:8000/login/', form)
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
  
  <style scoped>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("src/assets/images/PlantBackground.jpg");
    background-size: cover;
    background-position: center;
  }
  
  .landing-container {
    max-width: 500px;
    padding: 50px 20px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.9); /* Adding a semi-transparent white background to make content more readable */
    border-radius: 10px; /* Adding some border radius for aesthetics */
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  label {
    font-size: 1.1rem;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  a {
    color: #007bff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  