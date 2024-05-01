<template>
  <div class="container">
    <h1 class="title">Personal Collection</h1>
    <router-link to="/userProfile" class="profile-link">View Account Page</router-link>
    <router-link to="/search" class="profile-link">View the plant library!</router-link>
    <ul class="plant-list">
      <li v-for="plant in plantData" :key="plant.plantID" class="plant-item">
        <h2>{{ plant.name }}</h2>
        <p>{{ plant.description }}</p>
        <div class="plant-info">
          <p><strong>Days to water:</strong> {{ plant.days_to_watered }}</p>
          <p><strong>Water:</strong> {{ plant.water }}</p>
          <p><strong>Sun:</strong> {{ plant.sun }}</p>
          <p><strong>Soil:</strong> {{ plant.soil }}</p>
          <p><strong>Size:</strong> {{ plant.size }}</p>
          <p><strong>Inside:</strong> {{ plant.inside }}</p>
          <p><strong>Fertilization:</strong> {{ plant.fertilization }}</p>
          <p><strong>Pet:</strong> {{ plant.pet }}</p>
        </div>
        <button @click="deletePlant(plant.plantID)" class="remove-btn">Remove Plant</button>
        <button @click="waterPlant(plant.plantID)" class="water-btn">Water Plant</button>
      </li>
    </ul>
    
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

let UserID = sessionStorage.UserID;

let plantData = ref([]);

function requestPlants(){
    const getplants = () => {
        let form = new FormData();
        form.append("userID", String(UserID));
        axios.post('http://127.0.0.1:8000/getmyplants/', form)
        .then(response =>
            {
                plantData.value = response.data
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

function deletePlant(PlantID) {
    const deleteit = () => {
        let form = new FormData();
        form.append("userID", String(UserID));
        form.append("plantID", String(PlantID));
        form.append("alive", String(1));
        form.append("delete", "delete");
        axios.post('http://127.0.0.1:8000/updateplant/', form)
            .then(response => 
            {
                alert(response.data);
                window.location.reload()
                //TRANSPORT THE USER TO THE LANDING PAGE OR SOMETHING
            },
            (error) =>
            {
                alert(error.message);
            });
    };
    deleteit();
};
function waterPlant(PlantID) {
    const waterit = () => {
        let form = new FormData();
        form.append("userID", String(UserID));
        form.append("plantID", String(PlantID));
        form.append("alive", String(1));
        form.append("watered", "watered");
        axios.post('http://127.0.0.1:8000/updateplant/', form)
            .then(response => 
            {
                alert(response.data);
                window.location.reload()
                //TRANSPORT THE USER TO THE LANDING PAGE OR SOMETHING
            },
            (error) =>
            {
                alert(error.message);
            });
    };
    waterit();
};
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

.remove-btn {
  background-color: #ff6347;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.water-btn {
  background-color: cornflowerblue;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #cc4c38;
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
    padding: 0 3px 0 3px;
}
</style>
