
/***  
 * This function is to create days boxes dynamically as it depend on date we are setting.
 * if are setting 05/04/2024, the days would be 4 digit number = 4 boxes
 ***/

function createDaysContent(data){  
  var clock = document.getElementById("countDown");
  var daysContainer = clock.querySelector('.daysContainer');
  var daysLength =  data.toString().length;
  var days =  data.toString().split('');

  for(var i=0;i<daysLength;i++){
    var x = document.createElement("span");
    x.id = "daysSpan"+i;
    x.className="daysSpan";
    daysContainer.appendChild(x);
  }
}

/***  This function is to fill days boxes ***/
function fillDaysContent(len, data) {
  var totalDays =  data.toString().split('');
  for(var i=0;i<len;i++){
    var x = document.getElementById("daysSpan"+i);
    x.innerHTML = totalDays[i];
    
  }
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  
  var seconds = t<0 ? 00 : Math.floor((t / 1000) % 60);
  var minutes = t<0 ? 00 :Math.floor((t / 1000 / 60) % 60);
  var hours = t<0 ? 00 : Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = t<0 ? 00 : Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

/*** Intializing the countDown ***/
function initializeCountDown(id, endtime) {
  var clock = document.getElementById(id);
  var time = getTimeRemaining(endtime);

  var daysContainer = clock.querySelector('.daysContainer');
  var hoursSpan1 = clock.querySelector('.hoursCountDown1');
  var hoursSpan2 = clock.querySelector('.hoursCountDown2');
  var minutesSpan1 = clock.querySelector('.minutesCountDown1');
  var minutesSpan2 = clock.querySelector('.minutesCountDown2');
  var secondsSpan1 = clock.querySelector('.secondsCountDown1');
  var secondsSpan2 = clock.querySelector('.secondsCountDown2');

  createDaysContent(time.days);

  var y = document.createElement("div")
  y.className = "timeLabel";
  y.innerHTML = "Days";
  daysContainer.appendChild(y);
  

  function updateCountDown() {
    var time = getTimeRemaining(endtime);
    var daysLength =  time.days.toString().length;
    var hourLength = time.hours.toString().length;
    var minLength = time.minutes.toString().length;
    var secLength = time.seconds.toString().length; // check length for seconds whether it is one/two digit number
    
    fillDaysContent(daysLength,time.days);
    hoursSpan1.innerHTML = (hourLength === 1) ? ('0' + time.hours).slice(0,1) : ('0' + time.hours).slice(1,2);
    hoursSpan2.innerHTML = ('0' + time.hours).slice(-1);
    minutesSpan1.innerHTML = (minLength === 1) ? ('0' + time.minutes).slice(0,1) : ('0' + time.minutes).slice(1,2);
    minutesSpan2.innerHTML = ('0' + time.minutes).slice(-1);
    secondsSpan1.innerHTML = (secLength === 1) ? ('0' + time.seconds).slice(0,1) : ('0' + time.seconds).slice(1,2);
    secondsSpan2.innerHTML = ('0' + time.seconds).slice(-1);

    if (time.total <= 0) {
      var message = document.getElementById("message");
      message.style.display = 'block';
      clearInterval(timeinterval);
    }
  
  }

  updateCountDown();
  var timeinterval = setInterval(updateCountDown, 1000);
}

var deadline = new Date('05/25/2020');
initializeCountDown('countDown', deadline);
