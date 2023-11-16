let book = document.querySelector(".book");
let pageOne = document.querySelector(".page.one");
let pageOneH = document.querySelector(".page.one h1");
let pageOneName = document.querySelector(".page.one .name");
let pageOneBallons = document.querySelectorAll(".page.one .ballon");
let ballons = document.querySelectorAll(".container > .ballon");
let ballonSound = new Audio("./music/ballon.mp3");
ballonSound.preload = "auto";
let bookSound = new Audio("./music/book_page.mp3");
bookSound.preload = "auto";
let music = new Audio("./music/birthday.m4a");
music.preload = "auto";
let userInteracted = false;

// Function to play music
function playMusic() {
  if (!userInteracted) {
    music
      .play()
      .then(() => {
        console.log("Music playback started");
      })
      .catch((error) => {
        console.error("Failed to play music:", error);
      });
    userInteracted = true;
  }
}
// Event listeners for user interaction
document.addEventListener("click", playMusic);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    music.muted = true;
  } else {
    music.muted = false;
  }
});
function sizeChanger(size) {
  if (size.matches) {
    book.style.transform = `perspective(2500px) scale(${
      size.media[12] === "4" ? "0.9" : size.media[12] === "3" ? "0.7" : "1"
    })`;
  } else {
    book.style.transform = `perspective(2500px) scale(1)`;
  }
}
function sizeChangerOnOpen(size) {
  if (size.matches) {
    book.style.transform = `perspective(2500px) scale(${
      size.media[12] === "4" ? "0.9" : size.media[12] === "3" ? "0.7" : "1"
    }) rotate(5deg)`;
  } else {
    book.style.transform = `perspective(2500px) scale(1) rotate(5deg)`;
  }
}
function sizeChangerOnClose(size) {
  if (size.matches) {
    book.style.transform = `perspective(2500px) scale(${
      size.media[12] === "4" ? "0.9" : size.media[12] === "3" ? "0.7" : "1"
    }) rotate(0deg)`;
  } else {
    book.style.transform = `perspective(2500px) scale(1) rotate(0deg)`;
  }
}

book.onclick = () => {
  if (book.getAttribute("opend") === "false") {
    bookSound.play();
    music.volume = "0.2";
    let sizebook = window.matchMedia("(max-width: 400px)");
    sizeChangerOnOpen(sizebook);
    sizebook.addEventListener("change", sizeChangerOnOpen);
    let sizebook2 = window.matchMedia("(max-width: 300px)");
    sizeChangerOnOpen(sizebook2);
    sizebook2.addEventListener("change", sizeChangerOnOpen);
    book.style.boxShadow = "inset 100px 20px 100px rgba(0, 0, 0, .2)";
    pageOne.style.transform = "rotateY(-140deg)";
    pageOneH.style.opacity = "0";
    pageOneName.style.opacity = "0";
    pageOneBallons.forEach((b) => {
      b.firstChild.style.transition = "0.3s";
      b.firstChild.style.opacity = "0";
    });
    book.setAttribute("opend", "true");
  } else {
    music.volume = "1";
    let sizebookclose = window.matchMedia("(max-width: 400px)");
    sizeChangerOnClose(sizebookclose);
    sizebookclose.addEventListener("change", sizeChangerOnClose);
    let sizebookclose2 = window.matchMedia("(max-width: 300px)");
    sizeChangerOnClose(sizebookclose2);
    sizebookclose2.addEventListener("change", sizeChangerOnClose);
    book.style.boxShadow = "none";
    pageOne.style.transform = "rotateY(0deg)";
    setTimeout(() => {
      pageOneH.style.opacity = "1";
      pageOneName.style.opacity = "1";
      pageOneBallons.forEach((b) => {
        b.firstChild.style.transition = "0.3s";
        b.firstChild.style.opacity = "1";
      });
    }, 180);
    book.setAttribute("opend", "false");
  }
};
ballons.forEach((ballon) => {
  ballon.onclick = () => {
    ballonSound.play();
    ballon.style.animation = "ballonUp 2s forwards ease-in";
    ballon.setAttribute("up", "");
    let ballonsNumber = 0;
    ballons.forEach((ballon) => {
      ballon.hasAttribute("up") ? ballonsNumber++ : "";
    });
    if (ballonsNumber === 4) {
      setTimeout(() => {
        book.style.transition = "1s";
        let size1 = window.matchMedia("(max-width: 400px)");
        sizeChanger(size1);
        size1.addEventListener("change", sizeChanger);
        let size2 = window.matchMedia("(max-width: 300px)");
        sizeChanger(size2);
        size2.addEventListener("change", sizeChanger);
        pageOneBallons[0].style.animation = "ballonOneUp 3s forwards ease-out";
        setTimeout(() => {
          pageOneBallons[0].style.animation =
            "ballonOne 3s infinite ease-in-out alternate";
        }, 3000);
      }, 1000);
    }
  };
});
