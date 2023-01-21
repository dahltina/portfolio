// check if touch screen
isTouchDevice = () => {
  return ( 'ontouchstart' in window ) ||
    ( navigator.maxTouchPoints > 0 ) ||
    ( navigator.msMaxTouchPoints > 0 );
};

// cursor
document.body.addEventListener("mousemove", event => {
  const x = event.clientX;
  const y = event.clientY;

  gsap.set(".cursor", {
    x: x,
    y: y,
  })
})

// hover links
let links = Array.from(document.querySelectorAll(".link"));
let cursor = document.querySelector(".cursor");

links.forEach(link => {
  link.addEventListener("mouseover", () => {
    cursor.classList.add("grow");
  })
})

links.forEach(link => {
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("grow");
  })
})

// hide cursor if touch screen
if(isTouchDevice) {
  cursor.style.pointerEvents = "none";
  cursor.style.display = "none";
}

// animate h1
gsap.from(".h1-animated", {
  duration: 0.8,
  opacity: 0,
  scale: 0.8,
  ease: "back"
}, "+=1")

// show image on hover
let attached = false;
let imageContainer = document.querySelector(".image-container");

const mouseMove = (event) => {
  imageContainer.style.left = event.pageX + "px";
  imageContainer.style.top = event.pageY + "px";
  console.log("hover");
}

function showImage(src) {
  if (!attached) {
    attached = true;
    imageContainer.src = src;
    imageContainer.style.display = "block";
    document.addEventListener("pointermove", mouseMove);
  }
  if (isTouchDevice) {
    imageContainer.style.display = "none";
  }
}

function hideImage() {
  attached = false;
  imageContainer.style.display = "";
  document.removeEventListener("pointermove", mouseMove);
}
