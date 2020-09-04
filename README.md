# Local cloud

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

_Local cloud, me permite ver el contenido de un directorio local, y navegar a través de ellos y visualizar su contenido. También es posible crear directorios en una ruta especificada por el cliente, por el momento no podemos tener varios directorios con el mismo nombre, y si intenta crear un directorio existente devolverá un error al cliente indicando que ya existe, sin embargo cuando se integre una base de datos, esta implementación de tener varios directorios con el mismo nombre se tomará en cuenta, simulando un storage cloud._

# Creando directorios
![Crear directorio][cap1]


# Borrar directorios
![Borrar directorio][cap2]


# Subiendo archivos
![Subir archivos][cap3]


# Descargar y borrar los archivos
![Abrir_borrar archivos][cap4]


# Renombrar un directorio existente
![Renombrar directorio][cap5]


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

[cap1]: /docs/cap1.gif "Crear directorio"
[cap2]: /docs/cap2.gif "Borrar directorio"
[cap3]: /docs/cap3.gif "Subir archivos"
[cap4]: /docs/cap4.gif "Abrir_borrar archivos"
[cap5]: /docs/cap5.gif "Renombrar directorio"
