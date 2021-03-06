/**
 * <%= projectName %>
 * @description
 * @author <%= devNames %>
 *
 * Need help using JSDoc? Find out more at http://usejsdoc.org/
 */

// their code e.g. npm modules
import ready from 'lite-ready'; // DOM readyhttps://github.com/nicbell/liteready
import svg4everybody from 'svg4everybody';<% // https://github.com/jonathantneal/svg4everybody

if (includeAttach) {%>
import attach from 'attach.js';<% // http://nicbell.github.io/attach.js/
}

if (includeAxios) {%>
import axios from 'axios';<% // https://github.com/mzabriskie/axios
}

if (includeLodash) {%>
import _ from 'lodash';<% // https://lodash.com/
}

if (includeSwiftclick) {%>
import SwiftClick from 'swiftclick';<% // https://github.com/munkychop/swiftclick
}

if (includeTrak) {%>
import trak from 'trak.js';<% // https://github.com/mrmartineau/trak.js
}

if (includeFlickity) {%>
import flickity from 'flickity';<% // http://flickity.metafizzy.co
}

if (includeDominus) {%>
import $ from 'dominus';<% // https://github.com/bevacqua/dominus
}

if (includeJquery && !includeDominus) {%>
import $ from 'jquery';<% // https://jquery.com/
}%>

// Bundle global libs that don't return a value
import 'console';
<% if (includeLazysizes) {%>
// Lazyload & responsive images - https://github.com/aFarkas/lazysizes
// import 'lazysizes/plugins/respimg/ls.respimg';
// import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';<%
} %>
// our code
// this is a test, uncomment the line below to try it
// import moduleTest from './modules/module-test';

// DOM ready code goes in here
ready(() => {<%
if (includeSwiftclick) {%>
	const swiftclick = SwiftClick.attach(document.body);
	swiftclick.useCssParser(true);<% }

	if (includeTrak) {%>
	trak.start();<% }
%>
	svg4everybody({
		polyfill: true, // polyfill <use> elements for External Content
	});

	// moduleTest(); // this is a test, uncomment this line & the line above to try it
});
