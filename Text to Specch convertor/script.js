// const textarea=document.getElementById("textarea"),
// voiceList=document.querySelector("select"),

// speechBtn=document.querySelector("button");
// let synth=speechSynthesis;
// function voices(){
//     for(let voice of synth.getVoices())
// {
//     // setting google us english as default
//     let selected=voice.name==="Google US English" ? "selected" : "";
//     // creating an option tag with passing  voice name and voice language 

// let option=`<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
// voiceList.insertAdjacentHTML("beforeend",option);// inserting optrion tag beforeend of select tag


// }}
// synth.addEventListener("voiceschanged",voices);
// function textTospeech(text){
//     let utternance=new SpeechSynthesisUtterance(text);//sppechsynthensisutternce represent a specch request
//     synth.speak(utternance);//speak the speech utterance

// }
// speechBtn.addEventListener("click",e=>{
//    e.preventDefault();
//    if(textarea.value !==""){
//        textTospeech(textarea.value);
//    }
// });

const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
         // setting google us english as default
        let selected = voice.name === "Google US English" ? "selected" : "";
         // creating an option tag with passing  voice name and voice language 
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);// inserting optrion tag beforeend of select tag
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);//sppechsynthensisutternce represent a specch request
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);//speak the speech utterance
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
          
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){// if an utterance/speech is not currently in the process of speaking 
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
              // if isspeking ia true then change it value to false and resume the utterance/speech 
            // else change its value to true and pause the speech
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});