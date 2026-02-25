// We can have static constants and reuse them in the animations , e.g.:
// * animation specs
const ANIMATION_DURATION_DEFAULT = 0.3;
const ANIMATION_DURATION_LONG = 0.4;
const ANIMATION_EASE_DEFAULT = "none";
const ANIMATION_INITIAL_POSITION = 0;
const ANIMATION_MOVE_DISTANCE_IN_PERCENT = 120;
const ANIMATION_MOVE_DISTANCE_FROM_RIGHT_IN_PERCENT = -200;

//
const DESKTOP_MEDIA_QUERY = "(min-width: 1200px)";

const ANIMATION_DIRECTIONS = {
  up: "up",
  down: "down",
};

// #region Refactored Code
export const clearXPosition = (target) =>
  gsap.to(target, {
    xPercent: ANIMATION_INITIAL_POSITION,
    repeat: 0,
    ease: ANIMATION_EASE_DEFAULT,
    duration: ANIMATION_DURATION_LONG,
  });

export const clearYPosition = (target) =>
  gsap.to(target, {
    yPercent: ANIMATION_INITIAL_POSITION,
    repeat: 0,
    ease: ANIMATION_EASE_DEFAULT,
    duration: ANIMATION_DURATION_LONG,
  });

export const moveLeft = (target) =>
  gsap.to(target, {
    xPercent: -ANIMATION_MOVE_DISTANCE_IN_PERCENT,
    repeat: 0,
    ease: ANIMATION_EASE_DEFAULT,
    duration: ANIMATION_DURATION_DEFAULT,
  });

export const moveRight = (target) =>
  gsap.to(target, {
    xPercent: ANIMATION_MOVE_DISTANCE_IN_PERCENT,
    repeat: 0,
    ease: ANIMATION_EASE_DEFAULT,
    duration: ANIMATION_DURATION_DEFAULT,
  });

export const moveTop = (target) =>
  gsap.to(target, {
    yPercent: -ANIMATION_MOVE_DISTANCE_IN_PERCENT,
    repeat: 0,
    ease: ANIMATION_EASE_DEFAULT,
    duration: ANIMATION_DURATION_DEFAULT,
  });

export const moveFromLeft = (target) =>
  gsap.from(target, {
    xPercent: ANIMATION_MOVE_DISTANCE_IN_PERCENT,
    repeat: 0,
    ease: ANIMATION_EASE_DEFAULT,
    duration: ANIMATION_DURATION_DEFAULT,
  });

export const moveFromRight200 = (target) =>
  gsap.from(target, {
    xPercent: ANIMATION_MOVE_DISTANCE_FROM_RIGHT_IN_PERCENT,
    repeat: 0,
    ease: ANIMATION_EASE_DEFAULT,
    duration: ANIMATION_DURATION_LONG,
  });

// ===============================================

function init(origin, destination, direction, trigger) {
  const isDesktopMedia = window.matchMedia(DESKTOP_MEDIA_QUERY).matches;

  // Abstract constants for better readability and maintainability
  const { up, down } = ANIMATION_DIRECTIONS;
  const cta = document.querySelector(".cta");
  const img = document.querySelector(".img");
  const block = document.querySelector(".block");
  const grid = document.querySelector(".grid");
  const container = document.querySelector(".container");
  const mobileText = document.querySelector(".mobile-text");

  // * I would somehow abstract this logic bellow to something readable with intentional name, or provide meaningful comments *
  // Ideally, have smth like SmallScreensAnimationLogic()
  if (origin.index == 0 && direction == down) {
    moveLeft(cta);
    moveRight(img);
  } else if (origin.index == 1 && direction == up) {
    clearXPosition(cta);
    clearXPosition(img);
  }

  // * I would somehow abstract this logic bellow to something readable with intentional name, or provide meaningful comments *
  if (origin.index == 1 && direction == down) {
    moveRight(grid);
  } else if (origin.index == 2 && direction == up) {
    clearXPosition(grid);
  }

  // * I would somehow abstract this logic bellow to something readable with intentional name, or provide meaningful comments *
  if (origin.index == 2 && direction == down) {
    moveRight(container);
    moveRight(mobileText);
  } else if (origin.index == 3 && direction == up) {
    clearXPosition(container);
    clearXPosition(mobileText);
  }

  // let's abstract condition for desktop media to make it more readable and maintainable, and avoid repeating the same condition multiple times in the code.
  // Ideally, have smth like desktopAnimationLogic()
  if (isDesktopMedia) {
    // * I would somehow abstract this logic bellow to something readable with intentional name, or provide meaningful comments *
    if (destination.index == 0 && direction == up) {
      clearXPosition(cta);
      clearXPosition(img);
      clearYPosition(block);
      clearXPosition(grid);
    }

    // * I would somehow abstract this logic bellow to something readable with intentional name, or provide meaningful comments *
    if (origin.index == 0 && direction == down) {
      moveTop(block);
      destination.item.classList.add("bg");
    } else if (origin.index == 1 && direction == up) {
      clearYPosition(block);
      origin.item.classList.remove("bg");
    }

    // * I would somehow abstract this logic bellow to something readable with intentional name, or provide meaningful comments *
    if (origin.index == 2 && direction == up) {
      destination.item.classList.add("bg");
    }
  }
}

