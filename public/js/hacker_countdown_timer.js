function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var countdown_div = document.getElementById('countdown_div');
  var hoursSpan = document.getElementById('hours');
  var minutesSpan = document.getElementById('minutes');
  var secondsSpan = document.getElementById('seconds');
  var info_heading = document.getElementById('info_heading');

  function updateClock() {
    var t = getTimeRemaining(endtime);
      console.log(t.days);
    if(t.days > 0){
        countdown_div.style.display = 'none';
        info_heading.innerHTML = 'Countdown will begin at Noon!';
    }else{
        countdown_div.style.display = 'inline-block';
        info_heading.innerHTML = 'Time Remaining';
    }
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date("February 25, 2018 12:00:00")));
window.onload = function() {
    initializeClock('countdown_div', deadline);
}
