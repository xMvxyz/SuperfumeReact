Superfume - React (Vite)

Este directorio contiene una versión en React (Vite) del proyecto original. Está diseñada para reutilizar la carpeta `assets/` existente en el root del repo.

Pasos para ejecutar (PowerShell en Windows):

```powershell
cd "c:\Users\Gorilla Setups\Desktop\IMPORTANTE\Duoc\Proyecto Fullstack 2\Superfume\react-app"
npm install
npm run dev
```

Notas:
- Vite está configurado con `publicDir: '../assets'` para exponer los activos existentes (CSS, imágenes, fuentes) desde la raíz del repo.
- La migración está en progreso: la página Home ya fue trasladada; las demás páginas son placeholders. Puedo continuar migrando las páginas restantes (`shop`, `shop-single`, `carrito`, `about`, `contact`, `login`) cuando lo indiques.
- Si prefieres que los assets se copien dentro de `react-app/public` en vez de usar `publicDir`, puedo hacerlo.
