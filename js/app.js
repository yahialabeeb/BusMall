'use strict'
Goods.mainArr = [];
Goods.names = []

let counter = 0;
let attempts = 25;

const leftImageElement = document.getElementById('left-image');
const rightImageElement = document.getElementById('right-image');
const midImageElement = document.getElementById('mid-image');

function Goods(name, imgurl) {
    this.name = name;
    this.imgurl = imgurl;
    this.shown = 0;
    this.clicks = 0;
    Goods.mainArr.push(this);
    Goods.names.push(this.name)
}

new Goods('banana', 'imges/banana.jpg')
new Goods('bag', 'imges/bag.jpg')
new Goods('bathroom', 'imges/bathroom.jpg')
new Goods('boots', 'imges/boots.jpg')
new Goods('breakfast', 'imges/breakfast.jpg')
new Goods('bubblegum', 'imges/bubblegum.jpg')
new Goods('chair', 'imges/chair.jpg')
new Goods('cthulhu', 'imges/cthulhu.jpg')
new Goods('dog-duck', 'imges/dog-duck.jpg')
new Goods('dragon', 'imges/dragon.jpg')
new Goods('pen', 'imges/pen.jpg')
new Goods('pet-sweep', 'imges/pet-sweep.jpg')
new Goods('scissors', 'imges/scissors.jpg')
new Goods('shark', 'imges/shark.jpg')
new Goods('sweep', 'imges/sweep.png')
new Goods('tauntaun', 'imges/tauntaun.jpg')
new Goods('unicorn', 'imges/unicorn.jpg')
new Goods('water-can', 'imges/water-can.jpg')
new Goods('wine-glass', 'imges/wine-glass.jpg')

console.log(Goods.mainArr);

function generateRandomIndex() {
    return Math.floor(Math.random() * Goods.mainArr.length);
}
leftImageElement.addEventListener('click', handleClick);
midImageElement.addEventListener('click', handleClick);
rightImageElement.addEventListener('click', handleClick);

let leftIndex;
let midIndex;
let rightIndex;
let checkPastimg = [-1, -1, -1];
let presentimg = [leftIndex, midIndex, rightIndex];
function renderThreeImages() {

    do {
        leftIndex = generateRandomIndex();
        midIndex = generateRandomIndex();
        rightIndex = generateRandomIndex();

        while (leftIndex === rightIndex || rightIndex === midIndex || leftIndex === midIndex) {
            rightIndex = generateRandomIndex();
            midIndex = generateRandomIndex();
        }
    }
    while (checkPastimg.includes(leftIndex) || checkPastimg.includes(midIndex) || checkPastimg.includes(rightIndex));

    checkPastimg = [leftIndex, midIndex, rightIndex];

    leftImageElement.src = Goods.mainArr[leftIndex].imgurl;
    Goods.mainArr[leftIndex].shown++
    rightImageElement.src = Goods.mainArr[rightIndex].imgurl;
    Goods.mainArr[rightIndex].shown++
    midImageElement.src = Goods.mainArr[midIndex].imgurl;
    Goods.mainArr[midIndex].shown++

    //     console.log(rightImageElement)

    //     console.log(Goods.mainArr[2].shown);
}

renderThreeImages();

function handleClick(event) {
    console.log(event);
    console.log(event.target.id);

    if (attempts > counter) {
        if (event.target.id === 'left-image') {
            Goods.mainArr[leftIndex].clicks++;
        } else if (event.target.id === 'right-image') {
            Goods.mainArr[rightIndex].clicks++;
        } else if (event.target.id === 'mid-image') {
            Goods.mainArr[rightIndex].clicks++;
        }
        counter++;
        renderThreeImages();
        if (attempts == counter) {
            btnApp();
        }
    }

    else {
        leftImageElement.removeEventListener('click', handleClick);
        rightImageElement.removeEventListener('click', handleClick);
        midImageElement.removeEventListener('click', handleClick);
        // saving the main array
        let saved = JSON.stringify(Goods.mainArr);
        localStorage.setItem('main', saved);
    }
}

let numOfClicks = []
let numOfshown = []
// console.log(numOfClicks);

function getAChart() {
    for (let i = 0; i < Goods.mainArr.length; i++) {
        numOfClicks.push(Goods.mainArr[i].clicks)
        numOfshown.push(Goods.mainArr[i].shown)
    }


    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Goods.names,
            datasets: [{
                label: '# of Votes',
                data: numOfClicks,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [

                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }, {
                label: '# of Shown',
                data: numOfshown,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function pre() {
    let savedData = JSON.parse(localStorage.getItem('main'))
    const preClicksPlace = document.getElementById('pre');

    for (let i = 0; i < savedData.length; i++) {
        const preList = document.createElement('li');
        preClicksPlace.appendChild(preList);
        preList.textContent = `${savedData[i].name} has this number of votes ${savedData[i].clicks} and shown ${savedData[i].shown} `
    }

    btnpre.removeEventListener('click', pre);
    //     // console.log(savedData);
    //console.log(savedData[5].clicks);
}


function btnApp() {
    const btnplace = document.getElementById('two');

    const btn = document.createElement('button');
    btnplace.appendChild(btn);
    btn.textContent = 'Show Result'

    const btntype = document.createAttribute('type');
    btntype.value = "button";
    btn.setAttributeNode(btntype);

    const btnId = document.createAttribute('id');
    btnId.value = "btn";
    btn.setAttributeNode(btnId);

    btn.addEventListener('click', getAChart);
    console.log(btnplace);
}
let btnpre;
function prebtnApp() {
    const btnplace = document.getElementById('two');

    btnpre = document.createElement('button');
    btnplace.appendChild(btnpre);
    btnpre.textContent = 'Show previous Result'

    const btntype = document.createAttribute('type');
    btntype.value = "button";
    btnpre.setAttributeNode(btntype);

    const btnId = document.createAttribute('id');
    btnId.value = "btn";
    btnpre.setAttributeNode(btnId);

    btnpre.addEventListener('click', pre);
    console.log(btnplace);
}
prebtnApp();


// function renderList() {
//     // console.log(counter);
//     const ul = document.getElementById('list');
//     for (let i = 0; i < Goods.mainArr.length; i++) {
//         let li = document.createElement('li');
//         ul.appendChild(li);
//          li.textContent = `${Goods.mainArr[i].name} has this number of votes ${Goods.mainArr[i].clicks} and shown ${Goods.mainArr[i].shown} `
//     }
//     leftImageElement.removeEventListener('click', handleClick);
//     rightImageElement.removeEventListener('click', handleClick);
//     midImageElement.removeEventListener('click', handleClick);
// }