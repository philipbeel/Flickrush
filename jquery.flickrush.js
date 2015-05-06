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
				,	limit = (defaults.limit === 1) ? 10: defaults.limit
				,	integer
				,	flickrImages = [];
				
				// Loop through each image item
				data.items.forEach(function (item, i) 
				{
					
					if (i <= limit-1)
					{
						flickrImage = $("<img/>").attr({
							src: item.media.m,
							alt: item.tags
						});

						flickrImages.push(flickrImage);
					}					
				})

				if(defaults.random === true)
				{
					flickrImages.sort(function() { 
						return 0.5 - Math.random();
					});

					// Monkey patch to ensure when only 1 photo limit is passed the 
					// single item will be randomised in the response
					if(defaults.limit === 1) {
						var tmpFlickrImages = flickrImages;
						flickrImages = [];
						flickrImages.push(tmpFlickrImages[0]);
					}
				}

				// append flickr images to the specified DOM element 
				flickrImages.forEach(function (image) {
					$(act).append(image);
				});
			});
			
		});
	}
})(jQuery);
