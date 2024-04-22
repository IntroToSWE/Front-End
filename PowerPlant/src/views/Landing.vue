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
  
  let UserID;
  
  function attemptLogin() {
    const login = () => {
      const email = (document.getElementById("email") as HTMLInputElement).value;
      const password = (document.getElementById("password") as HTMLInputElement).value;
  
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
  
      axios.post('http://127.0.0.1:8000/login/', formData)
        .then(response => {
          UserID = response.data;
          sessionStorage.setItem("UserID", UserID);
          console.log(UserID);
          window.location.href = "/UserPlant";
        })
        .catch(error => {
          alert(error.message);
        });
    };
    login();
  };
  </script>
  
  <style scoped>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("C:\\Users\\jonah\\PowerPlant\\PowerPlant\\src\\assets\\images\\PlantBackground.jpg");
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
  