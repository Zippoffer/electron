// 'use strict'

const token  = require('./key')


const button = document.querySelector('#button')
const input = document.querySelector('#input')
const outputDiv = document.querySelector('#holder')

button.addEventListener('click', function() {
  let url = input.value
  let apiCall = new XMLHttpRequest()
  apiCall.open('GET', `https://api.dandelion.eu/datatxt/nex/v1/?url=${url}&include=image%2Cabstract%2Ccategories&token=${token}`)
  // apiCall.open('GET', `XML: http://www.dictionaryapi.com/api/v1/references/collegiate/xml/${url}?key=${token}`)
  // apiCall.open('GET', `http://api.wolframalpha.com/v2/query?input=${url}&appid=${token}&format=html`)
  // apiCall.open('GET', `http://api.wolframalpha.com/v2/query?input=${url}&appid=${token}&format=moutput,image,sound,wav`)


  apiCall.send()

  apiCall.addEventListener('load', function() {

    const data = JSON.parse(this.responseText)
    console.log('data',data)



    // console.log(JSON.parse(data))
    // data.annotations.forEach(x=>{x.categories.forEach((y,i)=>console.log(y,i))})
    let titleBar = `<div col s12><h5><a href=${data.url} target='blank'>${data.url}</a></h5><p>${data.text}</div>`
    outputDiv.innerHTML += titleBar
    data.annotations.forEach(x => {
      let newCard = `
      <div class="container">
        <div class="col s12 cards">
          <div class="card">
            <div class="card-image">
              <img src="${x.image.full||x.image.thumbnail}" onerror="this.style.display = 'none'";>
            </div>
              <span class="card-title">${x.title}</span>
            <div class="card-content">
              <p>${x.abstract}</p>
            </div>
            <div class="card-action">
              <a href="${x.uri}" target='blank'>WIKI</a>
            </div>
          </div>
        </div>
      </div>
      `
      outputDiv.innerHTML += newCard
    })
  })
})

