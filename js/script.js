window.addEventListener("load", listPlaying);
let mixesList = ["Mix1","Mix2","Mix3","Mix4","Mix5","Mix6","Mix7",],
    listadoTitulos = ["Mix 1","Mix 2","Mix 3","Mix 4","Mix 5","Mix 6","Mix 7"],
    reproduciendo = -1;
const ulTag = document.querySelector("ul");
for (let i = 0; i < mixesList.length; i++) {
  let liTag= `<li li-index="${i}">
                <div class="play-pause" id="${mixesList[i]}-btn" li-index="${i}">
                    <i class="fa fa-play play-btn${i}" aria-hidden="true"></i>
                    <i class="fa-solid fa-pause pause-btn${i} hide"></i>
                </div>
                <span class="title">${listadoTitulos[i]}</span>
                <p class="artist">FaberGG</p>
                <span id="${mixesList[i]}" class="audio-duration"></span>
                <span class="musical-genre">Dance</span>
                <audio class="player_audio ${mixesList[i]}" controls id="audio">
                    <source src="${"src/audio/"+mixesList[i]+".mp3"}" type="audio/mpeg">
                </audio>
                <a href="${"src/audio/"+mixesList[i]+".mp3"}" download="mix${i+1}.mp3"><i class="fa-solid fa-circle-down"></i></a>
            </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDuartionTag = ulTag.querySelector(`#${mixesList[i]}`);
  let liAudioTag = ulTag.querySelector(`.${mixesList[i]}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`;
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}
const allLiTag = ulTag.querySelectorAll("li");
const playBtn = ulTag.querySelectorAll(".play-pause");

function listPlaying(){
    for (let j = 0; j < allLiTag.length; j++) {
      let audioTag = allLiTag[j].querySelector(".audio-duration");
      
      if(allLiTag[j].classList.contains("playing")){
        allLiTag[j].classList.remove("playing");
        let adDuration = audioTag.getAttribute("t-duration");
        audioTag.innerText = adDuration;
      }
  
      if(allLiTag[j].getAttribute("li-index") == reproduciendo){
        allLiTag[j].classList.add("playing");
        
      }
    playBtn[j].setAttribute("onclick", "clicked(this);");
    }
    
}
function clicked(element){
    let getLiIndex = parseInt(element.getAttribute("li-index"));
    let liAudio = ulTag.querySelector(`.${mixesList[getLiIndex]}`);
    let play = ulTag.querySelector(`.play-btn${getLiIndex}`);
    let pause = ulTag.querySelector(`.pause-btn${getLiIndex}`);
    if (liAudio.paused || liAudio.ended) {
      for (let i = 0; i < allLiTag.length; i++) {
        let forAudio = ulTag.querySelector(`.${mixesList[i]}`);
        forAudio.currentTime = 0;
        forAudio.pause();
        let forPlay = ulTag.querySelector(`.play-btn${i}`);
        let forPause = ulTag.querySelector(`.pause-btn${i}`);

        if(forPlay.classList.contains("hide")){
          forPause.classList.add("hide");
          forPlay.classList.remove("hide");
        }
      }
      play.classList.toggle("hide");
      pause.classList.toggle("hide");
      liAudio.play();
    } else{
      play.classList.toggle("hide");
      pause.classList.toggle("hide");
      liAudio.pause();
    }
    reproduciendo = getLiIndex;
    listPlaying();
  
}


