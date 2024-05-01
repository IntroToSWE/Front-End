<template>
  <div class="container">
    <h1 class="title">Plant Library</h1>
    <router-link to="/userProfile" class="profile-link">View Account Page</router-link>
    <router-link to="/userPlant" class="profile-link">View your personal collection!</router-link>
    <ul class="plant-list">
      <li v-for="plant in plantData" :key="plant.pk" class="plant-item">
        <h2>{{ plant.fields.name }}</h2>
        <p>{{ plant.fields.description }}</p>
        <div class="plant-info">
          <p><strong>Water:</strong> {{ plant.fields.water }}</p>
          <p><strong>Sun:</strong> {{ plant.fields.sun }}</p>
          <p><strong>Soil:</strong> {{ plant.fields.soil }}</p>
        </div>
        <button @click="addPlant(plant.pk)" class="add-btn">Add To Collection</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

let UserID = sessionStorage.UserID;

let plantData = ref([]);

function addPlant(plantID){
    const DoThing = () => {
        let form = new FormData();
        form.append("user_id", String(UserID));
        form.append("plantID_id", String(plantID));
        form.append("alive", String(1));
        axios.post('http://127.0.0.1:8000/createplant/', form)
            .then(response => 
            {
                alert("plant added");
            },
            (error) =>
            {
                alert(error.data);
            });
    };
    DoThing();
}

function requestPlants(){
    const getplants = () => {
        axios.get('http://127.0.0.1:8000/getplantlibrary/')
        .then(response =>
            {
                response.data.forEach( element => plantData.value.push(element))
                console.log(response.data[0].fields.name)
            },
            (error) =>
            {
                alert(error.message);
            }
        )
    };
    getplants();
}
requestPlants();
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 32px;
  margin-bottom: 10px;
  display: flex; 
  justify-content: center;
}

.subtitle {
  font-size: 18px;
  margin-bottom: 20px;
  display: flex; 
  justify-content: center;
}

.plant-list {
  list-style: none;
  padding: 0;
}

.plant-item {
  margin-bottom: 30px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.plant-info {
  margin-top: 10px;
}

.add-btn {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #218838;
}

.profile-link {
  display: flex;
  margin: 10px 0 10px 0px;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  justify-content: center;
}
a { 
    padding: 0 0 0 3px;
}
</style>
