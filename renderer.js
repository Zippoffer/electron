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
    let titleBar = `<div col s12><h5><a href=${data.url} target='blank'>${data.url}</a></h5><p>${data.text}</div>`
    outputDiv.innerHTML += titleBar
    data.annotations.forEach(x => {
      let newCard = `
      <div class="container">
        <div class="col s12 cards">
          <div class="card">
            <div class="card-image">
              <img src="${x.image.full||x.image.thumbnail}" onerror="this.style.display = 'none'";>
              <span class="card-title">${x.title}</span>
            </div>
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




  // render () {
  //   const musicboxstyle = {
  //     width: '500px',
  //     height: '500px',
  //     backgroundImage: `linear-gradient(
  //     rgba(0, 0, 0, 0.7),
  //     rgba(0, 0, 0, 0.7)
  //   ),   url(${this.xlArtwork(this.state.track.artwork_url)})`
  //   }
  //   return (`
  //     <div className="scotch_music" style={musicboxstyle}>
  //       <Search
  //         clientId={this.state.client_id}
  //         autoCompleteValue={this.state.autoCompleteValue}
  //         tracks={this.state.tracks}
  //         handleSelect={this.handleSelect.bind(this)}
  //         handleChange={this.handleChange.bind(this)}/>
  //       <Details
  //         title={this.state.track.title}/>
  //       <Sound
  //          url={this.prepareUrl(this.state.track.stream_url)}
  //          playStatus={this.state.playStatus}
  //          onPlaying={this.handleSongPlaying.bind(this)}
  //          playFromPosition={this.state.playFromPosition}
  //          onFinishedPlaying={this.handleSongFinished.bind(this)}/>
  //       <Player
  //         togglePlay={this.togglePlay.bind(this)}
  //         stop={this.stop.bind(this)}
  //         playStatus={this.state.playStatus}
  //         forward={this.forward.bind(this)}
  //         backward={this.backward.bind(this)}
  //         random={this.randomTrack.bind(this)}/>
  //       <Progress
  //         elapsed={this.state.elapsed}
  //         total={this.state.total}
  //         position={this.state.position}/>
  //       <Footer />
  //     </div>
  //   `);
  // }
