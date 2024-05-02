<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <!--userdata is a json package of the user information, I wasn't able to figure out
    how to take it apart and display it right. I hope you guys can figure it out. The
    information in it is automatically updated when the user updates their information-->
    <div class="user-profile-main-div">
        <div class="left-side-bar" style="min-width: 200px;">
            <div style="display: flex; margin: 50px auto 10px 40px;">
                <div style="padding: 3px 0 0 3px;">
                    <span class="material-symbols-outlined" style="color: burlywood">potted_plant</span>
                </div>
                <button class="profileButtons" style="border: none; margin: 5px; width: 250px; height: 35px; border-radius: 8px;">
                    <a href="Search" style="text-decoration: none; color: green">Go to Plant Library</a>
                </button>
            </div>
            <div style="display: flex; margin: 10px auto 10px 40px;">
                <div style="padding: 10px 0 0 3px;">
                    <span class="material-symbols-outlined" style="color: burlywood">patient_list</span>
                </div>
                <button class="profileButtons" style="border: none; margin: 5px; width: 250px; height: 35px; border-radius: 8px;">
                    <a href="UserPlant" style="text-decoration: none; color: green;">Go to Personal Collection</a>
                </button>
            </div>
        </div>
        <div class="right-side" style="min-width: 600px;">
            <div style="text-align: center; width: 100%">
                <h1 style="text-align: center; margin-top: 30px; font-weight: bold;">My Account</h1>
            </div>
            <div style="width: 100%">
                <form>
                    <div style="margin: auto auto 50px 100px; display: flex; flex-wrap: wrap;">
                        <label style="display: inline-block; text-align: left; width: 100%">Profile Info</label>
                        <hr style="border: 1px solid lightgray; width: 100%;">
                        <div style="margin: 15px; margin-top: 35px !important; margin-left: 40px !important;">
                            <label for="first_name">First Name </label>
                            <input type="text" id="first_name" style="width: 300px; height: 30px; border-radius: 11px; border: 1px solid seagreen; padding-left: 5px; margin-left: 5px;":value=userdata[0].first_name>
                        </div>
                        <div style="margin: 15px; margin-top: 35px !important">
                            <label for="last_name" style="padding-right: 1px;">Last Name </label>
                            <input type="text" id="last_name" style="width: 300px; height: 30px; border-radius: 11px; border: 1px solid seagreen; padding-left: 5px; margin-left: 5px;" :value=userdata[0].last_name>
                        </div>
                        <div style="margin: 15px; width:100%; display: flexbox;">
                            <p style="margin-left: 26px">Plants Owned: {{ totalUserPlants }}</p>
                        </div>
                    </div>

                    <div style="margin: auto auto 50px 100px; display: flex; flex-wrap: wrap;">
                        <label style="display: inline-block; text-align: left; width: 100%">Account Info</label>
                        <hr style="border: 1px solid lightgray; width: 100%;">
                        <div style="margin: 35px 15px 15px 40px; width: 100%;">
                            <label for="email" style="padding-right: 45px;">Email </label>
                            <input type="text" id="email" style="width: 300px; height: 30px; border-radius: 11px; border: 1px solid seagreen" :value=userdata[0].email>
                        </div>
                        <div style="margin: 15px 15px 15px 40px; width: 100%; display: flex;">
                            <label for="password" style="padding-right: 13px;">Password </label>
                            <input type="password" id="password" style="width: 300px; height: 30px; border-radius: 11px; border: 1px solid seagreen" :value=userdata[0].password>
                            <div style="margin-top: 5px;">
                                <label class="switch">
                                <input type="checkbox" v-on:click="showPassword()" id="passwordVisibility"><span class="slider round"></span>
                                </label>
                                <label for="passwordVisibility" style="padding-left: 5px;">Show Password</label>
                            </div>
                        </div>
                    </div>
                </form>
                <div style="margin: auto auto 50px 100px; display: flex; flex-wrap: wrap; justify-content: space-evenly;">
                    <label style="display: inline-block; text-align: left; width: 100%">Controls</label>
                    <hr style="border: 1px solid lightgray; width: 100%;">
                    <div style="display: flex; justify-content: space-evenly; margin: 25px 30% 10px 30%;">
                        <div style="height: 30px; display: flex; margin: 5px;">
                            <button class="profileButtons" v-on:click="UpdateUserData()" style="height: inherit; color: steelblue; border: 0 solid red; border-radius: 15px;">Update Profile</button>
                            <div style="padding: 3px 0 0 3px;">
                                <span class="material-symbols-outlined" v-on:click="UpdateUserData()" style="color:steelblue">refresh</span>
                            </div>
                        </div>
                        <div style="height: 30px; display: flex; margin: 5px;">
                            <button class="profileButtons" v-on:click="DeleteUser()" style="height: inherit; color: red; border: 0 solid red; border-radius: 15px;">Delete Account</button>
                            <div style="padding: 3px 0 0 3px;">
                                <span class="material-symbols-outlined" v-on:click="DeleteUser()" style="color: #D22B2B">delete</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

