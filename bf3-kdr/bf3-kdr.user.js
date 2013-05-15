// ==UserScript==
// @version		1.0
// @name		BF3 KDR Precision
// @namespace	http://bbrks.me/userscripts
// @description	Display K/D Ratio with greater precision in BF3 Battlelog
//
// @downloadURL	https://raw.github.com/bbrks/userscripts/master/bf3-kdr/bf3-kdr.user.js
// @updateURL	https://raw.github.com/bbrks/userscripts/master/bf3-kdr/bf3-kdr.meta.js
//
// @include		*battlelog.battlefield.com/bf3/*
// @grant		none
// ==/UserScript==

// Calculates KDR from the kills and deaths elements
function getKDR() {
	// Hardcoded DOM positions because battlelog isn't providing element IDs! :(
	var kills = parseInt(document.getElementsByClassName("profile-venicestats-overview-table-label")[9].nextElementSibling.innerHTML.replace(/,/g,''));
	var deaths = parseInt(document.getElementsByClassName("profile-venicestats-overview-table-label")[10].nextElementSibling.innerHTML.replace(/,/g,''));
	var kdr = kills / deaths;
	return kdr;

}

// Adds mouse events to the KDR element
function displayKDR(kdr) {
	var kdr_el = document.getElementsByClassName("profile-venicestats-overview-highlight-stat-value")[3];

	kdr_el.onmouseover = function(){
		kdr_el.innerHTML = kdr.toFixed(4);
		kdr_el.nextElementSibling.innerHTML = kdr.toFixed(8);
	};

	kdr_el.onmouseout  = function(){
		kdr_el.innerHTML = kdr.toFixed(2);
		kdr_el.nextElementSibling.innerHTML =
			document.getElementsByClassName("profile-venicestats-overview-table-label")[9].nextElementSibling.innerHTML+" Kills";
	};
}

// Monitor the page for changes, since Battlelog updates dynamically
setInterval(function() {
	// Check we're on the stats page
	if (document.URL.match("^http://battlelog.battlefield.com/bf3/soldier/")) {
		displayKDR(getKDR());
	}
}, 500);
