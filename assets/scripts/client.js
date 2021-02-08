const fs = require('fs');
const { Authenticator, Client} = require("minecraft-launcher-core");
const client = new Client()
const path = require('path');
const customTitlebar = require('custom-electron-titlebar');
const { get } = require('https');
const { remote } = require('electron');

function logout() {
    document.getElementsByClassName('content')[0].classList.add('fade-out');
    localStorage.removeItem('auth');
    window.location.replace("../html/index.html");
    client.off
}

if(this.closed) {
    client.off
}



function getversion() {
    const versionlist = document.getElementById('version')
    const verselect = versionlist.options[versionlist.selectedIndex].text
    localStorage.setItem('version', verselect);
}



function initialyse() {
    remote.getCurrentWindow().title = "Flix Client";
    const auth = JSON.parse(localStorage.getItem('auth'));
    document.getElementById('version').value = localStorage.getItem('version')
    document.getElementsByClassName("LaunchingText")[0].classList.add('disabled');
    document.getElementById('welcome').innerHTML = `Bienvenue, ${auth.name}`
    document.getElementById('headimg').src = `https://minotar.net/helm/${auth.name}/42.5.png`
    document.getElementsByClassName('textlaunch')[0].classList.add('disabled');
   // const bar = new customTitlebar.Titlebar({
     //   backgroundColor: customTitlebar.Color.fromHex('#202529'),
       // titleHorizontalAlignement: "center",
     //   icon: null,
    //    menu: null
  //  });  
    
   // bar.updateTitle(" ")
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

window.onload = (e) => {
    document.getElementsByClassName('content')[0].classList.add('disabled');
    if(localStorage.getItem('auth')) {
        document.getElementsByClassName('content')[0].classList.remove('disabled');
        document.getElementsByClassName('content')[0].classList.add('fade-in');
        initialyse()
    } else {
        logout()
    }

}




function processClient(e) {
    verselected = localStorage.getItem('version');
    document.getElementsByClassName('LaunchingText')[0].classList.remove('disabled');
    document.getElementsByClassName('launchbar')[0].classList.add('launched');
    client.launch({
        authorization: e,
        root: "./game",
        version: {
            number: verselected,
            type: "release"
        },
        memory: {
            max: "1024",
            min: "1024"
        }
    }).catch(e => {
        prependError('genericError', e.message)
    })
}


client.on('debug', (e) => console.log(e));
client.on('data', (e) => console.log(e));
client.on('close', (e) => {
    
    document.getElementsByClassName('LaunchingText')[0].classList.add('disabled');
    document.getElementsByClassName('launchbar')[0].classList.remove('launched');
    document.getElementsByClassName('textlaunch')[0].classList.remove('disabled');
    document.getElementsByClassName('launchgameclass')[0].classList.remove('launched');
});