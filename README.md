# n-lab Zero
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
> ##### Import your css files as a ```JSON``` object inside ```_assets/css/config-css.json```

##### Example :  ```_assets/css/config-css.json```

```json
{
  "development": [
    {
      "name": "some-css",
      "file": "_assets/css/files/some-file.css"
    }
  ]
}
```

#### Javascript :
> ##### Import your files as a ```JSON``` object inside ```development``` array.
> ##### set name in ```name``` property, file location and file name in ```file``` property.
> ##### Import your js files as a ```JSON``` object inside ```_assets/js/config-js.json```

##### Example :  ```_assets/js/config-js.json```

```json
{
  "development": [
    {
      "name": "some-js",
      "file": "_assets/js/files/some-file.js"
    }
  ]
}
```

#### SASS :
> ##### Import your files using ```@import``` at rule.
> ##### file location and file name as ```sass``` string.
> ##### Import your scss files using ```@import``` at rule inside ```_assets/sass/config-sass.scss```

##### Example :  ```_assets/sass/config-sass.scss```

```scss
@import `./files/some-sass.scss`;
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

grunt javascript // concat js files inside _assets/js/files

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
 
