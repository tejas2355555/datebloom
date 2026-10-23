let selectedFood="",selectedVibe="",name1="",name2="",countdownTimer,quoteTimer;

const popSound=new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
const chimeSound=new Audio("https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3");
popSound.volume=.45;chimeSound.volume=.65;
function playPop(){popSound.currentTime=0;popSound.play().catch(()=>{})}
function playChime(){chimeSound.currentTime=0;chimeSound.play().catch(()=>{})}
document.addEventListener("click",e=>{if(e.target.closest("button")||e.target.closest(".choice")||e.target.closest(".gift"))playPop()});

function showScreen(id){document.querySelectorAll(".step").forEach(s=>s.classList.remove("active"));const screen=document.getElementById(id);if(screen)screen.classList.add("active")}
function yesClicked(){createHeartExplosion();showScreen("yesScreen")}
function noClicked(){showScreen("noScreen")}
function backToQuestion(){showScreen("step0")}
function showNameScreen(){showScreen("nameScreen")}

function saveNames(){
const first=document.getElementById("name1Input").value.trim(),second=document.getElementById("name2Input").value.trim();
if(!first||!second){alert("Please enter both names 💗");return}
name1=first;name2=second;showScreen("step1")
}

function nextStep(step){
if(step===2){const date=document.getElementById("dateInput").value,time=document.getElementById("timeInput").value;if(!date||!time){alert("Please choose a date and time 💗");return}}
if(step===4)updateSummary();showScreen("step"+step)
}

function selectFood(element,food){document.querySelectorAll("#step2 .choice").forEach(c=>c.classList.remove("selected"));element.classList.add("selected");selectedFood=food}
function selectVibe(element,vibe){document.querySelectorAll("#step3 .choice").forEach(c=>c.classList.remove("selected"));element.classList.add("selected");selectedVibe=vibe}
function showSurprise(){showScreen("surpriseScreen")}
function openSurprise(){document.getElementById("surpriseMessage").classList.add("show");createHeartExplosion();createPetals()}

function updateSummary(){
const date=document.getElementById("dateInput").value,time=document.getElementById("timeInput").value,place=document.getElementById("placeInput").value.trim(),customFood=document.getElementById("customFood").value.trim();
let food=customFood||selectedFood||"Not selected";
document.getElementById("summaryCouple").textContent=name1+" ❤️ "+name2;
document.getElementById("summaryDate").textContent=formatDate(date);
document.getElementById("summaryTime").textContent=formatTime(time);
document.getElementById("summaryPlace").textContent=place||"Not specified";
document.getElementById("summaryFood").textContent=food;
document.getElementById("summaryVibe").textContent=selectedVibe||"Not selected"
}
function formatDate(dateString){if(!dateString)return"-";const date=new Date(dateString+"T00:00:00");return date.toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}
function formatTime(timeString){if(!timeString)return"-";const parts=timeString.split(":"),date=new Date();date.setHours(parts[0]);date.setMinutes(parts[1]);return date.toLocaleTimeString("en-IN",{hour:"numeric",minute:"2-digit",hour12:true})}

function confirmDate(){
updateSummary();
document.getElementById("finalName1").textContent=name1;document.getElementById("finalName2").textContent=name2;
document.getElementById("finalDate").textContent=document.getElementById("summaryDate").textContent;
document.getElementById("finalTime").textContent=document.getElementById("summaryTime").textContent;
document.getElementById("finalPlace").textContent=document.getElementById("summaryPlace").textContent;
document.getElementById("finalFood").textContent=document.getElementById("summaryFood").textContent;
document.getElementById("finalVibe").textContent=document.getElementById("summaryVibe").textContent;
playChime();showScreen("finalScreen");createConfetti();createHeartExplosion();createPetals();startCountdown();startQuoteRotation()
}

const romanticQuotes=[
"Some moments become memories because they are shared with someone special. 💗",
"Two hearts, one beautiful plan, and a memory waiting to happen. 🌸",
"The best dates aren't about the place — they're about the person beside you. ❤️",
"Today is a plan. Tomorrow it becomes a beautiful memory. ✨",
"Every love story has a favorite moment. Maybe this will be yours. 💕",
"A little time together can become a lifetime memory. 🌷"
];
function startQuoteRotation(){clearInterval(quoteTimer);let index=0;quoteTimer=setInterval(()=>{index=(index+1)%romanticQuotes.length;document.getElementById("romanticQuote").textContent="“"+romanticQuotes[index]+"”"},5000)}

