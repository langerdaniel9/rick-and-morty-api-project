const navButton = document.querySelector(".nav-button");
const navOpen = document.querySelector("nav-open");

//const tween = TweenLite.to(object, time, {animate})

/*const tween = TweenLite.to('cover', 1, {
    width: "60%"
})*/

const tl = new TimelineLite({ paused: true });

tl.to(".cover", 1, {
  width: "65%",
  ease: Power2.easeOut,
}).to(
  "nav",
  1,
  {
    height: "100%",
    ease: Power2.easeOut,
  },
  "-=0.5"
);

navButton.addEventListener("click", () => {
  tl.play();
});
