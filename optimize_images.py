import os
from pathlib import Path
from PIL import Image

# Ruta de origen y destino
source_folder = Path("assets")
output_folder = Path("assets_optimized")

# Crear destino si no existe
output_folder.mkdir(parents=True, exist_ok=True)

# Función para optimizar una imagen
def optimize_image(input_path, output_path):
    try:
        with Image.open(input_path) as img:
            img = img.convert("RGB")
            img.thumbnail((1920, 1920))  # Redimensionar
            output_path.parent.mkdir(parents=True, exist_ok=True)
            img.save(output_path.with_suffix(".jpg"), "JPEG", quality=75, optimize=True)
            print(f"Optimizada: {output_path}")
    except Exception as e:
        print(f"Error al procesar {input_path}: {e}")

# Recorrer todo dentro de 'assets'
for file_path in source_folder.rglob("*.*"):
    if file_path.suffix.lower() in [".jpg", ".jpeg", ".png"]:
        relative_path = file_path.relative_to(source_folder)
        output_path = output_folder / relative_path
        optimize_image(file_path, output_path)

print("✅ Todas las imágenes han sido optimizadas en 'assets_optimized/'")
