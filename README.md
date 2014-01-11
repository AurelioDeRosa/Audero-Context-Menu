# Audero Context Menu #
[Audero Context Menu](https://github.com/AurelioDeRosa/Audero-Context-Menu) is a cross-browser jQuery plugin that allows you to show a custom context menu on one or more specified elements.

## Demo ##
A live demo is available [here](http://htmlpreview.github.io/?https://github.com/AurelioDeRosa/Audero-Context-Menu/blob/master/demo/index.html).

## Requirements ##
Being a jQuery plugin, the only requirement is [jQuery](http://www.jquery.com).

## Compatibility ##
It has been tested and works on all the major browsers, including Internet Explorer 6 and later.

## Installation ##
You can install Audero Unified Placeholders by using [Bower](http://bower.io).

    bower install audero-unified-placeholders

Alternatively, you have to manually download it.

Remember to include the Javascript file, **after** the [jQuery](http://www.jquery.com) library, and the CSS file in the header of your web page as shown below:

    <link rel="stylesheet" href="path/to/auderoContextMenu.css" />
    <script src="path/to/jquery.js"></script>
    <script src="path/to/jquery.auderoContextMenu.js"></script>

## Usage ##
Once you have all the files in place, you have to create the menu and choose the element(s) that will interact with it. The menu is a simple unordered list having `audero-context-menu` as class and an arbitrary id (for example `context-menu-1`).
An example of how you can write the menu is shown below:

    <ul id="context-menu-1" class="audero-context-menu">
      <li><a href="http://www.audero.it" target="_blank">Audero</a></li>
      <li><a href="https://twitter.com/AurelioDeRosa" target="_blank">Aurelio De Rosa on Twitter</a></li>
      <li><a href="https://github.com/AurelioDeRosa" target="_blank">Aurelio De Rosa on GitHub</a></li>
    </ul>

Now that you created the menu, you have to attach it to one or more elements. To achieve this goal, you have to call the `auderoContextMenu()` method, passing the id of the menu, on the desired element(s).
For example, let that you have the following code:

    <div id="area-1" class="area">
       Right-click here to show the custom menu.<br />
       Left-click here or click outside this area and the menu will disappear.
    </div>

A basic call to the plugin is:

    <script>
       $(document).ready(function() {
          $("#area-1").auderoContextMenu("context-menu-1");
       });
    </script>

Please note that the previous snippet is a shortcut for:

    <script>
       $(document).ready(function() {
          $("#area-1").auderoContextMenu({
             idMenu: "context-menu-1"
          });
       });
    </script>

You can read more on the meaning of `idMenu` and the other options available in the "Options" section.

## Options ##
Audero Context Menu has few options you can set during the call to the `auderoContextMenu()` method. The options are:

* `idMenu` (`string`. Default: `""`): The id of the menu that has to be shown.
* `posX` (`number`. Default: `null`): The X coordinate used to show the menu. If the value is not set or is null the current position of the mouse will be used.
* `posY` (`number`. Default: `null`): The Y coordinate used to show the menu. If the value is not set or is null the current position of the mouse will be used.
* `bindLeftClick` (`boolean`. Default: `false`): If the menu has to be shown also on mouse left button click.

## Advanced Examples ##
### Menu with fixed position ###
This example shows you how, with few changes, you can display the menu in a fixed position. All you have to do is to place the menu (the `<ul>`) inside the element you want to attach the plugin and set the CSS position attribute of the latter to relative.
So, your HTML code should look like this:

    <div id="area-2" class="area">
       Right-click here to show another custom menu with <b>fixed position</b>.<br />
       Left-click here or click outside this area and the menu will disappear.
       <ul id="context-menu-2" class="audero-context-menu">
          <li><a href="http://www.audero.it" target="_blank">Audero</a></li>
          <li><a href="https://www.jquery.com" target="_blank">jQuery.com</a></li>
       </ul>
    </div>

To show the menu at 10px from the left margin and 20px from the top margin of the element position, you have to write the following code:

    <script>
       $(document).ready(function() {
          $("#area-2").auderoContextMenu({
             idMenu: "context-menu-2",
             posX: 10,
             posY: 20
          });
       });
    </script>

### Bind left click ###
This example shows how you can have the custom context menu also for the mouse left button click event. Let's that you have the same HTML code listed in the "Usage" section, you have to write:

    <script>
       $(document).ready(function() {
          $("#area-1").auderoContextMenu({
             idMenu: "context-menu-1",
             bindLeftClick: true
          });
       });
    </script>

## License ##
[Audero Context Menu](https://github.com/AurelioDeRosa/Audero-Context-Menu) is dual licensed under [MIT](http://www.opensource.org/licenses/MIT) and [GPL-3.0](http://opensource.org/licenses/GPL-3.0)

## Authors ##
[Aurelio De Rosa](http://www.audero.it) ([@AurelioDeRosa](https://twitter.com/AurelioDeRosa))