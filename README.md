# Flickrush - A jQuery plugin to display flickr photo streams

Website : [http://theodin.co.uk](https://theodin.co.uk)  
Twitter : [@philipbeel](https://twitter.com/philipbeel)

### Descrpition
Flickrush is a jQuery plugin designed to make it quick and easy to add your flickr photo stream to any web page with minimal effort. Fully customisable you can choose the number of photos, randomise the ordering and style to fit in with any blog or web page.

### Usage
Call in the jQuery framework and jquery.flickrush.js in your webpage

	<script type="text/javascript" src="jquery.flickrush.js"></script>

Create an element on your page that you want to call your flickr photo stream into.

	<div id="flickrImages"></div>

Initiate flickrush on your selected element, pass in the specified flickr user ID. You can get this here: <http://idgettr.com/>.

	$('#flickrImages').flickrush({id:'44499772@N06' });

### Plugin parameters

```
{
  id: {String}           	// ID of the flickr user 
  limit: {Integer}     	 	// The number of photos to display 
  random: {Boolean}          // Display the photos in a random 
}
```