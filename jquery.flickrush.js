/*
 * Flickrush 1.2 - A jQuery flickr plugin
 *
 * Copyright (c) 2010 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Revision: $Id: jquery.flickrush.js 2012-08-27 $ 
 *
 */
(function($){

	$.fn.flickrush=function(options)
	{

		var defaults = {
			limit:3,
			random:true,
			id:'44499772@N06',
			tags:false, /* comma separated value: 'tagsone,tagstwo,totango' */
			ssl:false
		};

		var options = $.extend(defaults,options);

		var flickrurl;

		if(defaults.ssl == false){
			flickrurl = "http://api.flickr.com/services/feeds/photos_public.gne?format=json";
		} else {
			flickrurl = "https://secure.flickr.com/services/feeds/photos_public.gne?format=json";
		}

		if(defaults.tags != false){
			flickrurl += '&tags=' + defaults.tags;
		}

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
				,	flickrImages = []
				,	i;
				
				// Loop through each image item
				$.each(data.items, function(i,item)
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

				});

				// Mix the order of flickr images if required
				if(defaults.random === true)
				{
					// Randomise the image array order
					flickrImages.sort(function() { 
						return 0.5 - Math.random();
					});	
				}

				// append flickr images to the specified DOM element 
				for (var i = 0; i < flickrImages.length; i++) {
					$(act).append(flickrImages[i]);
				};
			});
			
		});
	}
})(jQuery);
