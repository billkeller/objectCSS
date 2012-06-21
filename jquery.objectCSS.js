/**
 * objectCSS plugin for jQuery
 * v1.0
 * Highlight your abstracted Objects.
 *
 * By Bill Keler, ghettocooler.net
 *
 */

/**
 * Usage:
 *
 * From JavaScript, use:
 *     $(<select>).objectCSS({depth: <x>});
 *     where:
 *       <select> is the DOM node selector, e.g. ".media"
 *       <x> is 0, 1 or 2, representing the level of the objects children that you'd like visualized
 */

(function($) {

	// jQuery plugin definition
	$.fn.objectCSS = function(params) {

		// merge default and user parameters
		params = $.extend( {depth: 0}, params);

		this.each(function() { 
			parentClass = $(this).attr('class');
				if (parentClass == undefined) {
					var parentClass = '';
				} else {
					parentClass = '.'+ parentClass;
					parentClass = parentClass.replace(/ /g, '.');
				}
			console.log(parentClass);			
			$(this).not('.css-obj').css({
				'outline' : '1px dotted red',
				'position' : 'relative',
				}).prepend('<div class="css-obj css-obj-parent">'+ parentClass +'</div>');
	
			if (params.depth >= '1') {
				$(this).children().not('.css-obj').each(function() {
					var thisClass = $(this).attr('class');
					if (thisClass == undefined) {
						var thisClass = '';
					} else {
						thisClass = '.'+ thisClass;
						thisClass = thisClass.replace(/ /g, '.');
					}
					$(this).addClass('css-obj-child-parent')
						.prepend('<div class="css-obj css-obj-child">'+ thisClass +'</div>');
				});
			};
	
			if (params.depth >= '2') {
				$(this).children().not('.css-obj').children().not('.css-obj').each(function() {
					var thisTag = this.nodeName.toLowerCase();
					var thisClass = $(this).attr('class');
					if (thisClass == undefined) {
						var thisClass = '';
					} else {
						thisClass = '.'+ thisClass;
						thisClass = thisClass.replace(/ /g, '.');
					}
					$(this).addClass('css-obj-child2-parent').prepend('<div class="css-obj css-obj-child2">'+ thisTag + thisClass +'</div>');
				});
			};
		});
		// allow jQuery chaining
		return this;
	};

})(jQuery);


/*
	// for each object, accept an array of parent elements
	$('.media').css({
		'outline' : '1px dotted green',
		'position' : 'relative',
		}).prepend('<div class="css-obj css-obj-parent">.media</div>');
	
	// Get class-names of each direct sibling
	var directSibling = '';
	
	// accept # of children that are highlightable
	$('.media > *').not('.css-obj').each(function() {
		directSibling = $(this).attr('class');
		$(this).css({
		'outline' : '1px dotted red',
		}).prepend('<div class="css-obj css-obj-child">.'+ directSibling +'</div>');
	});
*/