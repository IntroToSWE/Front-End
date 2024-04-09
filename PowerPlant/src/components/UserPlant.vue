<template>
    This is the userplant page 
    <div>
        <h1> CHECK OUT ALL MY PLANTS </h1>
        <li v-for="plant in plantData"><h1>{{ plant.name }}</h1>
            <p>{{ plant.description }}</p>
            <p>water: {{ plant.water }}</p>
            <p>sun: {{ plant.sun }}</p>
            <p>soil: {{ plant.soil }}</p>
            <p>size: {{ plant.size }}</p>
            <p>inside: {{ plant.inside }}</p>
            <p>fertilization: {{ plant.fertilization }}</p>
            <p>pet: {{ plant.pet }}</p>
            <button @click="DeletePlant(plant.pk)">Remove Plant</button></li>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

let UserID = sessionStorage.UserID;

//ADDING PLACEHOLDER USER ID BECUASE PAGES AREN'T FULLY LINKED YET
UserID = 2;

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