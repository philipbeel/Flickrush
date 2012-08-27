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
			id:'44499772@N06'
		};

		var options = $.extend(defaults,options);

		return this.each(function(options)
		{
			var act = $(this)
			,	apiCall = "http://api.flickr.com/services/feeds/photos_public.gne?format=json";
		
			$.getJSON(apiCall + "&id=" + defaults.id + "&jsoncallback=?",
		
			function(data)
			{
				var flickrImage
				,	flickrImages = [];
				
				$.each(data.items, function(i,item)
				{
					if (i <= defaults.limit-1)
					{
						flickrImage = $("<img/>").attr({
							src: item.media.m,
							alt: item.tags
						});

						if (defaults.random)
							flickrImages.push(flickrImage);
					}

					if(!defaults.random)
						$(act).append(flickrImage);
				});	
					
					if (defaults.random)
					{
						console.log("come and get me!!!");
						// Randomise photos
						for (var i = 0; i < flickrImages.length; i++) {
							// Output the random photos
							// console.log(flickrImages[i]);
							$(act).append(flickrImages[Math.floor(Math.random() * flickrImages.length-1)]);
						};
					}

			});
			
		});
	}
})(jQuery);