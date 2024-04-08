<template>
    <div>
        <h1> CHECK OUT ALL THE PLANTS </h1>
    </div>
    {{ plantData }}
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

let plantData = ref([]);

function requestPlants(){
    const getplants = () => {
        axios.get('http://127.0.0.1:8000/getplantlibrary/')
        .then(response =>
            {
                console.log(response.data);
                console.log(String(192928))
                plantData.value.push(response.data);
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