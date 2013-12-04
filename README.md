Interactive-Loader
==================
Plugin Name: Interactive Loader
	Author: Monis Raza(mns087@gmail.com)
	Version: 1.0
	
	Note: For simplicity and plug-n-play, css/images/lang are pre-included in this file. These can be overridden ofcourse.
	
	How to: 
	1. Show loader with full body mask - 
		$.intLoader();
	2. Show loader with specific element mask - 
		$.intLoader({appendTo: '#id'});
	3. Hide loader -
		$.intLoader.hide();
	4. Options Explained- 
		$.intLoader({
			appendTo: '#id', // id/class/tag of the element where to put loader. Loader will adjust itself centrally on the element. Default is 'body' tag
			duration: 5, // Duration to change the messages. Default is 5 seconds.
			content: [], // Array of custom messages to be displayed. No max limit. For modularity, define custom messages in your lang file and provide it here as array variable.
			loop : true/false, // true - loop through the messages, false - stop at last message
			defaultStyle : true/false, // True will apply default styling-css on loader and mask(Refer #5 below). False to provide them manually through css, by defining 'intloader' and 'intloader-mask' class. 
			width: 200, // Width of the loader block. Default is 200. Height adjusts according to the content
			zIndex : 100000, // z-index of loader block. Default is 100000.
			fixedTop: 100, // To fix the top position of loader
			image: '' // Path of custom loading image. 
		});
		
	5. To set custom styling-css(text-align, font, background-color, border, box-shadow, padding, word-wrap) of the loader, set defaultStyle = false in options attribute and define css class named 'intloader' and 'intloader-mask' with custom css. Although not needed in most cases, positioning-css(width, z-index) can also be overridden by defining them in options attribute.
	
	Please report any feedback/bugs at mns087@gmail.com
