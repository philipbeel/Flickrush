/*
 * Flickrush 1.0 - jQuery flickr plugin
 *
 * Copyright (c) 2010 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Revision: $Id: jquery.flickrush.js 2010-02-17 $ 
 *
 */
(function($){
	$.fn.flickrush=function(options){ 
		var defaults={
			limit:3,
			random:true,
			id:'44499772@N06'
		};
		var options=$.extend(defaults,options);
		return this.each(function(options){
			var act=$(this); 
			$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?format=json&id="+defaults.id+"&jsoncallback=?",
		  	function(data){
				var num = 0; //get a random integer
				var imageArray = new Array(); //store used images in here 
				while( num <= defaults.limit-1) {
					if(defaults.random == true) {
						var randomiser = Math.floor(Math.random()*20);
					} 
			   		$.each(data.items, function(i,item){
			   			if(defaults.random == true) {
							if( ( i == randomiser ) && (!imageArray.in_array(randomiser) ) ) {
								var newImage = $("<img/>").attr({
									src: item.media.m,
									alt: item.tags,
									width: defaults.width
								});
								$(act).append(newImage); 
			   				}
			   			} else {
							if( ( i <= defaults.limit-1 ) && (!imageArray.in_array(defaults.limit-1) ) ) {
								var newImage = $("<img/>").attr({
									src: item.media.m,
									alt: item.tags
								});
								$(act).append(newImage);
			   				}
			   			}
			       	});	
			       	if(defaults.random == true) {
						if ( imageArray.in_array(randomiser) ) {
							defaults.limit++;	
						} 
						//strore our image number
						imageArray.push(randomiser);					
					} else {
						imageArray.push(defaults.limit-1);					
					}
					num++; 	       					
				}
		  	});
		 	
			//function to check in an array
		  	Array.prototype.in_array = function(p_val) {
				for(var i = 0, l = this.length; i < l; i++) {
					if(this[i] == p_val) {
						return true;
					}
				}
				return false;
			}			
		});
	}
})(jQuery);