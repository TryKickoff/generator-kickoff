# <%= projectName %>
> <%= projectDescription %>

## Front-end source files
Front-end source files can be found in the `./assets/src` directory. These compile to the `./assets/dist/*` directory.

## Deployment
Use `npm run deploy` to compile & compress static assets in CI environments.

## Local development
Kickoff uses [Grunt.js](http://gruntjs.com) to compile javascript, scss & to compress image assets.

### Watch files and run a static server
Run `grunt`

### Compile, then watch files (without static server)
Run `grunt watcher`

### Compile assets for deployment: compress scss, images & js
Run `grunt compile --release`

### All tasks
| Command | Description |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `npm run compile:css` | [Sass](http://sass-lang.com/) ([Libsass](http://sass-lang.com/libsass) via [node-sass](https://github.com/sass/node-sass)), [Postcss](http://postcss.org/) with [Autoprefixer](https://github.com/postcss/autoprefixer), [CSSNano](https://github.com/ben-eb/cssnano), Source Maps & more..  |
| `npm run compile:js` | [Babel](http://babeljs.io/), [Webpack](http://webpack.github.io/) |
| `npm run compile:svg` | Auto-generated [SVG sprites](https://github.com/w0rm/gulp-svgstore) |
| `npm run compress:images` | Image compression with [imagemin](https://www.npmjs.com/package/gulp-imagemin) |
| `npm run compile:all` | Compile all the things |
| `npm run watch` | Watch all files for changes |
| `npm start` | Basic dev server using [Browsersync](http://www.browsersync.io/) |
| `npm run lint:js` | Lint JS using [xo](https://github.com/sindresorhus/xo) |
| `npm run fix:js` | Fix JS linting issues using [xo](https://github.com/sindresorhus/xo) |
| `npm run lint:css` | Lint CSS using [stylelint](https://github.com/stylelint/stylelint). We use the [https://github.com/stylelint/stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) rules for our linting |
| `npm run compile:release` | Add the `--release` flag to any other task, e.g. `gulp javascript --release` or `gulp css --release` |
| `npm run deploy` | Compile all assets for production deployment |
| `npm test` | Run javascript and css tests |
| `npm run release-patch` | Creates a patch release using [release-it](https://github.com/webpro/release-it)  |
| `npm run release-minor` | Creates a minor release using [release-it](https://github.com/webpro/release-it) |
| `npm run release-major` | Creates a major release using [release-it](https://github.com/webpro/release-it) |
| `npm run release-premajor` | Creates a premajor release using [release-it](https://github.com/webpro/release-it) |

## Developers:
<%= devNames %>


---
[![](http://i.imgur.com/PiqudTY.png)](http://trykickoff.com)

This project uses Kickoff, a front-end framework for creating scalable and responsive sites. For documentation and to find out more, please visit [trykickoff.com](http://trykickoff.com)
