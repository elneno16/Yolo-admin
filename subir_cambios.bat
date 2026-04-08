@echo off
echo 🔄 Preparando subida a GitHub (Yolo-admin)...
git add .
echo ✅ Archivos listos.
git commit -m "Sincronizacion desde Antigravity"
echo 🚀 Subiendo a la nube (GitHub)...
git push
echo.
echo ✨ ¡TODO LISTO! Tus cambios en Yolo-admin ya estan en camino a la web.
echo.
pause
