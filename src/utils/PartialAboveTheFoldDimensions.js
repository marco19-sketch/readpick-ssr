// to use in the console to see the dimension (height) of an element that is
// partially above the fold.

const el = document.querySelector(".single-book");
const rect = el.getBoundingClientRect();

const visibleHeight =
  Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

console.log("Visible height:", visibleHeight);
