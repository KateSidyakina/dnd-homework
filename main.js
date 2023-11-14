/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 562:
/***/ (() => {

document.addEventListener("DOMContentLoaded", () => {
  const columns = document.querySelectorAll(".column");
  let draggedCard = null;
  columns.forEach(column => {
    const addCardButton = column.querySelector(".addCardBtn");
    const form = column.querySelector(".add-form");
    const formCancelButton = form.querySelector(".add-form__cancel");
    addCardButton.addEventListener("click", () => {
      addCardButton.classList.add("addCardBtn--hide");
      form.classList.add("add-form--show");
    });
    form.addEventListener("submit", e => {
      e.preventDefault();
      const newCardText = form.querySelector("textarea").value;
      const newCard = createCard(newCardText, column.id);
      column.insertBefore(newCard, addCardButton);
      saveToLocalStorage();
      addCardButton.classList.remove("addCardBtn--hide");
      form.classList.remove("add-form--show");
      form.reset();
    });
    formCancelButton.addEventListener("click", () => {
      addCardButton.classList.remove("addCardBtn--hide");
      form.classList.remove("add-form--show");
      form.reset();
    });
    column.addEventListener("dragover", e => {
      e.preventDefault();
      const rect = addCardButton.getBoundingClientRect();
      const isBefore = e.clientY < rect.top + rect.height / 2;
      if (draggedCard && e.target !== addCardButton) {
        const cards = Array.from(column.querySelectorAll(".card"));
        let targetCard = null;
        cards.forEach((card, index) => {
          const cardRect = card.getBoundingClientRect();
          const isHoveringOverCard = e.clientY >= cardRect.top && e.clientY <= cardRect.bottom;
          if (isHoveringOverCard) {
            targetCard = card;
            if (index === cards.length - 1) {
              targetCard = card;
            }
          }
        });
        if (targetCard) {
          if (isBefore) {
            column.insertBefore(draggedCard, targetCard);
          } else {
            const nextCard = targetCard.nextElementSibling;
            if (nextCard === draggedCard) {
              column.appendChild(draggedCard);
            } else {
              column.insertBefore(draggedCard, nextCard);
            }
          }
        } else {
          column.insertBefore(draggedCard, addCardButton);
        }
      }
    });
    column.addEventListener("drop", () => {
      if (draggedCard) {
        draggedCard.style.opacity = "1";
        draggedCard = null;
        document.querySelectorAll(".card__delete").forEach(el => el.style.opacity = 1);
        saveToLocalStorage();
      }
    });
  });
  const board = document.getElementById("board");
  board.addEventListener("click", e => {
    if (e.target.classList.contains("card__delete")) {
      if (confirm("Do you want to delete this card?")) {
        e.target.parentNode.remove();
        saveToLocalStorage();
      }
    }
  });
  board.addEventListener("dragstart", e => {
    if (e.target.classList.contains("card")) {
      document.querySelectorAll(".card__delete").forEach(el => el.style.opacity = 0);
      draggedCard = e.target;
      draggedCard.style.opacity = "0.5";
    }
  });
  board.addEventListener("dragend", () => {
    if (draggedCard) {
      draggedCard.style.opacity = "1";
      draggedCard = null;
    }
  });
  function createCard(text, columnId) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.draggable = true;
    card.dataset.column = columnId;
    card.textContent = text;
    const deleteButton = document.createElement("div");
    deleteButton.classList.add("card__delete");
    card.insertAdjacentElement("beforeend", deleteButton);
    return card;
  }
  function saveToLocalStorage() {
    const columns = document.querySelectorAll(".column");
    const savedState = {};
    columns.forEach(column => {
      const columnId = column.id;
      const cards = Array.from(column.querySelectorAll(".card"));
      savedState[columnId] = cards.map(card => card.textContent);
    });
    localStorage.setItem("taskBoardState", JSON.stringify(savedState));
  }
  function loadFromLocalStorage() {
    const savedState = JSON.parse(localStorage.getItem("taskBoardState"));
    if (savedState) {
      Object.keys(savedState).forEach(columnId => {
        const column = document.getElementById(columnId);
        if (column) {
          savedState[columnId].forEach(cardText => {
            const card = createCard(cardText, columnId);
            column.insertBefore(card, column.querySelector(".addCardBtn"));
          });
        }
      });
    }
  }
  loadFromLocalStorage();
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(562);
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_app__WEBPACK_IMPORTED_MODULE_0__);



// TODO: write your code in app.js
})();

/******/ })()
;