# n-lab
##### Nasser's work environtment


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

### tasks
concat every js files into main.js, and every css files into main.css
```shell
grunt
```
#### *main.js :*
```javascript
//concat bootstrap.js, jquery.js, plugins.js, and modules.js
grunt jquery-bootstrap-plugins-modules

//concat bootstrap.js, plugins.js, and modules.js
grunt bootstrap-plugins-modules

//concat jquery.js, plugins.js, and modules.js
grunt jquery-plugins-modules

//concat jquery.js, bootstrap.js, and modules.js
grunt jquery-bootstrap-modules

//concat bootstrap.js, and modules.js
grunt bootstrap-modules

//concat jquery.js, and modules.js
grunt jquery-modules

//concat plugins.js, and modules.js
grunt plugins-modules

//modules.js only
grunt modules
```

#### *main.css :*
```javascript
//concat bootstrap.css, compiled-custom-sass.css, custom.css, compiled-mobile-sass.css, and mobile.css
grunt bootstrap-sass-css

//concat bootstrap.css, compiled-custom-sass.css, and compiled-mobile-sass.css
grunt bootstrap-sass

//concat bootstrap.css, custom.css, and mobile.css
grunt bootstrap-css

//concat compiled-custom-sass.css, custom.css, compiled-mobile-sass.css, and mobile.css
grunt sass-css

//concat compiled-custom-sass.css, and compiled-mobile-sass.css
grunt sass

//concat custom.css, and mobile.css
grunt css
```
