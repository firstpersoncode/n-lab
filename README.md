# n-lab Starter
##### FE's work environtment


## Getting started :
* Install node.js
* Install grunt.js

Open your ```shell``` that has been set up for using node.js.

Go to project's directory
```shell
cd to/directory/project/n-lab
```

Install the module packages
```shell
npm install
```

## START development

```shell
grunt
```
#### CSS : ```_assets/css```
#### Javascript : ```_assets/js```
#### SASS : ```_assets/sass```

## PREPARE to build
#### CSS :
> ##### Import your files as a ```JSON``` object inside ```development``` array.
> ##### set name in ```name``` property, file location and file name in ```file``` property.
* ```_assets/css/custom/``` : Import your css files as a ```JSON``` object inside ```_assets/css/config-custom.json```
* ```_assets/css/mobile/``` : Import your css files as a ```JSON``` object inside ```_assets/css/config-mobile.json```

##### Example :  ```_assets/css/config-custom.json```

```json
{
  "development": [
    {
      "name": "some-custom",
      "file": "_assets/css/custom/some-file.css"
    }
  ]
}
```

#### Javascript :
> ##### Import your files as a ```JSON``` object inside ```development``` array.
> ##### set name in ```name``` property, file location and file name in ```file``` property.

* ```_assets/js/plugins/``` : Import your js files as a ```JSON``` object inside ```_assets/js/config-plugins.json```
* ```_assets/js/modules/``` : Import your js files as a ```JSON``` object inside ```_assets/js/config-modules.json```
* ```_assets/js/custom/``` : Import your js files as a ```JSON``` object inside ```_assets/js/config-modules.json```

##### Example :  ```_assets/js/config-custom.json```

```json
{
  "development": [
    {
      "name": "some-custom",
      "file": "_assets/js/custom/some-file.js"
    }
  ]
}
```

#### SASS :
> ##### Import your files using ```@import``` at rule.
> ##### file location and file name as ```sass``` string.

* ```_assets/sass/custom/``` : Import your scss files using ```@import``` at rule inside ```_assets/sass/config-custom.scss```
* ```_assets/sass/mobile/``` : Import your scss files using ```@import``` at rule inside ```_assets/sass/config-mobile.scss```

##### Example :  ```_assets/sass/config-custom.scss```

```scss
@import `./custom/some-custom.scss`;
```


## BUILD file 

Go to ```_config/``` folder, and set output target as ```JSON``` object in ```output``` array.
##### set name inside ```name``` property, location target and file name inside ```file``` property.
##### for compiled sass ! set source map location target inside ```sassmap``` property.

#### for ```css and sass``` files ```_config/css.json```
#### for ```javascript``` files ```_config/js.json```

##### Example: ```_config/css.json```
```json
{
  "output": [
    {
      "name": "main-css",
      "file": "to/directory/main.css",
      "sassmap": "to/directory/"
    }
  ]
}
```

### API

#### Javascript files :

```javascript
// in node shell

// Plugins only :
grunt plugins // concat js files inside _assets/js/plugins

// Modules only :
grunt modules // concat js files inside _assets/js/modules

// Custom only :
grunt custom // concat js files inside _assets/js/custom

// merge Plugins and Custom
grunt plugins-custom // concat files in _assets/js/plugins and _assets/js/custom then merge them together.

// merge Modules and Custom
grunt modules-custom // concat files in _assets/js/modules and _assets/js/custom then merge them together.

// merge Plugins and Modules
grunt plugins-modules // concat files in _assets/js/plugins and _assets/js/modules then merge them together.

// merge Plugins, Modules, Custom
grunt plugins-modules-custom // concat files in _assets/js/plugins, _assets/js/modules and _assets/js/custom then merge them together.

```

### CSS & SASS files
```javascript
// in node shell

// CSS only
grunt css-only // concat css files inside _assets/css/custom and _assets/css/mobile

// SASS only
grunt sass-only // concat scss files inside _assets/sass/custom and _assets/sass/mobile

// merge SASS and CSS
grunt sass-css // concat files inside _assets/sass/custom, _assets/sass/mobile, _assets/css/custom and _assets/css/mobile

```

## HAPPY CODING MY LORD !

*Nasser*
*first person code*
 
