<template>
    <div>
        <h1> CHECK OUT ALL THE PLANTS </h1>
        <a href="UserPlant">view personal collection</a>
        <li v-for="plant in plantData"><h1>{{ plant.fields.name }}</h1>
            <p>{{ plant.fields.description }}</p>
            <p>water: {{ plant.fields.water }}</p>
            <p>sun: {{ plant.fields.sun }}</p>
            <p>soil: {{ plant.fields.soil }}</p>
            <button @click="AddPlant(plant.pk)">Add To Collection</button></li>
        <a href="UserProfile">view account page</a>
    </div>
    
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

let UserID = sessionStorage.UserID;

let plantData = ref([]);

function AddPlant(plantID){
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