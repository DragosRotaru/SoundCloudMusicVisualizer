//**************************************
// Dragos Rotaru April 20, 2016
// DoctorBondage.com
// Landing page code
//**************************************

// Title canvas Code

var c = document.createElement('canvas'),
  ctx = c.getContext('2d'),
  cw = c.width = 1000,
  ch = c.height = 80,
  messageString = 'W E L C O M E  T O  R E A L I T Y  2 . 0',
  messageArray = messageString.split(''),
  messageLength = messageArray.length,
  pointer = 0,
  typeTick = 0,
  typeTickMax = 2,
  typeResetTick = 0,
  typeResetMax = 140;

ctx.font = 'bold 50px Helvetica';
ctx.textAlign = 'left';
ctx.textBaseline = 'top';
ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
ctx.shadowColor = 'red';

function updateTypeTick() {
  if (pointer < messageLength) {
    if (typeTick < typeTickMax) {
      typeTick++;
    } else {
      typeTick = 0;
      pointer++;
    }
  } else {

  }
}

function renderMessage() {
  var text = messageArray.slice(0, pointer);
  ctx.shadowBlur = 10;
  ctx.fillStyle = 'hsla(0, 100%, 50%, 0.65)';
  var x = 20,
    y = 20;

  if (Math.random() < 0.05) {
    ctx.fillStyle = 'hsla(0, 0%, 0%, ' + (0.25 + Math.random() * 0.5) + ')';
  }
  if (Math.random() < 0.1) {
    x += -3 + Math.random() * 6;
  }
  if (Math.random() < 0.1) {
    y += -3 + Math.random() * 6;
  }
  if (Math.random() < 0.99) {
    ctx.fillText(text.join(''), Math.round(x), Math.round(y));
  }
  ctx.shadowBlur = 0;
}

function renderLines() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.beginPath();
  for (var i = 0; i < ch / 2; i += 1) {
    ctx.moveTo(0, (i * 2) + .5);
    ctx.lineTo(cw, (i * 2) + .5);
  }
  ctx.stroke();
  ctx.globalCompositeOperation = 'lighter';
}

function loop() {
  requestAnimationFrame(loop);
  //ctx.clearRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = 'lighter';
  updateTypeTick();
  renderMessage();
  renderLines();
}

document.body.appendChild(c);
document.getElementById('title').appendChild(c);
loop();


// preload progress bar, enter button code

var progressInterval;
var progressCounter = 0;

function updateProgressBar() {
  $("li.inprogress").toggleClass("doneprogress");
  var next = $("li.inprogress").next();
  $("li.inprogress").toggleClass("inprogress");
  next.toggleClass("inprogress");
  progressCounter++;
  if (progressCounter == 5){
    clearInterval(progressInterval);
    $("#progressBar").hide();
    $("#enter").show();
  }
}


$("#enter").on("click", function init() {
  $("#welcome").remove();
  addToPlaylist("Late - Practice", "https://api.soundcloud.com/tracks/270367781/stream?client_id=f779495a78ca840a61a1f499d830f11e");
  play($("#playlist li:first"));
  setInterval(draw, 1);
});


$(document).ready(function(){
    progressInterval = setInterval(updateProgressBar,5000);
});
