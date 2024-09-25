
# Automatizacion Web con TypeScript, PlayWright, Cucumber y Allure

Proyecto basico de Automatizacion Web, se automtizo la Web opensource de Orange-HRM.





## Ejecutar localmente

Clona el proyecto.

```bash
  git clone https://github.com/blackdog0807/orangehrm-automation.git
```

Ve al directorio del proyecto ya descargado.

```bash
  cd OrangeHRM-Automation
```

Instala las dependencias

```bash
  npm install
```

Ejecuta los scripts

```bash
  npm run clean  # Elimina los archivos de evidencia generados
  npm run test -- '@login'  # Ejecuta las pruebas con Cucumber indicando el Feature a ejecutar utilizando -- '@abcde'
  npm run allure:generate  # Genera el reporte de Allure
  npm run allure:open  # Abre el reporte de Allure en el navegador
```

## Estructura de Archivos
```
orangehrm-automation-web/ 
├── allure-report/ # Carpeta donde se genera el reporte de Allure luego de ejecutar el allure:generate
│
├── allure-results/ # Carpeta donde se almacenan los archivos generados por Cucumber que sirven de input para generar los reportes en Allure
│
├── src/
│ ├── evidence/ # Carpeta donde se almacenan los screenshots tomados al ejecutar el proyecto
│ ├── features/ # Archivos de características de Cucumber 
│ ├── hook/ # Hooks de Cucumber que se ejecutan al iniciar (crea el navegador y la pagina) y finalizar las prueba (cierra la pagina y el navegador) 
│ ├── images/ # Carpeta de imagenes que son utilizadas para las pruebas (en este caso una foto de perfil)
│ ├── pages/ # Clases en las que se almacenan los localizador y las acciones a realizar con dichos localizadores (POM)
│ ├── stepdefinitions/ # Definiciones de pasos para las pruebas 
│ └── utils/ # Funciones y utilidades auxiliares (actualmente solo posee la funcion de tomar las capturas de pantalla y retornar un path indicando la ubicacion de dichas capturas para luego ser adjuntadas al reporte de Allure)
├── package.json # Archivo de configuración del proyecto 
├── cucumber.json # Configuración de Cucumber
├── reporter.js # Script que genera el reporte de Allure
├── tsconfig.json # Configuracion de TypeScript
└── README.md # Breve resumen del proyecto
```# orangehrm-automation
# orangehrm-automation
# orangehrm-automation
