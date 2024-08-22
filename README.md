```markdown
# Magnifier Package

A simple JavaScript package that provides a magnifier effect for images. This package allows you to zoom in on images with a customizable magnifier and lens element.

## Installation

You can install the package using npm:

```bash
npm install @alain_tran/loupejs
```

## Usage

### Step 1: Import the Loupe

In your JavaScript file, import the `Loupe` from the package:

```javascript
import Loupe from '@alain_tran/loupejs';
```

### Step 2: Prepare the HTML Structure

Ensure that your HTML contains the necessary elements with appropriate `data-target` attributes:

```html
<div class="relative w-96 h-96 cursor-none">
  <img src="/path-to-background-image.jpg" alt="Image à zoomer" data-target="image" class="w-full h-full object-cover">
  <div class="z-10 absolute inset-0 w-full h-full opacity-0 bg-no-repeat pointer-events-none transition-opacity duration-300" data-target="magnifier"></div>
  <div class="z-20 absolute w-20 h-20 opacity-0 bg-white/60 transition-opacity duration-300 pointer-events-none" data-target="lens"></div>
</div>
```

- **`data-target="image"`**: The image you want to apply the magnifier effect to.
- **`data-target="magnifier"`**: The magnifier element, which will display the zoomed-in portion of the image.
- **`data-target="lens"`**: The lens element, which will move with the cursor to indicate the zoomed area.

### Step 3: Initialize the Loupe

Once the DOM is loaded, you need to initialize the `Loupe` with the corresponding elements:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const imageElement = document.querySelector('[data-target="image"]');
  const magnifierElement = document.querySelector('[data-target="magnifier"]');
  const lensElement = document.querySelector('[data-target="lens"]');

  if (imageElement && magnifierElement && lensElement) {
    new Loupe(imageElement, magnifierElement, lensElement);
  }
});
```

### Step 4: Customize the Magnifier (Optional)

You can customize the zoom level and background image by passing additional parameters to the `Loupe`:

```javascript
new Loupe(imageElement, magnifierElement, lensElement, 'path-to-background-image.jpg', 4);
```

- **`backgroundUrl`**: (Optional) The URL of the image to use for the background of the magnifier.
- **`zoomLevel`**: (Optional) The zoom level, where the default is `3`.

### Step 5: Add Styling

You can add additional styles to the magnifier and lens elements as needed. For example:

```css
[data-target="magnifier"] {
  border-radius: 50%;
  border: 2px solid #000;
  background-repeat: no-repeat;
  background-position: 0 0;
}

[data-target="lens"] {
  border-radius: 50%;
}
```

### Step 6: Run Your Project

After following these steps, your image should have a functional magnifier effect when hovered over.

## Example

Here is a basic example to see the package in action:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Magnifier Example</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div style="position: relative;">
    <img src="your-image.jpg" data-target="image" alt="Zoomable Image" style="width: 100%; height: auto;">
    <div data-target="magnifier" class="opacity-0" style="position: absolute; width: 100px; height: 100px; pointer-events: none;"></div>
    <div data-target="lens" class="opacity-0" style="position: absolute; width: 50px; height: 50px; border: 2px solid #000;"></div>
  </div>

  <script type="module">
    import Loupe from '@alain_tran/loupejs';

    document.addEventListener('DOMContentLoaded', () => {
      const imageElement = document.querySelector('[data-target="image"]');
      const magnifierElement = document.querySelector('[data-target="magnifier"]');
      const lensElement = document.querySelector('[data-target="lens"]');

      if (imageElement && magnifierElement && lensElement) {
        new Loupe(imageElement, magnifierElement, lensElement);
      }
    });
  </script>
</body>
</html>
```

## License

This package is open-source and available under the [MIT License](LICENSE).

```

### Explication des sections

- **Installation** : Fournit les instructions pour installer le package via npm.
- **Usage** : Guide l'utilisateur étape par étape pour intégrer et utiliser le package dans son projet.
- **Example** : Donne un exemple concret d'intégration dans un projet HTML.
- **License** : Indique le type de licence sous lequel le package est distribué.