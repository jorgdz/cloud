# Local cloud

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

_Local cloud, me permite ver el contenido de un directorio local, y navegar a través de ellos y visualizar su contenido. También es posible crear directorios en una ruta especificada por el cliente, por el momento no podemos tener varios directorios con el mismo nombre, y si intenta crear un directorio existente devolverá un error al cliente indicando que ya existe, sin embargo cuando se integre una base de datos, esta implementación de tener varios directorios con el mismo nombre se tomará en cuenta, simulando un storage cloud._

# Visualizando directorios
![Visualizando directorios][cap1]


# Error al intentar acceder a un directorio que no existe
![Error dir no existe][cap2]


# Creando un nuevo directorio
![Crear carpeta][cap3]


# Error al crear un directorio con un nombre que ya existe
![Carpeta existente][cap4]


# Directorio creado
![Carpeta creada][cap5]


# Subiendo archivos
![Subir archivos][cap6]
![Seleccionando archivos][cap7]
![Archivos subidos][cap8]

# Instalando el cloud en tu PC local
Luego de clonar el repositorio de https://github.com/jorgdz/cloud/, entrar a la carpeta cloud

```bash
cd cloud
```

Y si estás en windows crear un archivo .env en la raiz de _cloud_ y copiar el nombre de la variable de entorno que está en el __env.example__; __BASE_DIRECTORY__, esta variable debe tener la ruta absoluta del disco donde se guardará la información, si estás en linux puedes hacer lo mismo, o setearla como una variable de entorno.
Finalmente ejecutar los comandos:

```bash
npm install
```
```bash
npm start
```

Por defecto iniciará la aplicación en el puerto __3000__

## Construido en 🛠️

- [Nodejs](https://nodejs.org/en/) - Node JS
- [JS](https://developer.mozilla.org/es/docs/Web/JavaScript) - Javascript.

## Autor ✒️

- **Jorge Diaz Montoya**

[cap1]: /docs/cap1.png "Visualizando directorios"
[cap2]: /docs/cap2.png "Error dir no existe"
[cap3]: /docs/cap3.png "Crear carpeta"
[cap4]: /docs/cap4.png "Carpeta existente"
[cap5]: /docs/cap5.png "Carpeta creada"
[cap6]: /docs/cap6.png "Subir archivos"
[cap7]: /docs/cap7.png "Seleccionando archivos"
[cap8]: /docs/cap8.png "Archivos subidos"
