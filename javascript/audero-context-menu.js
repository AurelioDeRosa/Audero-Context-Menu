/*
 * "Audero Context Menu" is a jQuery plugin that allows you to show a custom context
 * menu on one or more specified elements. You are able to specify a different
 * custom menu on different elements. The code is correlated with a CSS file that
 * must be included in the page in which you want to use this plugin.
 *
 * LICENSE: "Audero Context Menu" (from now on "The software") is released under
 * the CC BY 3.0 ("Creative Commons Attribution 3.0") license.
 * More details can be found here: http://creativecommons.org/licenses/by/3.0/
 *
 * WARRANTY: The software is provided "as is", without warranty of any kind,
 * express or implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose and noninfringement. In no event shall the
 * authoes or copyright holders be liable for any claim, damages or other
 * liability, whether in an action of contract, tort or otherwise, arising from,
 * out of or in connection with the software or the use or other dealings in
 * the software.
 *
 * @author   Aurelio De Rosa <aurelioderosa@gmail.com>
 * @version  1.0
 * @license  http://creativecommons.org/licenses/by/3.0/ CC BY 3.0
 * @link     https://bitbucket.org/AurelioDeRosa/auderocontextmenu
 */
(function($)
{
   // This object has the default values used for the menu
   var defaultValues = {
      'idMenu': null, // The id of the menu that has to be shown
      'posX': null, // The X coordinate used to show the menu.
      'posY': null // The X coordinate used to show the menu.
   };

   // The object that contains the settings for all the elements and
   // menu specified by the user.
   var elementsSettings = {};

   // The methods of the plugin
   var methods =
   {
     /**
      * Initialize the settings to show the context menu.
      * @param options object|string An object with the paramaters for the menu.
      * The possible values can be seen looking at the global var "defaultValues".
      * If a string is provided, it is used as the id of the menu to show. If the
      * one of the coordinates value null, the current position of the mouse will be used.
      */
      init: function(options)
      {
         if (typeof options !== 'object')
            options = {'idMenu': options};

         var settings = $.extend({}, defaultValues, options);
         var id = this.attr('id');

         if (settings.idMenu == undefined || settings.idMenu == null)
            $.error('No menu specified');

         // Add or updated the settings
         elementsSettings[id] = settings;

         // The function hide all the menu if a left-click or right-click is done
         // outside the elements specified by the user which are in "elementSettings"
         $('html').on(
            'contextmenu click',
            function()
            {
               methods.hide(elementsSettings[id].idMenu);
            }
         );

         this.on(
            'contextmenu auderoContextMenu',
            function(event)
            {
               event.preventDefault();
               event.stopPropagation();

               var params = $.extend({}, elementsSettings[id]);
               if (elementsSettings[id].posX == null || elementsSettings[id].posY == null)
               {
                  params.posX = event.pageX;
                  params.posY = event.pageY;
               }
               methods.show(params, event, id);

               return false;
            }
         );
      },
     /**
      * The method used to actually show the menu.
      * @param params object|string An object with the paramaters for the menu.
      * The possible values can be seen looking at the global var "defaultValues".
      * If a string is provided, it is used as the id of the menu to show. If the
      * one of the coordinates value null, the current position of the mouse will be used.
      * @param event object (optional) The event that fired the method call.
      * @param idElem string (optional) The id of the element which the menu is attached.
      */
      show: function(params, event, idElem)
      {
         var idMenu;

         if (event != undefined)
         {
            event.preventDefault();
            event.stopPropagation();
         }

         if (typeof params === 'object')
             idMenu = params.idMenu;
         else
            idMenu = params;

         if (idMenu == undefined && elementsSettings[idElem] == undefined)
            $.error('No menu specified');

         if (idMenu == undefined)
            idMenu = elementsSettings.idMenu;

         methods.hide(idMenu);

         if (typeof params !== 'object' || params.posX == undefined || params.posY == undefined)
         {
            if (event == undefined)
            {
               params = {
                  'idMenu': params,
                  'posX': 0,
                  'posY': 0
               }
            }
            else
            {
               params = {
                  'idMenu': params,
                  'posX': event.pageX,
                  'posY': event.pageY
               }
            }
         }

         // Ensure to cut off the 'px' string that may occur.
         params.posY = parseInt(params.posY);
         params.posX = parseInt(params.posX);

         $('#' + idMenu)
         .css('top', params.posY + 'px')
         .css('left', params.posX + 'px')
         .show();

         return false;
      },
     /**
      * The recursive method used to hide one or more menu.
      * @param id array|string If id is null or not defined, all the menu in
      * "elementsSettings" will be hidden. Else an array of id or a single id can
      * be provided. In this case only the specified menu will be hidden.
      */
      hide: function(id)
      {
         if (id == undefined || id == null)
         {
            for(var Key in elementsSettings)
               methods.hide(elementsSettings[Key].idMenu);
         }
         else if ($.isArray(id))
         {
            for(i = 0; i < id.length; i++)
               methods.hide(id[i]);
         }
         else
            $('#' + id).hide();
      }
   };

   $.fn.auderoContextMenu = function(method)
   {
      if (methods[method])
         return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      else if (typeof method === 'object' || typeof method === 'string' || ! method)
         return methods.init.apply(this, arguments);
      else
         $.error('Method ' +  method + ' does not exist on jQuery.auderoContextMenu');
   };
})(jQuery);