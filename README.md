# Gestión de Eventos Universitarios

Aplicación web desarrollada con **React + Vite** para la administración de eventos universitarios, participantes e inscripciones.  
El proyecto permite realizar operaciones CRUD completas y organizar la información de forma clara y funcional.

---

## Características principales

- Gestión completa de **eventos**
  - crear
  - editar
  - eliminar
  - ver detalle
  - buscar eventos

- Gestión completa de **participantes**
  - crear
  - editar
  - eliminar
  - buscar participantes

- Gestión de **inscripciones**
  - registrar participantes en eventos
  - editar inscripciones
  - eliminar inscripciones
  - seleccionar solo participantes y eventos existentes

- Interfaz responsiva con Bootstrap
- Validaciones básicas en formularios
- Confirmación antes de eliminar registros
- Consumo de API con `axios`
- Backend simulado con `json-server`

---

## Tecnologías utilizadas

- **React**
- **Vite**
- **React Router DOM**
- **Axios**
- **Bootstrap**
- **json-server**
- **Git / GitHub**

---

## Estructura general

La aplicación está organizada en los siguientes módulos:

- **Inicio**: acceso principal a la aplicación.
- **Eventos**: administración de eventos universitarios.
- **Participantes**: registro y control de participantes.
- **Inscripciones**: relación entre participantes y eventos.

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/oscarvasquezb25/gestion-eventos-universitarios.git
cd gestion-eventos-universitarios
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar el frontend

```bash
npm run dev
```

### 4. Ejecutar el backend simulado con json-server

Asegúrate de tener instalado `json-server` y luego ejecuta:

```bash
npx json-server --watch db.json --port 3001
```

---

## Rutas principales

- `/` → Inicio
- `/events` → Listado de eventos
- `/events/new` → Crear evento
- `/events/edit/:id` → Editar evento
- `/events/:id` → Detalle de evento
- `/participants` → Listado de participantes
- `/participants/new` → Crear participante
- `/participants/edit/:id` → Editar participante
- `/registration` → Listado de inscripciones
- `/registration/edit/:id` → Editar inscripción

---

## Estructura de datos

El archivo `db.json` contiene las colecciones principales:

- `events`
- `participants`
- `registrations`

Cada inscripción relaciona un participante con un evento mediante sus respectivos IDs.

---

## Funcionalidades destacadas

- Búsqueda de eventos y participantes
- Formularios reutilizables para crear y editar
- Eliminación con modal de confirmación
- Inscripciones restringidas a datos existentes
- Conservación de la fecha de inscripción al editar

---

## Capturas

> Puedes agregar aquí imágenes del proyecto una vez subidas al repositorio.

Ejemplo:

```markdown
![Inicio](./screenshots/home.png)
![Eventos](./screenshots/events.png)
![Participantes](./screenshots/participants.png)
![Inscripciones](./screenshots/registration.png)
```

---

## Posibles mejoras futuras

- Autenticación de usuarios
- Paginación en listas
- Filtros por fecha y categoría
- Mejoras visuales adicionales
- Backend real con base de datos

---

## Autor

Desarrollado por **Oscar Angel Vasquez Blanco**  
Proyecto académico para la gestión de eventos universitarios.

---

## Licencia

Este proyecto puede ser utilizado con fines académicos y de aprendizaje.
