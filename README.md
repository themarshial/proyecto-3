
# Proyecto 3: Tablero de datos ("Dashboard")

Repositorio del Proyecto 3 del Bootcamp Fullstack Web Development de U-Camp

## Introducción

Para el proyecto 3 decidimos hacer una aplicación en la cual se realiza una pequeña encuesta, cuyos resultados se almacenan mediante una API haciendo peticiones POST. Dicha aplicación procesa los datos y muestra los resultados mediante gráficas usando librerías open source de javascript.

El objetivo de este proyecto es recolectar información de los estudiantes del bootcamp para mostrar la comunicación y diversidad de nuestros compañeros.

## Link del proyecto

Para acceder a la encuesta y ver los resultados ir al siguiente enlace:
[U-Camp Survey](https://themarshial.github.io/proyecto-3/)
## API References

### MockAPI

Para el almacenamiento y obtención de datos utilizamos [MockAPI](https://mockapi.io/), la cual es una herramienta permite simular un API de manera sencilla, generar datos personalizados y realizar peticiones HTTP utilizando la interfaz RESTful.

#### Get all surveys

```http
  GET https://6364c0c4f711cb49d1eadffc.mockapi.io/api/surveys
```

#### POST survey

```http
  POST https://6364c0c4f711cb49d1eadffc.mockapi.io/api/surveys
```

| Parameter (body) | Type     | Description                                           |
| :--------------- | :------- | :---------------------------------------------------- |
| `survey`         | `object` | **Required**. Respuestas de cada encuesta a almacenar |


Para hacer pruebas en local, vea la sección [Run Locally](#item1) 

### World Countries - Centroids

Como parte de los requerimientos de nuestra idea, se utilizó un archivo [GeoJson](https://geojson.org/), que contiene los **centroides** geográficos de los países del mundo.

#### GET all countries centroids

```http
  GET https://cdn.jsdelivr.net/gh/gavinr/world-countries-centroids@v1/dist/countries.geojson
```

## Run Locally

Clona el proyecto

```bash
  git clone https://github.com/themarshial/proyecto-3.git
```

Instala JSON Server 

```bash
  npm install -g json-server
```

Inicia el servidor JSON-Server

```bash
  json-server --watch db.json
```

En el archivo /js/db.js cambia el valor de la constante **ApiURL** a lo siguiente:

```bash
  http://localhost:3000/surveys
```


## Tech Stack

**Client:** Javascript, Chart.js, LeafLet

**Server:** MockAPI


## Authors

- [@themarshial](https://github.com/themarshial)
- [@yasserangelgm](https://github.com/yasserangelgm)
- [@manfredmontero](https://github.com/manfredmontero)
- [@Gustav0218](https://github.com/Gustav0218)
## Screenshots

![App Screenshot](https://i.ibb.co/GCw8Lxd/scsh-1.jpg)


