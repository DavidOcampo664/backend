
# 🐾 Neko Sushi - Sistema de Reservas 🍣

Sistema de reservas profesional para un restaurante temático de tatamis, sushi y gatos.

---

## 📦 Tecnologías utilizadas

- **Node.js + Express** (Backend)
- **PostgreSQL** (Base de datos)
- **JWT** (Autenticación)
- **Swagger** (Documentación)
- **Postman** (Pruebas)

---

## ⚙️ Instalación y ejecución

1. **Clona el repositorio**

```bash
git clone https://github.com/DavidOcampo664/backend
cd backend
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Crea el archivo `.env`**

```env
DB_USER=postgres
DB_PASSWORD=1234
DB_HOST=localhost
DB_PORT=5432
DB_NAME=reservas_db
JWT_SECRET=secreto_neko
```

4. **Configura tu base de datos**
- Crea la base `reservas_db` en PostgreSQL
- Ejecuta las migraciones manualmente si es necesario

5. **Inicia el servidor**

```bash
node index.js
```

---

## 📑 Documentación Swagger

Accede desde:

```
http://localhost:3000/api-docs
```

Ahí verás todos los endpoints de:

- Usuarios
- Tatamis
- Reservas

---

## 🔐 Autenticación

- Login con JWT
- Roles: `admin` y `cliente`
- Acciones restringidas según rol

---

## 📮 Endpoints destacados

- `POST /usuarios/registro` → Registrar usuario
- `POST /usuarios/login` → Obtener token
- `GET /usuarios/perfil` → Ver perfil

- `GET /tatamis` → Ver todos los tatamis
- `GET /tatamis/disponibles` → Filtrar disponibles
- `POST /tatamis` → Crear tatami (admin)
- `DELETE /tatamis/:id` → Eliminar (admin)

- `POST /reservas` → Crear reserva
- `GET /reservas/mis-reservas` → Ver mis reservas
- `PUT /reservas/:id/confirmar` → Confirmar (admin)
- `GET /reservas/estadisticas` → Ver estadísticas (admin)

---

## 📫 Pruebas con Postman

Importa el archivo:

📁 `neko-sushi-postman-collection.json`

Define variables:
- `{{token_admin}}`
- `{{token_cliente}}`

---

## 👨‍💻 Equipo

- 👤 David Alejandro Ocampo Carvajal
- pongan sus nombres aqui culeros (mentiris los amo)

---

## ✅ Estado del proyecto

✔️ Funcional  
✔️ Autenticado  
✔️ Documentado  
✔️ Listo para entregar
