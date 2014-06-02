$(document).ready(function() {
	$( function() {
		// Cache the page container element
		// for maximum efficiency!
		var $pageBody = $('#page-body');

		// Helper function to grab new HTML
		// and replace the content
		

		var replacePage = function(url, data) {
			$.ajax({
				type: 'GET',
				url: url,/*
				cache: false,
				dataType: 'html',*/
				contentType: 'application/json',
          		data: data
			}).done( function(html) {
				$pageBody.html(html);
			});
		};

		// Intercept all link clicks
		//$('body').delegate('a', 'click', function(e) {
		$("#btnComapare").click(function(e) {
			// Grab the url from the anchor tag
			var url = $(this).attr('href');
			alert("hola");
			// Detect if internal link (no http://...)
			//if (url && url.indexOf('/') === 0) {
				e.preventDefault();
				var newUrl = '/ajax'+url;
				alert(newUrl);
				// Replace the page
				var ajaxURL = $(this).attr("href");
				var gmail = $("#chkGmail").prop("checked");
				var hotmail = $("#chkHotmail").prop("checked");
				var yahoo = $("#chkYahoo").prop("checked");
				var data = JSON.stringify({gmail:gmail, hotmail:hotmail, yahoo:yahoo});
				alert(data);
				replacePage("/ajax/compare", data);
			//} else {
				// Don't intercept external links
			//}
		});
	});



/*
	$("#btnComapare").click(function() {
		var ajaxURL = $(this).attr("href");
		var gmail = $("#chkGmail").prop("checked");
		var hotmail = $("#chkHotmail").prop("checked");
		var yahoo = $("#chkYahoo").prop("checked");
		var data = JSON.stringify({gmail:gmail, hotmail:hotmail, yahoo:yahoo});
		//alert(data);
		ajaxPage(ajaxURL, data);
		

		History.pushState(null, null, ajaxURL);
	});*/
});

function ajaxPage(URL, data) {
	
	return $.ajax({
          type: "POST",
          url: "/compare",
          contentType: 'application/json',
          data: data
        }).done(function(data) {
        	
        	alert(JSON.stringify(data.table));
        	//alert(data);
        });
}






