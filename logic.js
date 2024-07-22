console.log("fuckkk that shit!!")

let s;

let currentSong = new Audio();

const songsLoad = async () => {
    let a = await fetch("http://127.0.0.1:3000/Songs/")
    let response = await a.text()
    console.log(response)

    let div = document.createElement("div")
    div.innerHTML = response;

    let as = div.getElementsByTagName("a")
    console.log(as)

    let songsFile = []

    for (let i = 0; i < as.length; i++) {
        const e = as[i]

        if (e.href.endsWith(".mp3")) {
            songsFile.push(e.href.split("/Songs/")[1])
        }
    }

    // console.log(songsFile)
    return songsFile

}

 const playMusic =(track)=>{
        // let audio = new Audio()
        currentSong.src="/Songs/"+ track
        // if(!pause){
         
        // //  play.src = "pause.svg"   
        // }
        currentSong.play()
    document.querySelector(".songTime").innerHTML = "00 / 00"
    document.querySelector(".songInfo").innerHTML = decodeURI(track)
    }


const songs = async () => {

     s = await songsLoad()
    console.log(s)

    // playMusic( s[0] ,true)

    let songUl = document.querySelector(".playList").getElementsByTagName("ul")[0]
    for (const song of s) {
        songUl.innerHTML = songUl.innerHTML + `
    <li class="M flex"><img src="SVG/music.svg" alt="home">
    <div class="info">
        <div>${song.replaceAll("%20"," ")}</div>
        <!-- <div>Prateek</div> -->
    </div>
    <div class="playNow flex">
    <span>Play <br> Now</span>
    <img src="SVG/play2.svg" alt="play"></div>
    
    </li>`;

    }

    Array.from(document.querySelector(".playList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click" ,play=>{
         console.log(e.querySelector(".info").firstElementChild.innerHTML) 
         playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())  
        })

    })

    
     play.addEventListener("click" , ()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src ="pause.svg"
        } 
        else{
            currentSong.pause()
            play.src ="main copy.svg"
        }
    })   
    
    currentSong.addEventListener("timeupdate" , ()=>{
        console.log(currentSong.currentTime , currentSong.duration);
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}  `

        document.querySelector(".circle").style.left =(currentSong.currentTime / currentSong.duration)* 100 +"%"
    })
 
    document.querySelector(".playBar").addEventListener("click" , e=>{

        let p = (e.offsetX / e.target.getBoundingClientRect().width) * 100

        document.querySelector(".circle").style.left = p +"%" ;

        currentSong.currentTime = ((currentSong.duration) * p)/100

    })


    document.querySelector(".ham").addEventListener("click" , e=>{
        document.querySelector(".left").style.left = 0
    })

    document.querySelector(".cross").addEventListener("click" , e=>{
        document.querySelector(".left").style.left = "-110%"
    })


    forward.addEventListener("click" , e=>{

        let index = s.indexOf(currentSong.src.split("/Songs/").slice(-1)[0])
        // console.log(s)

        if([index+1] < s.length){
        playMusic(s[index+1])    
        }
    })


    backward.addEventListener("click" , e=>{

        let index = s.indexOf(currentSong.src.split("/Songs/").slice(-1)[0])
        // console.log(s)

        if([index-1] >= length){
            playMusic(s[index-1])    
            }
    })


    document.querySelector(".range").addEventListener("change" , (e)=>{
        console.log("volume set to " + e.target.value + " / 100");
        currentSong.volume= (e.target.value)/100
    })


}

songs();


const secondsToMinutesSeconds =(seconds)=> {

    if(isNaN(seconds) || seconds < 0){
        return "00:00";
    }


    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    
    // Add leading zeros if necessary
    var minutesStr = String(minutes).padStart(2, '0');
    var secondsStr = String(remainingSeconds).padStart(2, '0');
    
    return `${minutesStr} : ${secondsStr}`;

}


































// function changeIcon() {
//     let iconElement = document.getElementById(".play");
//     if (iconElement.src.endsWith(".svg")) {
//         iconElement.src = "pause.svg"; // Change to icon B
//     } else {
//         iconElement.src = "play.svg"; // Change to icon A
//     }
// }
 

// play.addEventListener('click', () => {
//     if (play.src === "main copy.svg") {
//       play.src = "pause.svg"; // Change to icon B
//     } else {
//       play.src ="main copy.svg" // Change to icon A
//     }
//   });


    // let audio = new Audio(s[0]);
    // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     let duration= audio.duration;
    //     console.log(audio.duration, audio.currentTime, audio.currentSrc)
    // });