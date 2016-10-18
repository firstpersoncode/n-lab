var packages = require( '../package.json' ),
    appConfig = require( '../appConfig.json' ),
    dt = new Date(),
    d = dt.getDate(),
    m = dt.getMonth(),
    y = dt.getFullYear(),
    h = dt.getHours(),
    mn = dt.getMinutes();

module.exports = {
  taskName: {
    options: {
      position: 'top',
      banner: `/*==================================================================================================
  ${appConfig.project.toString()} - Version ${appConfig.version.toString()}
  ${d}/${m}/${y} ${h}:${mn}

  ${appConfig.description.toString()}
  @${y} ${appConfig.author.name}
  ${appConfig.author.website}
  ${appConfig.author.email}
  ${appConfig.author.company}

  ${packages.name} - ${packages.version}
==================================================================================================*/
`,
      linebreak: true
    },
    files: {
      src: [ '.dist/*.js', '.dist/*.css' ]
    }
  }
};