'use strict'

const ajaxBtn = document.getElementById('ajax-btn');
const axiosBtn = document.getElementById('axios-btn');
const galleryList = document.getElementById('dog-gallery-list');

let getRandomPicAjax = function () {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dog.ceo/api/breeds/image/random');
    xhr.send();
    xhr.onload = function () {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.response)
            console.log(response);
            let output = '';
            output += '<li id="list-item"><img src="' + response.message + '"></li>';
            galleryList.innerHTML = output;
            let listItem = document.getElementById('list-item');
            galleryList.appendChild(listItem);
            let dogImg = document.getElementsByTagName('img')[0];
            dogImg.style.width = '30%';

        } else {
            console.log("Error");
            galleryList.innerHTML = `Error: ${xhr.status} ${xhr.statusText}`;
        }
    }

};

ajaxBtn.addEventListener('click', getRandomPicAjax);


//BY AXIOS

let getRandomPicAxios = function () {

    axios
        .get('https://dog.ceo/api/breeds/image/random')
        .then(response => {
            console.log('data: ', response.data);
            let output = '';
            output += '<li id="list-item"><img src="' + response.data.message + '"></li>';
            galleryList.innerHTML = output;
            let listItem = document.getElementById('list-item');
            galleryList.appendChild(listItem);
            let dogImg = document.getElementsByTagName('img')[0];
            dogImg.style.width = '30%';

        })
        .catch(err => {
            console.log('error: ', error);
        })

    }

axiosBtn.addEventListener('click', getRandomPicAxios);