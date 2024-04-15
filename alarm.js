// Connection for all html elements  
let time = document.querySelector(".clock");
let hrinput = document.querySelector("#hrinput");
let mInput = document.querySelector("#minput");
let activealarms = document.querySelector(".actalarm");
let setAlarm = document.querySelector("#set");

// array for collection for alarm 
let alarmcollect = [];
// audio for alarm 
const alarmringtone = new Audio("alarm.mp3");

// variable for showing inital time
let ihour = 0;
let iminute=0;
let alarmIndex = 0;


// function used is used for appending a zero if a single digit is present
const appendZero = (value)=>{
  return  value<10?"0"+value:value
};


// function for 12 hr format for showing a time

// const twlformat = (date)=>{
//     let hr = date.getHours();
//     let min = date.getMinutes();
//     let sec = date.getSeconds();
//     let ampm = hr >=12?'PM':'AM';
//     hr = hr%12;
//     hr = hr?hr:12;
//     min = min<10?'0'+min:min;
//     sec = sec<10?'0'+sec:sec;
//     let finaltime = hr + ':' + min + ':' + sec + ' ' + ampm;
//     return finaltime;
// }


// for checking in case of multiple alarm 
const searchObject = (p,v)=>{
    let alarmObject,objIndex,
    exits=false;
    alarmcollect.forEach((alarm,index)=>{
        if(alarm[p]==v){
            exits=true;
            alarmObject=alarm;
            objIndex=index;
            return false;
        }
    })
    return [exits,alarmObject,objIndex];

};
// for dispalying live  or current time
function displayTime(){
    const date = new Date();
    let [hours,minutes,seconds]=[appendZero(date.getHours()),
        appendZero(date.getMinutes()),
        appendZero(date.getSeconds())
        ];

 time.innerHTML = `${hours}:${minutes}:${seconds}`;
// for checkinng if alarm is active or not
alarmcollect.forEach((alarm,index)=>{
    if(alarm.isActive){
        if(`${alarm.alarmHour}`===`${hours}:${minutes}`){
            alarmringtone.play();
            alarmringtone.loop=true
            
        }
    }
});
}

// function for creating a alarm
const createAlarm = (alarmobj)=>{
    const {id,alarmTime} = alarmobj;
    if(alarmTime){
        // creating div for alarm
    let alarmdiv = document.createElement("div");
    alarmdiv.classList.add("alarm");
    alarmdiv.setAttribute("date-id",id)
    alarmdiv.innerHTML=`<span>${alarmTime}</span>`;
   // creating input checkbox
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.addEventListener("click",(e)=>{
        if(e.target.checked){
            startAlarm(e);
        }else{
            stopAlarm(e);
        }
    });
    // this is for appending the chekbox in a div
    alarmdiv.appendChild(checkbox);
    
    const deletfunc = document.createElement("button");
    deletfunc.innerHTML=`<i class="fa-solid fa-trash"></i>`;
    deletfunc.classList.add("deleteButton");
    deletfunc.addEventListener("click",(e)=>
    
         deleteAlarm(e)
    )
    alarmdiv.appendChild(deletfunc);
    activealarms.appendChild(alarmdiv);
}
}
// button fuctionality for seting a alarm
setAlarm.addEventListener("click",()=>{
    alarmIndex +=1;

    let alarmObj ={};
    alarmObj.id = `${alarmIndex}_${hrinput.value}`;
    alarmObj.alarmTime = hrinput.value;
    
    alarmObj.isActive = false;
    console.log(alarmObj);
    alarmcollect.push(alarmObj);
    createAlarm(alarmObj);
    
    
});



// function for activating a alarm
const startAlarm=(e)=>{
    let searchId = e.target.parentElement.getAttribute("date-id");
    console.log(searchId);
    let [exits,obj,index] = searchObject("id",searchId);
    
    if(exits){
      alarmcollect[index].isActive = true;
      
    }
}
// function for stopping a alarm
const stopAlarm = (e)=>{
    let searchId = e.target.parentElement.getAttribute("date-id");
    let [exits,obj,index] = searchObject("id",searchId);
    if(exits){
      alarmcollect[index].isActive = false;
      alarmringtone.pause();
    }
}
// function for deleing a alarm
const deleteAlarm = (e)=>{
    let searchId = e.target.parentElement.parentElement.getAttribute("date-id");
    console.log(searchId)
    let [exits,obj,index] = searchObject("id",searchId);
    if(exits){
      e.target.parentElement.parentElement.remove();
      alarmcollect.splice(index,1);
    }
}

window.onload=()=>{
    setInterval(displayTime);
    ihour=0;
    iminute=0;
    alarmIndex=0;
    alarmcollect=[];
    
    
}