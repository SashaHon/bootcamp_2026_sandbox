// #region Refactored Code

// It's not necessary, but we can abstract the popup element to decrease the number of times we query the DOM for the same element, and make the code more efficient and cleaner.
// This way, we can reuse the same popup element in both open and close functions without querying it multiple times.
const popup = document.querySelector(popupSelector);

// Utils
// We can reuse KISS utils, to keep it DRY and Separate the Concerns
function addPopupActiveClass(popup, activeClass) {
  popup?.classList.add(activeClass);
}

function removePopupActiveClass(popup, activeClass) {
  popup?.classList.remove(activeClass);
}

const addEventListenerToOpenPopup = (trigger, popup, activeClass) => {
  trigger.addEventListener("click", () => {
    addPopupActiveClass(popup, activeClass);
  });
};

const addEventListenerToClosePopup = (trigger, popup, activeClass) => {
  trigger.addEventListener("click", () => {
    removePopupActiveClass(popup, activeClass);
  });

  document.addEventListener("click", (e) => {
    if (e.target === popup) {
      removePopupActiveClass(popup, activeClass);
    }
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key === "Escape") {
      removePopupActiveClass(popup, activeClass);
    }
  });
};

// Summary: the names of the functions are misleading and do not describe what actually happens inside the function.
// The functions are not reusable and do not follow the DRY principle, as they both query the DOM for the same element multiple times.
// The code can be refactored to make it more efficient, cleaner, and easier to understand by abstracting the popup element and separating the concerns of adding and removing the active class.

// #endregion

// #region Original Code

const openPopup = (trigger, popupSelector, activeClass) => {
  const popup = document.querySelector(popupSelector);
  trigger.addEventListener("click", () => {
    popup?.classList.add(activeClass);
  });
};

const closePopup = (trigger, popupSelector, activeClass) => {
  const popup = document.querySelector(popupSelector);
  trigger.addEventListener("click", () => {
    popup?.classList.remove(activeClass);
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key === "Escape") {
      popup?.classList.remove(activeClass);
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup?.classList.remove(activeClass);
    }
  });
};

// #endregion
