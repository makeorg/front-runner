function extractHostname(url) {
   var hostname;
   if (url.indexOf("://") > -1) {
       hostname = url.split('/')[2];
   }
   else {
       hostname = url.split('/')[0];
   }
   hostname = hostname.split(':')[0];
   hostname = hostname.split('?')[0];
   return hostname;
}
function extractAnchor(url) {
   urlParts = url.split('#');
   if (urlParts.length > 1) {
       return urlParts[1];
   }
   return "";
}
var referer = extractHostname(document.referrer);
var anchor = extractAnchor(window.location.href);
if (referer == "r.orange.fr" && (anchor == "" || anchor == "/" || anchor.toLowerCase() == "/fr")) {
 window.location.replace("https://about.make.org/about-mieux-vivre-ensemble?utm_campaign=mve&utm_source=orange&utm_medium=redirect")
}

var configuration = {
   "apiUrl": "https://api.preprod.makeorg.tech",
   "googleAppId": "810331964280-qtdupbrjusihad3b5da51i5p66qpmhmr.apps.googleusercontent.com",
   "googleAdWordsId": "AW-819115721",
   "facebookAppId": "317128238675603",
   "detectedCountry": "FR",
   "forcedCountry": ""
}
var exports = window;
exports.require = window["makeApp"].require;

// polyfill for Object.assign
if (typeof Object.assign != 'function') {
 // Must be writable: true, enumerable: false, configurable: true
 Object.defineProperty(Object, "assign", {
   value: function assign(target, varArgs) { // .length of function is 2
     'use strict';
     if (target == null) { // TypeError if undefined or null
       throw new TypeError('Cannot convert undefined or null to object');
     }

     var to = Object(target);

     for (var index = 1; index < arguments.length; index++) {
       var nextSource = arguments[index];

       if (nextSource != null) { // Skip over if undefined or null
         for (var nextKey in nextSource) {
           // Avoid bugs when hasOwnProperty is shadowed
           if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
             to[nextKey] = nextSource[nextKey];
           }
         }
       }
     }
     return to;
   },
   writable: true,
   configurable: true
 });
}

// Facebook tracking
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '260470104426586');
fbq('track', 'PageView');

// Google tracking
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-819115721');

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-97647514-1');
