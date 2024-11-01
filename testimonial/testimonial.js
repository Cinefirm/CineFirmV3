import { stories } from "./data.js";

let activeStory = 0;
const storyDuration = 4000;
const contentUpdateDelay = 0.4;
let direction = "next";
let storyTimeout;

const cursor = document.querySelector(".cursor");
const cursorText = cursor.querySelector("p");

function resetIndexHighlight(index, currentDirection) {
  const highlight = document.querySelectorAll(".index .index-highlight")[index];
  gsap.killTweensOf(highlight);
  gsap.to(highlight, {
    width: currentDirection === "next" ? "100%" : "0%",
    duration: 0.3,
    onStart: () => {
      gsap.to(highlight, {
        transformOrigin: "right center",
        scaleX: 0,
        duration: 0.3,
      });
    },
  });
}

function animateIndexHighlight(index) {
  const highlight = document.querySelectorAll(".index .index-highlight")[index];
  gsap.set(highlight, {
    width: "0%",
    scaleX: 1,
    transformOrigin: "right center",
  });
  gsap.to(highlight, {
    width: "100%",
    duration: storyDuration / 1000,
    ease: "none",
  });
}

function animateNewImage(imgContainer, currentDirection) {
  gsap.set(imgContainer, {
    clipPath:
      currentDirection === "next"
        ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
        : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  });
  gsap.to(imgContainer, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
    ease: "power4.inOut",
  });
}

function animateImageScale(currentImg, upcomingImg, currentDirection) {
  gsap.fromTo(
    currentImg,
    { scale: 1, rotate: 0 },
    {
      scale: 2,
      rotate: currentDirection === "next" ? -25 : 25,
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        currentImg.parentElement.remove();
      },
    }
  );
  gsap.fromTo(
    upcomingImg,
    { scale: 2, rotate: currentDirection === "next" ? 25 : -25 },
    { scale: 1, rotate: 0, duration: 1, ease: "power4.inOut" }
  );
}

function cleanUpElements() {
  const profileNameDiv = document.querySelector(".profile-name");
  const titleRows = document.querySelectorAll(".title-row");

  while (profileNameDiv.childElementCount > 2) {
    profileNameDiv.removeChild(profileNameDiv.firstChild);
  }

  titleRows.forEach((titleRow) => {
    while (titleRow.childElementCount > 2) {
      titleRow.removeChild(titleRow.firstChild);
    }
  });
}

function changeStory(isAutomatic = true) {
  const previousStory = activeStory;
  const currentDirection = isAutomatic ? "next" : direction;

  if (currentDirection === "next") {
    activeStory = (activeStory + 1) % stories.length;
  } else {
    activeStory = (activeStory - 1 + stories.length) % stories.length;
  }

  console.log(`Changing story from ${previousStory} to ${activeStory}`);

  const story = stories[activeStory];

  gsap.to(".profile-name p", {
    y: currentDirection === "next" ? -24 : 24,
    duration: 0.5,
    delay: contentUpdateDelay,
  });
  gsap.to(".title-row h1", {
    y: currentDirection === "next" ? -48 : 48,
    duration: 0.5,
    delay: contentUpdateDelay,
  });

  const currentImgContainer = document.querySelector(".story-img .img");
  const currentImg = currentImgContainer.querySelector("img");

  setTimeout(() => {
    const newProfileName = document.createElement("p");
    newProfileName.innerText = story.profileName;
    newProfileName.style.transform =
      currentDirection === "next" ? "translateY(24px)" : "translateY(-24px)";

    const profileNameDiv = document.querySelector(".profile-name");
    profileNameDiv.appendChild(newProfileName);

    gsap.to(newProfileName, {
      y: 0,
      duration: 0.5,
      delay: contentUpdateDelay,
    });

    const titleRows = document.querySelectorAll(".title-row");
    story.title.forEach((line, index) => {
      if (titleRows[index]) {
        const newTitle = document.createElement("h1");
        newTitle.innerText = line;
        newTitle.style.transform =
          currentDirection === "next"
            ? "translateY(48px)"
            : "translateY(-48px)";
        titleRows[index].appendChild(newTitle);

        gsap.to(newTitle, {
          y: 0,
          duration: 0.5,
          delay: contentUpdateDelay,
        });
      }
    });

    const newImgContainer = document.createElement("div");
    newImgContainer.classList.add("img");
    const newStoryImg = document.createElement("img");
    newStoryImg.src = story.storyImg;
    newStoryImg.alt = story.profileName;
    newImgContainer.appendChild(newStoryImg);

    const storyImgDiv = document.querySelector(".story-img");
    storyImgDiv.appendChild(newImgContainer);

    animateNewImage(newImgContainer, currentDirection);

    const upcomingImg = newStoryImg;
    animateImageScale(currentImg, upcomingImg, currentDirection);

    resetIndexHighlight(previousStory, currentDirection);
    animateIndexHighlight(activeStory);

    cleanUpElements();

    clearTimeout(storyTimeout);
    storyTimeout = setTimeout(() => changeStory(true), storyDuration);
  }, 200);

  setTimeout(() => {
    const profileImg = document.querySelector(".profile-icon img");
    profileImg.src = story.profileImg;

    const link = document.querySelector(".link a");
    link.textContent = story.linkLabel;
    link.href = story.linkSrc;
  }, 600);
}

document.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;
  gsap.to(cursor, {
    x: clientX - cursor.offsetWidth / 2,
    y: clientY - cursor.offsetHeight / 2,
    ease: "power2.out",
    duration: 0.3,
  });

  const viewportWidth = window.innerWidth;
  if (clientX < viewportWidth / 2) {
    cursorText.textContent = "Prev";
    direction = "prev";
  } else {
    cursorText.textContent = "Next";
    direction = "next";
  }
});

document.addEventListener("click", () => {
  clearTimeout(storyTimeout);
  resetIndexHighlight(activeStory, direction);
  changeStory(false);
});

storyTimeout = setTimeout(() => changeStory(true), storyDuration);
animateIndexHighlight(activeStory);
