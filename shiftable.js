/**
 * JQuery Shiftable Plugin
 *
 * Shiftable is a jQuery plugin which adds shift click highlighting functionality to a group of selectable elements.
 *
**/
(function ($, undefined) {
   $.fn.shiftable = function (opts) {
   	var elements = this,
   		selectClass = opts.selectedClass,
   		lastSelected = null,
   		lastShiftClicked = null;

   	return this.each (function (){
   		 $(this).live("click", function(e) {
   			var that = $(this),
   			checked,
   			unchecked,
   			selectBackwards;

   			e.preventDefault();
   			
   			if (e.shiftKey) {
   				if (lastSelected) {
   					if (that[0] == lastSelected[0]) {
   						return false;
   					}
   					
   					selectBackwards = that.nextAll('.lastChecked').length > 0 ? true : false;
   					
   					if (lastShiftClicked && that[0] == lastShiftClicked[0]) {
   						if (selectBackwards) {
   							unchecked = that.nextUntil(lastSelected, elements.selector);
   						}
   						else {
   							unchecked = lastSelected.nextUntil(that, elements.selector);
   						}
   						
   						unchecked.toggleClass(selectClass);
   						that.toggleClass(selectClass);
   						lastShiftClicked = null;
   						
   						return true;
   					}
   					
   					if (lastShiftClicked) {
   						var thatIdx = that.attr('idx'),
   							lastShiftClickedIdx = lastShiftClicked.attr('idx');
   						
   						if (selectBackwards && (thatIdx > lastShiftClickedIdx)) {
   							unchecked = lastShiftClicked.nextUntil(that, elements.selector);
   							unchecked.toggleClass(selectClass);
   							lastShiftClicked.toggleClass(selectClass);
   							lastShiftClicked = that;
   							
   							return true;
   						}
   						else if (!selectBackwards && (thatIdx < lastShiftClickedIdx)) {
   							unchecked = that.nextUntil(lastShiftClicked, elements.selector);
   							unchecked.toggleClass(selectClass);
   							lastShiftClicked.toggleClass(selectClass);
   							lastShiftClicked = that;
   							
   							return true;
   						}
   					}
   					
   					lastShiftClicked = that;
   					
   					if (selectBackwards) {
   						checked = that.nextUntil(lastSelected, elements.selector);
   					}
   					else {
   						checked = lastSelected.nextUntil(that, elements.selector);
   					}
   					
   					checked.addClass(selectClass);
   					lastSelected.addClass(selectClass);
   					that.addClass(selectClass);
   				}
   			}
   			else {
   				that.toggleClass(selectClass);
   				
   				if (that.hasClass(selectClass)) {
   					lastSelected = that;
   					elements.removeClass('lastChecked');
   					that.addClass('lastChecked');
   					lastShiftClicked = null;
   				}
   			
   				if ($(elements.selector + "." + selectClass).size() === 1) {
   					lastSelected = $(elements.selector + "." + selectClass);
   					elements.removeClass("lastChecked");
   					lastSelected.addClass("lastChecked");
   					lastShiftClicked = null;
   				}
   			}
   			
   			return true;
	      });
 	 });
   };
 }(jQuery));