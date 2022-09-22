const { json } = require("stream/consumers");

function helloWorld(){
    let keyword = document.getElementById("keyword").value;
    let display = document.getElementById("meaning");
    let partOfSpeech = document.getElementById("partOfSpeech");
    console.log(keyword.length)
    if(keyword.length == 0){
        display.innerHTML = "Keyword required"
    }
   
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
        if (this.status == 404){
            display.innerHTML = "Word not found"
        }else{
            if(this.readyState == 4 && this.status ==200){
                let jsonData = JSON.parse(this.response)
                partOfSpeech.innerHTML = jsonData[0].meanings[0].partOfSpeech;
               display.innerHTML = jsonData[0].meanings[0].definitions[0].definition;
            }
            
        }
    }
    httpRequest.open("GET", "https://api.dictionaryapi.dev/api/v2/entries/en/"+keyword,true);
    httpRequest.send();

}