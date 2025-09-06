# Bilingual ERR (BERR) - Firefox Extension

**BERR** is a lightweight Firefox extension that allows you to view bilingual text on webpages. It tracks original and translated text in `<p>` and heading elements, storing them in `localStorage` and then merging them dynamically for easy bilingual viewing.  

<img width="1036" height="888" alt="image" src="https://github.com/user-attachments/assets/b21f70c0-96ae-405c-873d-1250bb2979ca" />

---

## Features

- Automatically saves original text from `<p>`, `<h1>`, `<h2>`, and `<h3>` elements.  
- Observes the DOM for translated text changes and stores them.  
- Merges original and translated text in a bilingual format.  
- Cleans up `localStorage` after merging.  
- Lightweight, self-contained script – no external dependencies.  

---

## How It Works

1. **Initialization**:  
   The extension scans the page for paragraphs and headings, saving the original text in `localStorage`.  

2. **Mutation Observer**:  
   Any updates to the text (e.g., translated content added dynamically) are captured and saved automatically.  

3. **Merging**:  
   If both original and translated text exist for an element, the translated text is appended below the original text in a `div.translation`.  

4. **Cleanup**:  
   After merging, `localStorage` entries for the current page are removed to prevent clutter.  

---

## Usage

1. Install the extension in Firefox (temporary or via AMO).  
2. Navigate to an article on [ERR](https://www.err.ee/ )
3. The extension will automatically save and merge bilingual content for `<p>` and heading elements.

---
