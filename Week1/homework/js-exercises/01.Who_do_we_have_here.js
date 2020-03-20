'use strict'

const ajaxBtn = document.querySelector("#get-user-ajax");
const axiosBtn = document.querySelector("#get-user-axios");
const messageBox = document.querySelector("#message-box")
const userName = document.querySelector("#name");
const userImg = document.querySelector("#user-image")
const userLocation = document.querySelector("#city")
const email = document.querySelector("#email");
const userAge = document.querySelector("#age")

// AJAX function
const getRandomAjax = function() {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.randomuser.me/api', true);
    xhr.send();
    xhr.onerror = () => console.log('Network request failed'); // error handling due to cant reach server
    xhr.onload = function(event) {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText)
     console.log(response);
   
     userImg.src = `${response.results[0].picture.large}`;
     userName.innerHTML = `Name: ${response.results[0].name.title}  ${response.results[0].name.first} ${response.results[0].name.last}`
     userAge.innerText = `Age: ${response.results[0].dob.age}`
     userLocation.innerHTML = `Location: ${response.results[0].location.city} / ${response.results[0].location.country}`
     email.textContent = `E-mail: ${response.results[0].email}   `
} else {
    messageBox.innerHTML = `Network error: ${xhr.response} ${xhr.status} `
}
}}

getRandomAjax();

ajaxBtn.addEventListener("click", getRandomAjax);



//  BY AXIOS

const getRandomAxios = function() {
        axios.get('https://www.randomuser.me/api')
        .then(function(response) {
            console.log('data: ', response.data.results[0]);     
            userImg.src = `${response.data.results[0].picture.large}`;
            userName.innerHTML = `Name: ${response.data.results[0].name.title}  ${response.data.results[0].name.first} ${response.data.results[0].name.last}`
            userAge.innerText = `Age: ${response.data.results[0].dob.age}`
            userLocation.innerHTML = `Location: ${response.data.results[0].location.city} / ${response.data.results[0].location.country}`
            email.textContent = `E-mail: ${response.data.results[0].email}`
        })
        .catch(function (error) {
            console.log('error: ', error.message);
        })
    }

getRandomAxios();
axiosBtn.addEventListener("click", getRandomAxios);
