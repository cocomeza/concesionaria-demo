# Guía para subir el proyecto a GitHub correctamente

## Pasos a seguir:

### 1. Inicializar Git solo en este directorio
```bash
git init
```

### 2. Agregar todos los archivos del proyecto
```bash
git add .
```

### 3. Hacer el commit inicial
```bash
git commit -m "Initial commit: Concesionaria AutoElite - Plataforma completa"
```

### 4. Cambiar a la rama main
```bash
git branch -M main
```

### 5. Agregar el remote de GitHub
```bash
git remote add origin https://github.com/cocomeza/concesionaria-demo.git
```

### 6. Subir el código a GitHub
```bash
git push -u origin main
```

---

## ⚠️ IMPORTANTE:

Si ya tienes un repositorio git inicializado en un directorio padre (como `C:\Users\mezac\`), necesitas:

1. **Eliminar el repositorio git del directorio padre** (si existe)
2. **O asegurarte de estar en el directorio correcto** antes de ejecutar `git init`

Para verificar en qué directorio estás:
```bash
pwd  # En PowerShell: Get-Location
```

Debes estar en: `C:\Users\mezac\concesionaria-demo`

---

## Orden completo de comandos (copiar y pegar):

```bash
# 1. Asegúrate de estar en el directorio correcto
cd C:\Users\mezac\concesionaria-demo

# 2. Inicializar git
git init

# 3. Agregar todos los archivos
git add .

# 4. Commit inicial
git commit -m "Initial commit: Concesionaria AutoElite - Plataforma completa"

# 5. Cambiar a rama main
git branch -M main

# 6. Agregar remote (si no existe)
git remote add origin https://github.com/cocomeza/concesionaria-demo.git

# 7. Subir a GitHub
git push -u origin main
```

---

## Si el remote ya existe y quieres reemplazarlo:

```bash
# Eliminar el remote existente
git remote remove origin

# Agregar el remote correcto
git remote add origin https://github.com/cocomeza/concesionaria-demo.git

# Verificar
git remote -v
```