let userdata = ref([]);

let UserID = sessionStorage.UserID;

let personalPlantsData = ref([]);

let totalUserPlants = ref(null);
let totalAlivePlants = ref(null);
let totalDeadPlants = ref(null);

function requestPlants(){
    const getplants = () => {
        let form = new FormData();
        form.append("userID", String(UserID));
        axios.post('http://127.0.0.1:8000/getmyplants/', form)
        .then(response =>
            {
                personalPlantsData.value = response.data
                const plantArrayLength = Object.keys(personalPlantsData.value).length
                let targetValue = JSON.parse(JSON.stringify(personalPlantsData.value))
                for (let i = 1; i < plantArrayLength + 1; i++) {
                    totalUserPlants.value++;
                    if (targetValue[i].alive) {
                        totalAlivePlants.value++
                    } else {
                        totalDeadPlants.value++
                    }
                }
            },
            (error) =>
            {
                alert(error.message);
            }
        )
    };
    getplants();
}
function GetUserData() {
    const Getit = () => {
        let form = new FormData();
        form.append("userID", String(UserID));
        axios.post('http://127.0.0.1:8000/getuserprofile/', form)
            .then(response => 
            {
                userdata.value.push(response.data[0].fields);

            },
            (error) =>
            {
                alert(error.message);
            });
    };
    Getit();
};
function UpdateUserData() {
    const Updateit = () => {
        let form = new FormData();
        let first_name = (<HTMLInputElement>document.getElementById("first_name")).value;
        let last_name = (<HTMLInputElement>document.getElementById("last_name")).value;
        let email = (<HTMLInputElement>document.getElementById("email")).value;
        let password = (<HTMLInputElement>document.getElementById("password")).value;
        form.append("userID", String(UserID));
        form.append("update", "update");
        if (first_name){
            form.append("first_name", first_name);
        }
        if (last_name){
            form.append("last_name", last_name);
        }
        if (email){
            form.append("email", email);
        }
        if (password){
            form.append("password", password);
        }
        axios.post('http://127.0.0.1:8000/updateprofile/', form)
            .then(response => 
            {
                alert(response.data);
                if (password){
                    history.back();
                }
                GetUserData();
            },
            (error) =>
            {
                alert(error.message);
            });
    };
    Updateit();
};
    
function DeleteUser() {
    const deleteit = () => {
        let form = new FormData();
        form.append("userID", String(UserID));
        form.append("delete", "delete");
        axios.post('http://127.0.0.1:8000/updateprofile/', form)
            .then(response => 
            {
                alert(response.data);
                window.location.href = "../";
                //TRANSPORT THE USER TO THE LANDING PAGE OR SOMETHING
            },
            (error) =>
            {
                alert(error.message);
            });
    };
    deleteit();
};

function showPassword() {
    let passwordInput = <HTMLInputElement> document.getElementById("password");
    
    if (passwordInput.type == "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password"
    }
}

GetUserData();
requestPlants();
</script>

<style>
.material-symbols-outlined:hover {
    cursor: pointer;
}
 /* The switch - the box around the slider */
 .switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: auto auto auto 5px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 2px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .3s;
  transition: .3s;
}

input:checked + .slider {
  background-color: lightgreen;
}

input:focus + .slider {
  box-shadow: 0 0 1px lightgreen;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
} 
.left-side-bar {
    width: 20%;
    height: 100vh;
    background-color: rgb(236, 238, 240);
}
.right-side {
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    color: black
}
.user-profile-main-div {
    display: flex;
    background-color: rgb(234, 231, 224);
}
.profileButtons {
    background-color: rgb(218, 218, 218);
}
.profileButtons:hover {
    background-color: rgba(193, 193, 193, 0.611);
}
</style>
