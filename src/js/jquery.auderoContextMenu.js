'use strict';

(function(factory) {
   /* istanbul ignore next */
   if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory);
   } else if (typeof module === 'object' && module.exports) {
      module.exports = function(root, jQuery) {
         if (jQuery === undefined) {
            jQuery = typeof window !== 'undefined' ? require('jquery') : require('jquery')(root);
         }

         factory(jQuery);

         return jQuery;
      };
   } else {
      factory(jQuery);
   }
}(function($) {
   /**
    * The jQuery plugin namespace
    *
    * @external "jQuery.fn"
    * @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
    */

   /**
    * @typedef SettingsHash
    * @type {Object}
    * @property {string} idMenu=null The ID of the menu to show
    * @property {?number} [posX=null] The X coordinate used to show the menu
    * @property {?number} [posY=null] The Y coordinate used to show the menu
    * @property {boolean} [bindLeftClick=false] If the menu is shown when the left button of the mouse is clicked
    */

   /**
    * @typedef MethodsHash
    * @type {Object}
    * @property {init} init The method to initialize the plugin
    * @property {destroy} destroy The method to frees the space of the data
    */

   /**
    * The namespace used to store the data
    *
    * @type {string}
    */
   var namespace = 'audero-context-menu';

   /**
    * Creates a custom namespace based on the provided ID
    *
    * @param {string} idMenu The ID of the element used to seed the creation of the custom namespace
    *
    * @return {string}
    */
   function localeNamespace(idMenu) {
      return namespace + '-' + idMenu;
   }

   /**
    * Frees up the space of the data
    *
    * @callback destroy
    *
    * @param {jQuery} $elements The jQuery collection to work with
    *
    * @return {jQuery}
    */
   function destroy($elements) {
      $elements.each(function() {
         var $this = $(this);
         var options = $this.data(namespace);

         if (options && options.idMenu) {
            // Hide the menu if it's currently visible
            $('#' + options.idMenu).hide();

            $this
               .removeData(namespace)
               .off('.' + localeNamespace(options.idMenu));
         }
      });

      $('html').off('.' + namespace);

      return $elements;
   }

   /**
    * Initializes the plugin
    *
    * @callback init
    *
    * @param {jQuery} $elements The jQuery collection to work with
    * @param {(SettingsHash|string)} options An object of options or the ID of the menu to show
    *
    * @return {jQuery}
    */
   function init($elements, options) {
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
      } else if (
         $elements.filter(function() {
            return $(this).data(namespace);
         }).length !== 0
      ) {
         $.error('The plugin has already been initialized');
      }

      $elements.data(namespace, options);

      var currentNamespace = localeNamespace(options.idMenu);

      // The menu is hidden when the plugin is initialized.
      // It is only shown when required.
      var $menu = $('#' + options.idMenu).hide();

      // Hide the menu if the user clicks outside the elements specified
      $('html').on(
         'contextmenu.' + currentNamespace + ' click.' + currentNamespace,
         function() {
            $menu.hide();
         }
      );

      $elements.on(
         'contextmenu.' + currentNamespace + (options.bindLeftClick ? ' click.' + currentNamespace : ''),
         function(event) {
            event.preventDefault();
            event.stopPropagation();

            var posX = options.posX === null ? event.pageX : options.posX;
            var posY = options.posY === null ? event.pageY : options.posY;

            $menu
               .css({
                  top: posY,
                  left: posX
               })
               .show();
         }
      );

      return $elements;
   }

   /**
    * The object containing all the public methods
    *
    * @type {MethodsHash}
    */
   var methods = {
      init: init,
      destroy: destroy
   };

   /**
    * Shows a custom context menu on one or more specified elements
    *
    * @function external:"jQuery.fn".auderoContextMenu
    *
    * @param {(SettingsHash|string)} method The options to initialize the plugin or the name of the method to call
    *
    * @return {jQuery}
    */
   $.fn.auderoContextMenu = function(method) {
      var args = Array.prototype.slice.call(arguments);

      if (methods[method]) {
         return methods[method].apply(this, [this].concat(args.splice(0, 1)));
      } else if ($.type(method) === 'object' || $.type(method) === 'string') {
         return methods.init.apply(this, [this].concat(args));
      } else {
         $.error('Method ' + method + ' does not exist on jQuery.auderoContextMenu');
      }
   };

   /**
    * The default options of the plugin
    *
    * @type {SettingsHash}
    */
   $.fn.auderoContextMenu.defaults = {
      idMenu: null,
      posX: null,
      posY: null,
      bindLeftClick: false
   };
}));