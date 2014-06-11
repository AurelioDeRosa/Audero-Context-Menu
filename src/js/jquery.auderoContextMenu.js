/*
 * Audero Context Menu is a cross-browser jQuery plugin that allows
 * you to show a custom context menu on one or more specified elements.
 *
 * @author  Aurelio De Rosa <aurelioderosa@gmail.com>
 * @version 2.3.1
 * @link    https://github.com/AurelioDeRosa/Audero-Context-Menu
 * @license Dual licensed under MIT (http://www.opensource.org/licenses/MIT)
 * and GPL-3.0 (http://opensource.org/licenses/GPL-3.0)
 */
(function($) {
   'use strict';

   var namespace = 'audero-context-menu';
   var localeNamespace = function(idMenu) {
      return namespace + '-' + idMenu;
   };

   var methods = {
      init: function(options) {
         if (typeof options === 'string') {
            options = {
               idMenu: options
            };
         }
         options = $.extend(true, {}, $.fn.auderoContextMenu.defaults, options);

         if (!options.idMenu) {
            $.error('No menu specified');
         } else if (document.getElementById(options.idMenu) === null) {
            $.error('The menu specified does not exist');
         }

         methods.destroy.call(this);
         this.data(namespace, options);
         var currentNamespace = localeNamespace(options.idMenu);

         // Hide the menu if the user clicks outside the elements specified
         $('html').on(
            'contextmenu.' + currentNamespace + ' click.' + currentNamespace,
            function() {
               $('#' + options.idMenu).hide();
            }
         );

         this.on(
            'contextmenu.' + currentNamespace + (options.bindLeftClick ? ' click.' + currentNamespace : ''),
            function(event) {
               event.preventDefault();
               event.stopPropagation();

               var posX = (options.posX === null) ? event.pageX : options.posX;
               var posY = (options.posY === null) ? event.pageY : options.posY;
               $('#' + options.idMenu)
                  .css({
                     top: posY,
                     left: posX
                  })
                  .show();
            }
         );

         return this;
      },
      destroy: function() {
         this
            .each(function () {
               var $this = $(this);
               var options = $this.data(namespace);
               if (options !== undefined) {
                  // Hide the menu if it's currently visible
                  $('#' + options.idMenu).hide();

                  $this
                     .removeData(namespace)
                     .off('.' + localeNamespace(options.idMenu));
               }
            });

         $('html').off('.' + namespace);

         return this;
      }
   };

   $.fn.auderoContextMenu = function(method) {
      if (methods[method]) {
         return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || typeof method === 'string' || !method) {
         return methods.init.apply(this, arguments);
      } else {
         $.error('Method ' + method + ' does not exist on jQuery.auderoContextMenu');
      }
   };

   $.fn.auderoContextMenu.defaults = {
      idMenu: null,        // string (required). The id of the menu that has to be shown
      posX: null,          // number (optional). The X coordinate used to show the menu
      posY: null,          // number (optional). The Y coordinate used to show the menu
      bindLeftClick: false // boolean (optional). If the menu has to be shown also on mouse left button click
   };
})(jQuery);