// #endregion

// #region Original Code
// export const clearXPosition = (target) =>
//   gsap.to(target, {
//     xPercent: 0,
//     repeat: 0,
//     ease: "none",
//     duration: 0.4,
//   });

// export const clearYPosition = (target) =>
//   gsap.to(target, {
//     yPercent: 0,
//     repeat: 0,
//     ease: "none",
//     duration: 0.4,
//   });

// export const moveLeft = (target) =>
//   gsap.to(target, {
//     xPercent: -120,
//     repeat: 0,
//     ease: "none",
//     duration: 0.3,
//   });

// export const moveRight = (target) =>
//   gsap.to(target, {
//     xPercent: 120,
//     repeat: 0,
//     ease: "none",
//     duration: 0.3,
//   });

// export const moveTop = (target) =>
//   gsap.to(target, {
//     yPercent: -120,
//     repeat: 0,
//     ease: "none",
//     duration: 0.3,
//   });

// export const moveFromLeft = (target) =>
//   gsap.from(target, {
//     xPercent: 120,
//     repeat: 0,
//     ease: "none",
//     duration: 0.3,
//   });

// export const moveFromRight200 = (target) =>
//   gsap.from(target, {
//     xPercent: -200,
//     repeat: 0,
//     ease: "none",
//     duration: 0.4,
//   });

// // ===============================================

// function init(origin, destination, direction, trigger) {
//   const isDesktopMedia = window.matchMedia("(min-width: 1200px)").matches;

//   if (origin.index == 0 && direction == "down") {
//     moveLeft(document.querySelector(".cta"));

//     moveRight(document.querySelector(".mg"));
//   } else if (origin.index == 1 && direction == "up") {
//     clearXPosition(document.querySelector(".cta"));

//     clearXPosition(document.querySelector(".img"));
//   }

//   if (destination.index == 0 && direction == "up" && isDesktopMedia) {
//     clearXPosition(document.querySelector(".cta"));

//     clearXPosition(document.querySelector(".img"));

//     clearYPosition(document.querySelector(".block"));

//     clearXPosition(document.querySelector(".grid"));
//   }

//   if (origin.index == 0 && direction == "down" && isDesktopMedia) {
//     moveTop(document.querySelector(".block"));
//     destination.item.classList.add("bg");
//   } else if (origin.index == 1 && direction == "up" && isDesktopMedia) {
//     clearYPosition(document.querySelector(".block"));
//     origin.item.classList.remove("bg");
//   }

//   if (origin.index == 2 && direction == "up" && isDesktopMedia) {
//     destination.item.classList.add("bg");
//   }

//   if (origin.index == 1 && direction == "down") {
//     moveRight(document.querySelector(".grid"));
//   } else if (origin.index == 2 && direction == "up") {
//     clearXPosition(document.querySelector(".grid"));
//   }

//   if (origin.index == 2 && direction == "down") {
//     moveRight(document.querySelector(".container"));
//     moveRight(document.querySelector(".mobile-text"));
//   } else if (origin.index == 3 && direction == "up") {
//     clearXPosition(document.querySelector(".container"));
//     clearXPosition(document.querySelector(".mobile-text"));
//   }
// }
// #endregion
