const SELECTOR = "p, h1, h2, h3";
let idCounter = 0;

function storageKey(id, label) {
  return `${location.href}::${id}::${label}`;
}

function savePageText(label, el) {
  let id = el.dataset.originalId;
  if (!id) {
    id = idCounter++;
    el.dataset.originalId = id;
  }

  const text = el.textContent.trim();
  if (text) {
    localStorage.setItem(storageKey(id, label), text);
  }
}

function mergeBilingual() {
  document.querySelectorAll(SELECTOR).forEach((el) => {
    const id = el.dataset.originalId;
    if (!id) return;

    const original = localStorage.getItem(storageKey(id, "original"));
    const translated = localStorage.getItem(storageKey(id, "translated"));

    if (original && translated) {
      const translatedDiv = document.createElement("div");
      translatedDiv.classList.add("translation");
      translatedDiv.textContent = translated;
      el.appendChild(translatedDiv);
    }
  });

  clearLocalStorage();
  console.log("BERR: Merge complete.");
}

function clearLocalStorage() {
  Object.keys(localStorage).forEach((k) => {
    if (k.startsWith(location.href)) {
      localStorage.removeItem(k);
    }
  });
  console.log("BERR:Cleared localStorage.");
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "characterData" && mutation.target.parentElement) {
      savePageText("translated", mutation.target.parentElement);
      console.log("BERR: Saved translated text.");
    }
  });
});

observer.observe(document.body, {
  characterData: true,
  childList: true,
  subtree: true,
});

function init() {
  document
    .querySelectorAll(SELECTOR)
    .forEach((el) => savePageText("original", el));

  console.log("BERR: Saved original texts.");

  const hasTranslated = Object.keys(localStorage).some(
    (k) => k.startsWith(location.href) && k.endsWith("::translated")
  );

  if (hasTranslated) {
    mergeBilingual();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
