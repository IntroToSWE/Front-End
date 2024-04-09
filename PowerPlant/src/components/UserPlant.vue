<template>
    This is the userplant page 
    <div>
        <h1> CHECK OUT ALL MY PLANTS </h1>
        <li v-for="plant in plantData"><h1>{{ plant.fields.name }}</h1>
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
        axios.get('http://127.0.0.1:8000/getmyplants/')
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