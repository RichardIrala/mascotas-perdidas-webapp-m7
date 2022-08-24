# WebApp de mascotas perdidas
Creada por Richard Irala
GitHub: <a href="https://github.com/RichardIrala">Richard Irala</a>

## _Deploy:_ <a href="https://mascotas-perdidas-webapp-m7.herokuapp.com/">Mascotas perdidas</a>
## _Documentación de la API:_ <a href="https://documenter.getpostman.com/view/21426281/VUqrMGUB">Endpoints</a>

## _Tecnologias_

Esta WebApp utiliza como tecnologías principales:

- [node.js] - 
- [Express] -
- [Cloudinary] - Servicios de gestión de imágenes y vídeos basados en la nube
- [JWT] - token de seguridad
- [PostgreSQL] - Base de datos relacional
- [Sequelize] - 
- [Mapbox] -
- [Algolia] - API de búsqueda

## _Ejecución_

Instalar las dependencias y dependencias de desarrollador e iniciar el Backend y el FrontEnd.

```sh
Estando ubicados en mascotas-perdidas-webapp-m7/
1 - npm i <= Instala las dependencias de la aplicación.
2 - npm run build <= Se encarga de buildear tanto el FrontEnd como el BackEnd.
3 - npm run start <= Se encarga de iniciar la WebApp con node.js. Pre-requisito: haber transpilado el FrontEnd y Backend.
```

Variables de entorno...

```sh
ALGOLIA_INDEX = "Esta variable de entorno indica el índice en el que se van a guardar los datos de Algolia que se vayan creando"
ALGOLIA_APP_ID
ALGOLIA_API_KEY
SEQUELIZE_DIALECT="postgres"
SEQUELIZE_USERNAME
SEQUELIZE_PASSWORD
SEQUELIZE_DATABASE
SEQUELIZE_HOST
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
JWT_SECRET
MAPBOX_TOKEN
SENDGRID_API_KEY = "Pertenece a la key la cual se solicita a sendgrids"
SENDGRID_SENDER = "Este valor equivale al correo que va a enviar el email. Debe estar registrado en tu sengrid"

```
