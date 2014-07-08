/**
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
**/
(function ($) {
    var interval, identifier = 'intloader'; //global vars
    $.intLoader = function (options) {

        //ensures that only one loader is displayed on the page at a time
        if ($('.' + identifier).length) {
            return;
        }

        //local variables are set here
        var i = 0,
            el,
            mask,
            elNode,
            parentNode;

        options = $.extend({
            appendTo: 'body',
            duration: 2,
            content: ['Please wait', 'Still working', 'Umm..this is taking longer than usual', 'Well...this is embarrassing', 'Have you checked the latest season of Its always sunny', 'Patience is a great virtue ;)'],
            loop: false,
            defaultStyle: true,
            width: 200,
            zIndex: 100000,
            image: 'data:image/gif;base64,R0lGODlhEAALAPQAAP///3yGe+zu7Ofp5/T19ICJf3yGe5Sck7/Ev660rdze246XjaKposPIw7C2r97g3ZCYj3+IfqSrpPLz8uvt6/n6+ZmhmO3u7fj5+Nrc2c7SzuTm5Pb39nyGe3yGe3yGeyH5BAkLAAAAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7'
        }, options);

        //set parent node
        parentNode = $(options.appendTo);

        //initialize the loader
        el = $('<div class="' + identifier + '"><img src="' + options.image + '"/><p>' + options.content[i] + '</p></div>');
        //set positioning css. some of it can be overridden by options
        el.css({
            position: 'absolute',
            width: options.width,
            zIndex: options.zIndex
        });

        //initialize the mask
        mask = $('<div class="' + identifier + '-mask"></div>');
        mask.css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: options.zIndex - 1
        });

        //set styling css. these can be overridden by external css
        if (options.defaultStyle) {
            el.css({
                textAlign: 'center',
                font: '14px Arial',
                backgroundColor: '#FFF',
                border: '1px solid #999',
                boxShadow: '0 0 25px 2px #333',
                padding: '10px 5px',
                wordWrap: 'break-word'
            });
            mask.css({
                backgroundColor: '#FFFFFF',
                opacity: 0.5
            });
        }

        if (parentNode.css('position') === '' || parentNode.css('position') === 'static') {
            parentNode.css({
                position: 'relative'
            });
        }

        $(function () {
            //add loader and mask to DOM
            parentNode.append(el, mask);

            //adjust loader centrally on the parent
            elNode = $('.' + identifier);
            elNode.css({
                top: options.fixedTop || (parentNode.outerHeight() - elNode.outerHeight()) * 50 / parentNode.outerHeight() + '%',
                left: (parentNode.outerWidth() - elNode.outerWidth()) * 50 / parentNode.outerWidth() + '%'
            });
        });


        // Sets interval to loop messages
        clearInterval(interval);
        interval = setInterval(function () {
            i = i + 1;
            if (i >= options.content.length) {
                if (options.loop) {
                    i = 0;
                } else {
                    clearInterval(interval);
                    return false;
                }
            }
            $('.' + identifier + ' > p').text(options.content[i]);

        }, options.duration * 1000);
    };

    //hide loader
    $.intLoader.hide = function () {
        $('.' + identifier).remove();
        $('.' + identifier + '-mask').remove();
        clearInterval(interval);
    };

}(jQuery));