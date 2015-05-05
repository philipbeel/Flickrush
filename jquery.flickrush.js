/*
 * Flickrush 1.4 - A jQuery flickr plugin
 *
 * Copyright (c) 2010 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Revision: $Id: jquery.flickrush.js 2015-05-05 $ 
 *
 */
(function($){

	$.fn.flickrush=function(options)
	{

		var defaults = {
			limit:3,
			random:true,
			id:'30005186@N02',
			tags:false
		};

		var options = $.extend(defaults,options)
		,	flickrurl;

		// Is the document secure
		isSSL = (location.protocol === "https:") ? true : false ;

		if(isSSL)
			flickrurl = "https://secure.flickr.com/services/feeds/photos_public.gne?format=json";	
		else
			flickrurl = "http://api.flickr.com/services/feeds/photos_public.gne?format=json";
		

		if(defaults.tags === true)
			flickrurl += '&tags=' + defaults.tags;

		// Return each instance of the flickrush
		return this.each(function(options)
		{
			var act = $(this)
			,	apiCall = flickrurl;
		
			$.getJSON(apiCall + "&id=" + defaults.id + "&jsoncallback=?",
		
			function(data)
			{
				var flickrImage
				,	integer
				,	flickrImages = [];
				
				// Loop through each image item
				data.items.forEach(function (item, i) 
				{
					// Create an image DOM node
					if (i <= defaults.limit-1)
					{
						// Assign the image with attributes
						flickrImage = $("<img/>").attr({
							src: item.media.m,
							alt: item.tags
						});

						// Push flickr images into array
						flickrImages.push(flickrImage);
					}					
				})

				// Mix the order of flickr images if required
				if(defaults.random === true && defaults.limit >1)
				{
					// Randomise the image array order
					flickrImages.sort(function() { 
						return 0.5 - Math.random();
					});	
				}

				// append flickr images to the specified DOM element 
				flickrImages.forEach(function (image) {
					$(act).append(image);
				});
			});
			
		});
	}
})(jQuery);
