// Update the cursor once per display frame, using the latest pointer position.
const cursor = document.querySelector(".cursor");
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

// Each project's own image keeps its aspect ratio and stays inside the viewport.
let previewElement = null;
let previewImage = null;
let previewFrame = null;
let previewX = 0;
let previewY = 0;
let previewWidth = 0;
let previewHeight = 0;

function renderPreview() {
  previewFrame = null;
  if (!previewElement || !previewWidth || !previewHeight) return;
  const edge = 12;
  const offset = 18;
  let x = previewX + offset;
  let y = previewY + offset;
  if (x + previewWidth > window.innerWidth - edge) x = previewX - offset - previewWidth;
  if (y + previewHeight > window.innerHeight - edge) y = previewY - offset - previewHeight;
  x = Math.max(edge, Math.min(x, window.innerWidth - previewWidth - edge));
  y = Math.max(edge, Math.min(y, window.innerHeight - previewHeight - edge));
  previewElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  previewElement.style.visibility = "visible";
}

function queuePreview() {
  if (previewFrame === null) previewFrame = requestAnimationFrame(renderPreview);
}

function fitPreview() {
  if (!previewImage?.naturalWidth || !previewImage.naturalHeight) return;
  const scale = Math.min(
    1,
    Math.max(1, Math.min(420, window.innerWidth - 24)) / previewImage.naturalWidth,
    window.innerHeight * 0.5 / previewImage.naturalHeight
  );
  previewWidth = previewImage.naturalWidth * scale;
  previewHeight = previewImage.naturalHeight * scale;
  previewElement.style.width = `${previewWidth}px`;
  previewElement.style.height = `${previewHeight}px`;
  queuePreview();
}

function movePreview(event) {
  previewX = event.clientX;
  previewY = event.clientY;
  queuePreview();
}

function showImage(event) {
  hideImage();
  if (event.pointerType !== "mouse") return;
  previewElement = event.currentTarget.querySelector(".image-container");
  if (!previewElement) return;
  previewImage = previewElement.matches("img") ? previewElement : previewElement.querySelector("img");
  if (!previewImage) {
    previewElement = null;
    return;
  }
  previewX = event.clientX;
  previewY = event.clientY;
  previewElement.style.visibility = "hidden";
  previewElement.style.display = "block";
  previewImage.addEventListener("load", fitPreview, { once: true });
  fitPreview();
  document.addEventListener("pointermove", movePreview, { passive: true });
}

function hideImage() {
  if (previewFrame !== null) cancelAnimationFrame(previewFrame);
  previewFrame = null;
  if (previewElement) {
    previewElement.style.display = "none";
    previewElement.style.visibility = "hidden";
  }
  previewImage?.removeEventListener("load", fitPreview);
  previewElement = null;
  previewImage = null;
  previewWidth = 0;
  previewHeight = 0;
  document.removeEventListener("pointermove", movePreview);
}

window.addEventListener("resize", () => {
  if (previewElement) fitPreview();
});
window.addEventListener("scroll", hideImage, { passive: true });
window.addEventListener("blur", hideImage);
window.addEventListener("pagehide", hideImage);
document.documentElement.addEventListener("pointerleave", hideImage);
