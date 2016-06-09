# <%= projectName %>
<%= projectDescription %>

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

## Developers:
<%= devNames %>


---
[![](http://i.imgur.com/PiqudTY.png)](http://trykickoff.com)

This project uses Kickoff, a front-end framework for creating scalable and responsive sites. For documentation and to find out more, please visit [trykickoff.com](http://trykickoff.com)