function createConfetti(){
const emojis=["💗","💕","❤️","🌸","✨","🎉","💖","🥰","💐"];
for(let i=0;i<60;i++){const item=document.createElement("div");item.textContent=emojis[Math.floor(Math.random()*emojis.length)];item.style.position="fixed";item.style.left=Math.random()*100+"vw";item.style.top="-30px";item.style.fontSize=15+Math.random()*25+"px";item.style.zIndex="9999";item.style.pointerEvents="none";document.body.appendChild(item);const duration=2000+Math.random()*3000;item.animate([{transform:"translateY(0) rotate(0deg)",opacity:1},{transform:"translateY(110vh) rotate(720deg)",opacity:0}],{duration,easing:"ease-out"});setTimeout(()=>item.remove(),duration)}
}
function createHeartExplosion(){
const hearts=["❤️","💗","💕","💖","💓","💞"];
for(let i=0;i<30;i++){const heart=document.createElement("div");heart.className="flying-heart";heart.textContent=hearts[Math.floor(Math.random()*hearts.length)];heart.style.left=45+Math.random()*10+"vw";heart.style.top=45+Math.random()*10+"vh";heart.style.setProperty("--x",Math.random()*100);document.body.appendChild(heart);setTimeout(()=>heart.remove(),1800)}
}
function createPetals(){
const petals=["🌸","🌷","🌺","💮"];
for(let i=0;i<25;i++){const petal=document.createElement("div");petal.className="petal";petal.textContent=petals[Math.floor(Math.random()*petals.length)];petal.style.left=Math.random()*100+"vw";petal.style.fontSize=15+Math.random()*15+"px";petal.style.animationDuration=4+Math.random()*5+"s";document.body.appendChild(petal);setTimeout(()=>petal.remove(),9000)}
}

function startCountdown(){
clearInterval(countdownTimer);
const dateValue=document.getElementById("dateInput").value,timeValue=document.getElementById("timeInput").value,target=new Date(dateValue+"T"+timeValue);
function update(){const difference=target-new Date();if(difference<=0){["days","hours","minutes","seconds"].forEach(id=>document.getElementById(id).textContent="0");clearInterval(countdownTimer);return}
const days=Math.floor(difference/86400000),hours=Math.floor(difference%86400000/3600000),minutes=Math.floor(difference%3600000/60000),seconds=Math.floor(difference%60000/1000);
document.getElementById("days").textContent=days;document.getElementById("hours").textContent=hours;document.getElementById("minutes").textContent=minutes;document.getElementById("seconds").textContent=seconds}
update();countdownTimer=setInterval(update,1000)
}

function getInvitationText(){
const date=document.getElementById("finalDate").textContent,time=document.getElementById("finalTime").textContent,place=document.getElementById("finalPlace").textContent,food=document.getElementById("finalFood").textContent,vibe=document.getElementById("finalVibe").textContent;
return `🌸 DateBloom 💗\n\n💕 IT'S A DATE! 💕\n\n${name1} ❤️ ${name2}\n\n📅 Date: ${date}\n🕐 Time: ${time}\n📍 Meeting: ${place}\n🍴 Food: ${food}\n✨ Vibe: ${vibe}\n\n💗 Two names. One beautiful date.\n\n“Some moments become memories because they are shared with someone special.”\n\n🌸 Made with a little courage & lots of love.`
}
async function shareDate(){const text=getInvitationText();if(navigator.share){try{await navigator.share({title:`💕 ${name1} ❤️ ${name2} — It's a Date!`,text});return}catch(error){if(error.name==="AbortError")return}}copyInvitation()}
async function copyInvitation(){const text=getInvitationText();try{await navigator.clipboard.writeText(text);alert("💕 Invitation copied!\n\nYou can now paste it anywhere.")}catch(error){const textArea=document.createElement("textarea");textArea.value=text;document.body.appendChild(textArea);textArea.select();document.execCommand("copy");textArea.remove();alert("💕 Invitation copied!")}}
document.getElementById("dateInput").min=new Date().toISOString().split("T")[0];
