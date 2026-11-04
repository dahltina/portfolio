// Update the cursor once per display frame, using the latest pointer position.
const cursor = document.querySelector(".cursor");
let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
let cursorFrame = null;
let cursorX = 0;
let cursorY = 0;

function renderCursor() {
  cursorFrame = null;
  cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
  cursor.classList.add("is-visible");
}

function moveCursor(event) {
  if (!cursor || event.pointerType !== "mouse") return;
  cursorX = event.clientX;
  cursorY = event.clientY;
  if (cursorFrame === null) {
    cursorFrame = requestAnimationFrame(renderCursor);
  }
}

function hideCursor() {
  if (cursorFrame !== null) {
    cancelAnimationFrame(cursorFrame);
    cursorFrame = null;
  }
  cursor?.classList.remove("is-visible", "grow");
}

document.addEventListener("pointermove", moveCursor, { passive: true });
document.documentElement.addEventListener("pointerleave", hideCursor);
window.addEventListener("blur", hideCursor);
window.addEventListener("pagehide", hideCursor);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) hideCursor();
});

// Enter/leave avoids repeatedly changing hover state over a link's children.
document.querySelectorAll(".link").forEach(link => {
  link.addEventListener("pointerenter", event => {
    if (event.pointerType !== "mouse" || !cursor) return;
    cursor.classList.add("grow");
    moveCursor(event);
  });
  link.addEventListener("pointerleave", () => {
    cursor?.classList.remove("grow");
  });
});

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
}

function showImage(src) {
  if (!attached) {
    attached = true;
    imageContainer.src = src;
    imageContainer.style.display = "block";
    document.addEventListener("pointermove", mouseMove);
  }
  if (supportsTouch) {
    imageContainer.style.display = "none";
  }
}

function hideImage() {
  attached = false;
  imageContainer.style.display = "";
  document.removeEventListener("pointermove", mouseMove);
}
