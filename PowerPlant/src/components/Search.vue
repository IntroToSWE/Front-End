<template>
  <div class="outmost">
    <div class="container">
      <h1 class="title">Plant Library</h1>
      <router-link to="/userProfile" class="profile-link">View Account Page</router-link>
      <router-link to="/userPlant" class="profile-link">View your personal collection!</router-link>
      <button class="logout-btn" v-on:click="Logout()">Log out</button>
      <div style="margin: 15px; margin-top: 35px !important; margin-left: 150px !important">
        <label for="search">Search: </label>
        <input type="text" id="search" style="width: 300px; height: 30px; border-radius: 10px; border: 1px solid seagreen;">
        <button @click="search()" class="fltr-btn">Filter</button>
      </div>
      <ul class="plant-list">
        <li v-for="plant in plantData" :key="plant.pk" class="plant-item">

          <!-- Start with new cards -->
          <div class="card mb-0">
            <img class="card-img-top" :src="'/src/assets/images/'+plant.fields.name+'.jpeg'" alt="image of a plant">
            <div class="card-body">
              <h5 class="card-title"></h5>
              <h2>{{ plant.fields.name }}</h2>
              <p>{{ plant.fields.description }}</p>
              <div class="plant-info">
                <p><strong>Water:</strong> {{ plant.fields.water }}</p>
                <p><strong>Sun:</strong> {{ plant.fields.sun }}</p>
                <p><strong>Soil:</strong> {{ plant.fields.soil }}</p>
              </div>
              <button @click="addPlant(plant.pk)" class="add-btn">Add To Collection</button>
            </div>
          </div>
          <!-- End with new cards -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

let UserID = sessionStorage.UserID;

let plantData = ref([]);
let plants = ["PeaceLily"]


let imagePath = "../assets/images/"
let fileType = ".jpg"


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

function search(){
const getsearch = () => {
        let form = new FormData();
        let stringsearch = (<HTMLInputElement>document.getElementById("search")).value;
        form.append("search", String(stringsearch))
        axios.post('http://127.0.0.1:8000/getplantlibrary/', form)
        .then(response =>
            {
                console.log(response.data)
                plantData.value = []
                response.data.forEach( element => plantData.value.push(element))
                console.log(response.data)
            },
            (error) =>
            {
                alert(error.message);
            }
        )
    };
    getsearch();
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

function Logout() {
  sessionStorage.clear();
  window.location.href = "/"
}
</script>

<style scoped>
.outmost {
  background-color: rgb(234, 231, 224);
}
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  align-items: center;
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
  background-color: rgb(234, 231, 224);
  box-shadow: 0px 0px 10px 5px grey;
  position: relative;
  transition: all .3s ease-in-out
}

.plant-item:hover {
  box-shadow: 0px 0px 20px 5px grey;
  transform: translateY(-10px)
}

.plant-info {
  margin-top: 10px;
}

.add-btn {
  background-color: #28a745;
  color: #fff;
  border: none;
  margin: 8px 0px;
  border-radius: 10px;
  width: 150px;
  height: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #218838;
}

.fltr-btn {
  background-color: #28a745;
  color: #fff;
  border: none;
  margin: 8px 16px;
  border-radius: 10px;
  width: 90px;
  height: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.fltr-btn:hover {
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
/* .card-img-top {
    width: 100% !important;
    height: 20vw !important;
    object-fit: cover !important;
} */
.logout-btn {
  background-color: rgb(217, 217, 217);
  color: #007bff;
  width: 80px;
  height: 30px;
  border-radius: 15px;
  border: none;
  margin: 10px auto 10px 340px;
  align-items: center;
}
.logout-btn:hover {
  background-color: rgba(137, 155, 194, 0.5);
}
</style>
