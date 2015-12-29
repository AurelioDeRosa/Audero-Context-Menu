/* global assert, fixture */
(function() {
   'use strict';

   describe('Basic requirements', function() {
      it('should support the basic requirements', function() {
         assert.ok($, 'jQuery is loaded');
         assert.ok($.fn.auderoContextMenu, 'The plugin is loaded correctly');
         assert.ok($.fn.auderoContextMenu.defaults, 'The defaults are exposed');
         assert.deepEqual(
            $.fn.auderoContextMenu.defaults,
            {
               idMenu: null,
               posX: null,
               posY: null,
               bindLeftClick: false
            },
            'The defaults exposed are correct'
         );
      });
   });

   describe('auderoContextMenu', function() {
      var $area, $menu;

      before(function() {
         fixture.setBase('test/fixtures');
      });

      beforeEach(function() {
         fixture.load('menu.html');

         $area = $('#area');
         $menu = $('#audero-context-menu');
      });

      afterEach(function() {
         fixture.cleanup();
      });

      it('should thrown an error if called with the wrong parameters', function() {
         assert.throw(
            function() {
               $area.auderoContextMenu(100);
            },
            /Method .*? does not exist/,
            'Wrong argument type: number'
         );
         assert.throw(
            function() {
               $area.auderoContextMenu();
            },
            /Method .*? does not exist/,
            'Wrong argument type: null'
         );
         assert.throw(
            function() {
               $area.auderoContextMenu(null);
            },
            /Method .*? does not exist/,
            'Wrong argument type: null'
         );
         assert.throw(
            function() {
               $area.auderoContextMenu([]);
            },
            /Method .*? does not exist/,
            'Wrong argument type: array'
         );
         assert.throw(
            function() {
               $area.auderoContextMenu({});
            },
            /No menu specified/,
            'Unspecified menu'
         );
         assert.throw(
            function() {
               $area.auderoContextMenu('no method');
            },
            /The menu specified does not exist/,
            'Unknown menu passed via a string'
         );
         assert.throw(
            function() {
               $area.auderoContextMenu({
                  idMenu: 'unknown id'
               });
            },
            /The menu specified does not exist/,
            'Unknown menu passed via an object'
         );
      });

      describe('init', function() {
         var $areaInitialized;

         context('with basic settings', function() {
            var options = {
               idMenu: 'audero-context-menu'
            };

            beforeEach(function() {
               $areaInitialized = $area.auderoContextMenu(options);
            });

            it('should keep chainability', function() {
               assert.ok($areaInitialized, 'Menu initialized');
               assert.strictEqual($area, $areaInitialized, 'Return the same object');
            });

            it('should set up the space for the data', function() {
               assert.ok($areaInitialized.data('auderoContextMenu'), 'Correct namespace used');
               assert.deepEqual(
                  $areaInitialized.data('auderoContextMenu'),
                  $.extend({}, $.fn.auderoContextMenu.defaults, options),
                  'Correct data stored'
               );
            });

            it('should throw an error if called more than once on the same element', function() {
               assert.throw(
                  function() {
                     $area.auderoContextMenu(options);
                  },
                  /The plugin has already been initialized/,
                  'Plugin already initialized on the element'
               );
            });

            it('should show the menu when right-clicking the area with the mouse', function() {
               assert.isTrue($menu.is(':hidden'), 'The menu is hidden');

               var contextmenuEvent = $.Event('contextmenu', {
                  pageX: 10,
                  pageY: 20
               });

               $areaInitialized.trigger(contextmenuEvent);

               assert.isTrue($menu.is(':visible'), 'The menu is displayed after the click');
               assert.deepEqual(
                  $menu.css([
                     'top',
                     'left'
                  ]),
                  {
                     top: '20px',
                     left: '10px'
                  },
                  'The menu is correctly positioned'
               );
            });

            it('should hide the menu when clicking with the mouse outside the area', function() {
               $menu.show();
               $('html').click();

               assert.isTrue($menu.is(':hidden'), 'The menu is hidden');
            });
         });

         context('with full settings', function() {
            var options = {
               idMenu: 'audero-context-menu',
               posX: 30,
               posY: 30,
               bindLeftClick: true
            };

            beforeEach(function() {
               $areaInitialized = $area.auderoContextMenu(options);
            });

            it('should set up the space for the data', function() {
               assert.ok($areaInitialized.data('auderoContextMenu'), 'Correct namespace used');
               assert.deepEqual(
                  $areaInitialized.data('auderoContextMenu'),
                  $.extend({}, $.fn.auderoContextMenu.defaults, options),
                  'Correct data stored'
               );
            });

            it('should show the menu when left-clicking the area with the mouse', function() {
               assert.isTrue($menu.is(':hidden'), 'The menu is hidden');

               $areaInitialized.trigger('click');

               assert.isTrue($menu.is(':visible'), 'The menu is displayed after the click');
               assert.deepEqual(
                  $menu.css([
                     'top',
                     'left'
                  ]),
                  {
                     top: '30px',
                     left: '30px'
                  },
                  'The menu is correctly positioned'
               );
            });
         });
      });

      describe('destroy', function() {
         var $areaDestroyed;

         beforeEach(function() {
            $areaDestroyed = $area
               .auderoContextMenu('audero-context-menu')
               .auderoContextMenu('destroy');
         });

         it('should keep chainability', function() {
            assert.ok($areaDestroyed, 'Menu destroyed');
            assert.strictEqual($area, $areaDestroyed, 'Returns the same object');
         });

         it('should hide the menu', function() {
            assert.isTrue($menu.is(':hidden'), 'The menu is hidden');
         });

         it('should free up the space of the data', function() {
            assert.strictEqual($area.data('auderoContextMenu'), undefined, 'Namespaced data cleared');

            $area.trigger('contextmenu');

            assert.isTrue($menu.is(':hidden'), 'The menu is still hidden after right-clicking inside the area');
         });

         it('should not throw an error if called more than once on one or more elements', function() {
            assert.doesNotThrow(
               function() {
                  $areaDestroyed.auderoContextMenu('destroy');
               },
               Error,
               'Calling destroy again does not throw an error'
            );
         });
      });
   });
})();