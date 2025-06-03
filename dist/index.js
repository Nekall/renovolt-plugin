// src/hello.js
function hi() {
  console.log("Hello World !");
}

// src/utils/format.js
function formatText(text) {
  return `[RENOVOLT] ${text}`;
}

// src/index.js
hi();
console.log(formatText("Renovolt loaded."));
