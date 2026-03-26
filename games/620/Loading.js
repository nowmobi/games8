// loading js v 0.0.2

var x = document.getElementsByTagName("BODY")[0];
x.innerHTML += `
<style>
 @import url(https://fonts.googleapis.com/css?family=Open+Sans:600);
body {
  user-select: none !important;
    -moz-user-select: none !important;
    -khtml-user-select: none !important;
    -webkit-user-select: none !important;
    -o-user-select: none !important;
}
h2 {
  position: absolute;
  font-family: "sans-serif";
  font-weight: 600;
  font-size: 15px;
  left: 50%;
  top: 53%;
  margin-left: -15px;
    color: #ffbf09;
}
.bbody {
  position: absolute;
  top: 50%;
  margin-left: -50px;
  left: 50%;
  animation: speeder 0.4s linear infinite;
}
.bspan{
    height: 5px;
    width: 35px;
    background: #ffbf09;
    position: absolute;
    top: -19px;
    left: 60px;
    border-radius: 2px 10px 1px 0;
  }
.basespan{
    position: absolute;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-right: 100px solid #ffbf09;
    border-bottom: 6px solid transparent;
  }
.basespan::after{
    content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-top: 0 solid transparent;
      border-right: 55px solid #ffbf09;
      border-bottom: 16px solid transparent;
      top: -16px;
      right: -98px;
}
.basespan::before{
     content: "";
      height: 22px;
      width: 22px;
      border-radius: 50%;
      background: #ffbf09;
      position: absolute;
      right: -110px;
      top: -16px;
}
.face {
  position: absolute;
  height: 12px;
  width: 20px;
  background: #ffbf09;
  border-radius: 20px 20px 0 0;
  transform: rotate(-40deg);
  right: -125px;
  top: -15px;
}
.face::after {
    content: "";
    height: 12px;
    width: 12px;
    background: #ffbf09;
    right: 4px;
    top: 7px;
    position: absolute;
    transform: rotate(40deg);
    transform-origin: 50% 50%;
    border-radius: 0 0 0 2px;
  }
.bspan1, .bspan2, bspan3, bspan4{
  width: 30px;
  height: 1px;
  background: #ffbf09;
  position: absolute;
  animation: fazer1 0.2s linear infinite;
}
.bspan2 {
  top: 3px;
  animation: fazer2 0.4s linear infinite;
}
.bspan3 {
  top: 1px;
  animation: fazer3 0.4s linear infinite;
  animation-delay: -1s;
}
.bspan4 {
  top: 4px;
  animation: fazer4 1s linear infinite;
  animation-delay: -1s;
}
@keyframes fazer1 {
  0% {
    left: 0;
  }
  100% {
    left: -80px;
    opacity: 0;
  }
}
@keyframes fazer2 {
  0% {
    left: 0;
  }
  100% {
    left: -100px;
    opacity: 0;
  }
}
@keyframes fazer3 {
  0% {
    left: 0;
  }
  100% {
    left: -50px;
    opacity: 0;
  }
}
@keyframes fazer4 {
  0% {
    left: 0;
  }
  100% {
    left: -150px;
    opacity: 0;
  }
}
@keyframes speeder {
  0% {
    transform: translate(2px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -3px) rotate(-1deg);
  }
  20% {
    transform: translate(-2px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 3px) rotate(-1deg);
  }
  60% {
    transform: translate(-1px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-2px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(2px, 1px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
.longfazers {
  position: absolute;
  width: 100%;
  height: 100%;
}
.longfazers > span{
 
    position: absolute;
    height: 2px;
    width: 20%;
    background: #ffbf09;
}
.lspan1 {
      top: 20%;
      animation: lf 0.6s linear infinite;
      animation-delay: -5s;
 }
.lspan2 {
      top: 40%;
      animation: lf2 0.8s linear infinite;
      animation-delay: -1s;
 }
.lspan3 {
     top: 70%;
      animation: lf3 0.6s linear infinite;
 }
.lspan4 {
     top: 80%;
      animation: lf4 0.5s linear infinite;
      animation-delay: -3s;
 }
@keyframes lf {
  0% {
    left: 200%;
  }
  100% {
    left: -200%;
    opacity: 0;
  }
}
@keyframes lf2 {
  0% {
    left: 200%;
  }
  100% {
    left: -200%;
    opacity: 0;
  }
}
@keyframes lf3 {
  0% {
    left: 200%;
  }
  100% {
    left: -100%;
    opacity: 0;
  }
}
@keyframes lf4 {
  0% {
    left: 200%;
  }
  100% {
    left: -100%;
    opacity: 0;
  }
}</style>
    
    <div class="Loading">
    <div class='bbody'>
  <span class='bspan'>
   <span class='bspan1'></span>
  <span class='bspan2'></span>
  <span class='bspan3'></span>
  <span class='bspan4'></span>
  </span>
  <div class='base'>
    <span class='basespan'></span>
    <div class='face'></div>
  </div>
</div>
    <div class='longfazers'>
  <span class='lspan1'></span>
  <span class='lspan2'></span>
  <span class='lspan3'></span>
  <span class='lspan4'></span>
</div>
    <h2>Loading</h2>
    </div>`;
          
//--------------------------------------------------------------Google Analytics---------------------------------------------------
// Google Analytics
const Analytics = document.createElement('script');
     Analytics.setAttribute("async", "");
    Analytics.src = 'https://www.googletagmanager.com/gtag/js?id=G-F52QBK293J';
    document.getElementsByTagName('head')[0].appendChild(Analytics);
    
const Analytics_script = document.createElement('script');
    
    Analytics_script.innerHTML = `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F52QBK293J');`;
          document.getElementsByTagName('head')[0].appendChild(Analytics_script);
          console.log('%c Analytics Added  ' , 'background: #000000; color: #bada55');
// Arrow_Key_Lock
const Arrow_Key_Lock = document.createElement('script');
Arrow_Key_Lock.innerHTML = `window.addEventListener("keydown", function(e) {
 if([32, 37, 38, 39, 40, 65, 87,83, 68].indexOf(e.keyCode) > -1) {
 e.preventDefault();
 }
}, false);`;
 document.getElementsByTagName('head')[0].appendChild(Arrow_Key_Lock)  
 
 
