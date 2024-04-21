<template>
    This is the userplant page 
    <div>
        <h1> CHECK OUT ALL MY PLANTS </h1>
        click <a href="Search">here</a> to browse plants and add some to your collection!
        <li v-for="plant in plantData"><h1>{{ plant.name }}</h1>
            <p>{{ plant.description }}</p>
            <p>water: {{ plant.water }}</p>
            <p>sun: {{ plant.sun }}</p>
            <p>soil: {{ plant.soil }}</p>
            <p>size: {{ plant.size }}</p>
            <p>inside: {{ plant.inside }}</p>
            <p>fertilization: {{ plant.fertilization }}</p>
            <p>pet: {{ plant.pet }}</p>
            <button v-on:click="DeletePlant(plant.plantID)">Remove Plant</button></li>
        <a href="UserProfile">view account page</a>
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

function DeletePlant(PlantID) {
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
</script>