# Proyecto final EPICA, Argentina Programa 4.0
Comision: 21523A

# Blog
El sitio web se trata de un blog, y tiene las siguientes funcionalidades:
- Ver los blogs
- Buscar un blog (con la barra de busqueda)
- Crear un blog (con autor, titulo, detalle, imagen y fecha de creación)
- Modificar un blog
- Eliminar un blog

## Requisitos instalación
```javascript
> npm 9.3.1
> node 18.14.0
> cors 2.8.5
> dotenv 16.3.1
> ejs 3.1.9
> express 4.18.2
> helmet 7.0.0
> method-override 3.0.0
> morgan 1.10.0
> mysql2 3.6.1
> sequelize 6.33.0

// OPCIONAL 
> nodemon 3.0.1
```

# Tecnología usada
- HTML
- CSS
- Javascript
- Bootstrap
- Nodejs
- Express
- Ejs
- MySql2
- Sequelize
- XAMPP

## Para correr el proyecto se necesita:
Clonar repositorio

- Crear variables de entorno en .env
- Abrir XAMPP
- Correr Apache y MySQL
- Ir a http://localhost/phpmyadmin y crear en la BD una tabla con la estructura del modelo de Posts

Correr: 
```javascript
> node src/index
```

- Ir a http://localhost:4000/

## Opcional
Instalar:
- npm install nodemon -save-dev (en modo dev para que corra actualizando los cambios automaticamente)

Correr: 
```javascript
> npm run dev
```

- Ir a http://localhost:4000/