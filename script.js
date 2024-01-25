const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function circlecpataKaro(){
  var xscale =1;
  var yscale =1;

  var xprev =0;
  var yprev =0;

  window.addEventListener("mousemove",function(dets){
    this.clearTimeout(timeout);
    xscale=gsap.utils.clamp(.8, 1.2, dets.clientX - xprev)
    yscale=gsap.utils.clamp(.8, 1.2, dets.clientY - xprev)

    xprev=dets.clientX;
    xprev=dets.clientY;

    circleMouseFollower(xscale , yscale);

    timeout = this.setTimeout(function(){
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`
    },100)

  })
}

function firstpageAnimation(){
  var t1   =gsap.timeline();

  t1.from("#nav",{
    y:'-10',  
    opacity:0,
    duration:1.5,
    ease: Expo.easeInout
  })
   .to(".boundingelem",{
    y:0,
    ease:Expo.easeInout,
    duration:2, // all come together for that we use stagger
    delay:-1,
    stagger:.2  // 
  })
  .from("#heroFooter",{
    y:'-10',  
    opacity:0,  
    duration:1.5,
    delay: -1,
    ease: Expo.easeInout
  })
}


function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function(dets) {
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}


document.querySelectorAll(".elem").forEach(function(elem){
  var rotate =0;
  var diffrot =0;

  elem.addEventListener("mouseleave",function(dets){ 
    gsap.to(elem.querySelector("img"),{
      opacity:0,
      ease:Power3,
      duration:0.5
    });
  });



  elem.addEventListener("mousemove",function(dets){
    var diff =dets.clientY -elem.getBoundingClientRect().top;
    diffrot= dets.clientX -rotate;
    rotate = dets.clientX;     
    gsap.to(elem.querySelector("img"),{
      opacity:1,
      ease:Power3,
      top:diff,
      left:dets.clientX,
      rotate: gsap.utils.clamp(-20,20,diffrot*0.5)
    });
  });
});


circlecpataKaro()
firstpageAnimation();
circleMouseFollower();



