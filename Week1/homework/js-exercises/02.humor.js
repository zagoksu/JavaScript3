'use strict'

const btnEl = document.getElementsByTagName('button')[0];
const titleEl = document.getElementById('title');
const comicImg = document.getElementsByTagName('img')[0];
comicImg.style.width = "60%";
// comicImg.src = "https://imgs.xkcd.com/comics/woodpecker.png"

let getImageAjax = function(){

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://xkcd.now.sh/?comic=614/');
    xhr.send();
    xhr.addEventListener('load', function(){
        
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.response)
            console.log(response);
            console.log(response.img);
            titleEl.innerHTML = response.title;
            comicImg.src = response.img;            
    } else {
        console.log('404 Not Found')
    }
})
}
;

btnEl.addEventListener('click', getImageAjax);


// BY AXIOS

// const getImageAxios = function(){
//     axios.get('https://xkcd.now.sh/?comic=614/')
//     .then(function(response) {
//         console.log('data: ', response.data);
//         titleEl.innerHTML = response.data.title;
//         comicImg.src = response.data.img;     

//     })
//     .catch(function (error) {
//         console.log('error: ', error);
//     })
// }


// btnEl.addEventListener('click', getImageAxios);