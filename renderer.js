// 'use strict'

const token  = require('./key')


const button = document.querySelector('#button')
const input = document.querySelector('#input')
const outputDiv = document.querySelector('#holder')

button.addEventListener('click', function() {
  let url = input.value
  let apiCall = new XMLHttpRequest()
  apiCall.open('GET', `https://api.dandelion.eu/datatxt/nex/v1/?text=${url}&include=image%2Cabstract%2Ccategories&token=${token}`)
  // apiCall.open('GET', `https://restcountries.eu/rest/v1/name/${url}`)
  // apiCall.open('GET', `http://api.wolframalpha.com/v2/query?input=${url}&appid=${token}&format=html`)
  // apiCall.open('GET', `http://api.wolframalpha.com/v2/query?input=${url}&appid=${token}&format=moutput,image,sound,wav`)


  apiCall.send()





  apiCall.addEventListener('load', function() {
    // console.log('responseXML.firstChild', this.responseXML.firstElementChild)
    // console.log('this',this.response)
    // console.log(this)
    // console.log('text', this.responseText)
    // const data = this.responseText
    // const data = this.responseXML
    // console.log('XMLdocument', data)
    const data = JSON.parse(this.responseText)
    console.log('data',data)



    // console.log(JSON.parse(data))
    // data.annotations.forEach(x=>{x.categories.forEach((y,i)=>console.log(y,i))})
    let titleBar = `<div col s12><h1><a href=${data.url}>${data.url}</a></h1><p>${data.text}</div>`
    outputDiv.innerHTML += titleBar
    data.annotations.forEach(x => {
      let newCard = `
      
        <div class="col s3">
          <div class="card">
            <div class="card-image">
              <img src="${x.image.full||x.image.thumbnail}">
              <span class="card-title">${x.title}</span>
            </div>
            <div class="card-content">
              <p>${x.abstract}</p>
            </div>
            <div class="card-action">
              <a href="${x.uri}">WIKI</a>
            </div>
          </div>
        </div>
      `
      outputDiv.innerHTML += newCard
    })
  })
})
