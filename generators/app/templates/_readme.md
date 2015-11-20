# <%= projectName %>
<%= projectDescription %>

## Front-end source files
Front-end source files can be found in the `./assets/src` directory. These compile to the `./assets/dist/*` directories.

## Deployment
Use `npm run deploy` to compile & compress static assets in CI environments.

## Local development
Kickoff uses Grunt.js to compile javascript, scss & to compress image assets.

### Watch files and run a static server
Run `grunt`

### Watch files without static server
Run `grunt watcher`

### Compile and compress scss, images & js
Run `grunt compile --release`

## Developers:
<%= devNames %>


---
This project uses Kickoff, a front-end framework for creating scalable and responsive sites. For documentation and to find out more, please visit [trykickoff.com](http://trykickoff.com)
