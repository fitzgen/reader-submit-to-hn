_hn = {

    main: function ($) {
	this.attach_links($);
    },

    attach_links: function($) {
	// Attach Hacker News links to the bottom of each entry.
	var hn_link = $("<span class=\"submit-to-hn link\">Hacker News</span>");
	var actions = $("div.entry-actions");
	actions.append(hn_link);

	// Assigning the click function to ``hn_link`` and then
	// appending it doesn't work, we must attach the event after
	// the links have been created.
	actions.find("span.submit-to-hn").click(function (event) {
		var title_link = $(this).parent().parent().parent().find("h2 a.entry-title-link");
		var url = encodeURIComponent(title_link.attr("href"));
		var title = encodeURIComponent(title_link.text());

		// Open the submission page with url and title filled
		// in already.
		window.open(["http://news.ycombinator.com/submitlink?u=",
			     url,
			     "&t=",
			     title].join(""), 
			    "_blank");
	    });
    },

    init: function () {
	// Wait for jQuery to load before beginning.
	if (typeof jQuery === "undefined") {
	    setTimeout(arguments.callee, 10);
	} else {
	    jQuery.noConflict();
	    this.main(jQuery);
	}
    },
};

// Attach jQuery to the page and then we can get started!
(function (hn) {
    var jq = document.createElement("script");
    jq.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
    jq.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(jq);
    hn.init();
}(_hn));
