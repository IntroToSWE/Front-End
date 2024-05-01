<template>
    <div class="container">
      <h1 class="title">Sign Up</h1>
      <p class="login-link"><router-link to="../">I already have an account</router-link></p>
      <form class="signup-form">
        <div class="form-group">
          <label for="first_name">First Name:</label>
          <input type="text" id="first_name" class="form-control">
        </div>
        <div class="form-group">
          <label for="last_name">Last Name:</label>
          <input type="text" id="last_name" class="form-control">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" class="form-control">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" class="form-control">
        </div>
        <button @click="makeNewUser" class="signup-btn">Create User</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios';
  import { ref } from 'vue';
  
  function makeNewUser() {
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
                  window.location.href = "../";
              },
              (error) =>
              {
                  alert(error.data);
              });
      };
      make();
  };
  
  
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 40px 20px;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 28px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .login-link {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .signup-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-size: 16px;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
  }
  
  .form-control:focus {
    outline: none;
    border-color: #007bff;
  }
  
  .signup-btn {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 12px 0;
    border-radius: 4px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .signup-btn:hover {
    background-color: #0056b3;
  }
  </style>
  