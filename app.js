'use strict'
let counter = 0;
let attempts = 25
const leftImageElement = document.getElementById('left-image');
const rightImageElement = document.getElementById('right-image');
const midImageElement = document.getElementById('mid-image');
const btn = document.getElementById('btn');
function Goods(name, imgurl) {
    this.name = name;
    this.imgurl = imgurl;
    this.shown = 0;
    this.clicks = 0;
    Goods.mainArr.push(this);
}
Goods.mainArr = [];
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
btn.addEventListener('click', renderList);

let leftIndex;
let rightIndex;
let midIndex;

function renderThreeImages() {
    leftIndex = generateRandomIndex();
    midIndex = generateRandomIndex();
    rightIndex = generateRandomIndex();
    // console.log(leftIndex);

    while (leftIndex === rightIndex || rightIndex === midIndex || leftIndex === midIndex) {
        rightIndex = generateRandomIndex();
        midIndex = generateRandomIndex();
    }

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
    counter++;
    console.log(event);
    console.log(event.target.id);

    if (attempts >= counter) {
        if (event.target.id === 'left-image') {
            Goods.mainArr[leftIndex].clicks++;
        } else if (event.target.id === 'right-image') {
            Goods.mainArr[rightIndex].clicks++;
        } else if (event.target.id === 'mid-image') {
            Goods.mainArr[rightIndex].clicks++;
        }
        renderThreeImages();
    }
}



function renderList() {
    console.log(counter);
    const ul = document.getElementById('list');
    for (let i = 0; i < Goods.mainArr.length; i++) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${Goods.mainArr[i].name} has this number of votes ${Goods.mainArr[i].clicks} and shown ${Goods.mainArr[i].shown} `
    }
    leftImageElement.removeEventListener('click', handleClick);
    rightImageElement.removeEventListener('click', handleClick);
    midImageElement.removeEventListener('click', handleClick);
}