// src/utils/scrollup.js
export function scrollingUp(offset = 400, delay = 50, containerSelector = "body") {
  setTimeout(() => {
    const container =
      document.querySelector(containerSelector) || document.body;

    container.scrollBy({
      top: offset,
      behavior: "smooth",
    });
  }, delay);
}
