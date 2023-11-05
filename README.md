# A bootstrap Vite template combining Solidjs, Threejs and TailwindCSS

Requirements:

```json
{
  "name": "solid-canvas",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "solid-js": "^1.7.8",
    "three": "^0.158.0"
  },
  "devDependencies": {
    "@types/three": "^0.158.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vite-plugin-solid": "^2.7.0"
  }
}
```


This template creates:

- SolidJS
  - A SolidJS Canvas element
  - A status bar at the bottom of the page 
- ThreeJS
  - A rendered
  - A perspective camera
  - A scene with some rotating cubes
- Handling
  - Window resizing
  - Mouse Orbital controls
