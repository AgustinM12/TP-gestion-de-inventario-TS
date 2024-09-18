# Proyecto - Sistema de gestion de inventario - Formotex

## Instalación

1. Crear un archivo llamado `.env` en la carpeta server.
2. Sigue el archivo de ejemplo para definir las variables.

## Ejecutar el Proyecto

En una terminal, navega hasta las carpeta principales del proyecto
## .\server
## .\client
 y ejecuta los siguientes comando en cada uno:

```bash
npm run dev
```

# Funcionamiento del sistema

El sistema se trata de una aplicacion que gestiona el inventario de equipos informaticos de una empresa ficticia "FORMOTEX". Esta empresa se dedica al mantenimiento y distribucion de equipos informaticos para diversas organizaciones.

# Explicacion de los roles del sistema
El sistema cuenta con 4 roles:
## Admin: Es el usuario con mas permisos y es creado por defecto al iniciar el sistema por primera vez

## Manager: Es el encargado una organizacion externa, es decir, un cliente de Formotex. Estos pueden cargar los dispositivos de su organizacion que seran enviados para su mantenimiento.

## Delegate: Es un empleado administrativo de Formotex, encargado de ser un intermediario con los clientes. Se encarga de mediar entre un tecnico de mantenimiento y el manager de una organizacion, sin embargo, su tarea tambien puede ser mediada en menor medida por usuarios con el rol "Maintenance".

## Maintenance: Es un tecnico encargado de las reparaciones dentro de Formotex, se encarga de actualizar los registros de los dispositivos una vez reparados

# Modulos del sistema

### Modulo de ADMIN:
El administrador es el usuario con mas altos permisos, es capaz de accder a todas la funcionalidades del sistema, siendo estas las siguientes:

Registro de nuevos usuarios
Registro de nuevas organizaciones
Registro de nuevos dispositivos

Acceder a los detalles de los dispositivos

Actualizar los registros de dispositivos

Eliminacion de dispositivos
Eliminacion de organizaciones
Eliminacion de usuarios

### Modulo de Devices:

Los nuevos registro de dispositivos deben contar primeramente con las siguientes caracteristicas:
## name
## defectiveDetails
## tradeMark
## type
## state
## organization 

### Modulo de Organizations:
Los nuevos registro de organizaciones deben contar primeramente con las siguientes caracteristicas:
## name
## location
## manager
## delegate

### Modulo de Users:
Los nuevos registro de usuarios deben contar primeramente con las siguientes caracteristicas:
## name
## email
## password
## role
## dni

### User - Maintenance:
Este se encarga de realizar el mantenimiento a los dispositivos enviados por las diferentes organizaciones y actualizar los registros de los dispositivos. Agregando el costo de la misma y detalles tecnicos a sobre las reparaciones realizadas, asi como el estado del dispositivo

### Estados del dispositivo:
El documento de estados se crea por defecto una vez realizada la conexion a la DB.
Los estados que puede tener un dispositivo son los siguientes:

## ON_TRAVEL:
Significa que el dispositivo se encuentra en translado ya sea de la organizacion propietaria a Formotex y viceversa.

## STORED:
Significa que el dispositivo se encuentra en los almacenes de Formotex a la espera de ser reparado.

## ON_MAINTENANCE:
Significa que el dispositivo se encuentra bajo tareas de manteniemiento a cargo de un usuario con el rol Maintenance.

## READY:
Significa que el dispositivo se encuentra en los almacenes de Formotex a ser enviado de vuelta a su propietario.

## RECIVED:
Significa que el dispositivo ya encuentra de vuelta a su con propietario luego de la reparacion.

### Tipos del dispositivo:
El documento de tipos se crea por defecto una vez realizada la conexion a la DB.
Los estados que puede tener un dispositivo son los siguientes:

## PORTABLE:
Consiste en un dispositivo portatil como una Notebook o celular

## DESKTOP:
Consiste por ejemplo en una PC de escritorio o similares

## COMPONENT:
Consiste en un componente de una PC de escritorio o similar, por ejemplo una tarjeta grafica, disco de memoria, etc

## PERIPHERAL:
Consiste en perifericos de una pc como por ejemplo teclados, mouse, monitores, etc

### User - Manager:
Es un cliente de Formotex y tiene la posibilidad de cargar una organizacion que estara a su cargo para posteriormente poder cargar dispositivos para su posterior reparacion

### User - Delegate:
Es un empleado administrativo de Formotex y tiene la tarea de antender a las consultas que puedan tener los manager asi como de informarles del estado de sus dispositivos