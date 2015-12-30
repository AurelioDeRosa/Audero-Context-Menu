# Audero Context Menu

[![Code Climate](https://codeclimate.com/github/AurelioDeRosa/Audero-Context-Menu/badges/gpa.svg)](https://codeclimate.com/github/AurelioDeRosa/Audero-Context-Menu)
[![Build Status](https://travis-ci.org/AurelioDeRosa/Audero-Context-Menu.svg?branch=master)](https://travis-ci.org/AurelioDeRosa/Audero-Context-Menu)
[![Coverage Status](https://coveralls.io/repos/AurelioDeRosa/Audero-Context-Menu/badge.svg?branch=master&service=github)](https://coveralls.io/github/AurelioDeRosa/Audero-Context-Menu?branch=master)

[Audero Context Menu](https://github.com/AurelioDeRosa/Audero-Context-Menu) is a cross-browser jQuery plugin that
allows you to show a custom context menu on one or more specified elements.

## Demo

A live demo is available
[here](http://htmlpreview.github.io/?https://github.com/AurelioDeRosa/Audero-Context-Menu/blob/master/demo/index.html).

## Requirements

Being a jQuery plugin, the only requirement is [jQuery](http://www.jquery.com) starting from version **1.7**.

## Compatibility

It has been tested and works on all the major browsers, including Internet Explorer 6 and later.

Audero Context Menu follows the [UMD (Universal Module Definition)](https://github.com/umdjs/umd) pattern to work
seamlessly with module systems such as AMD and CommonJS, and the browser.

## Installation

You can install Audero Context Menu by using [npm](https://www.npmjs.com):

```
npm install audero-context-menu
```

Alternatively, you can install it via [Bower](http://bower.io):

```
bower install audero-context-menu
```

Alternatively, you can manually download it.

Remember to include the JavaScript file **after** the [jQuery](http://www.jquery.com) library, ideally before the 
closing `body` tag:

```html
   <script src="path/to/jquery.js"></script>
   <script src="path/to/jquery.auderoContextMenu.js"></script>
</body>
```

The CSS file should be placed in the `head` of your web page as shown below:

```html
<head>
   <link rel="stylesheet" href="path/to/auderoContextMenu.css" />
```

### Inclusion with Browserify

To use Audero Context Menu with Browserify, you have to write:

```js
require('audero-context-menu')();
```

If you want to specify the global environment and augment a specific version of jQuery, you can pass both to
the plugin:

```js
var jQuery = require('jquery');
require('audero-context-menu')(window, jQuery);
```

## Usage

Once you have all the files in place, you have to create the menu and choose the element(s) that will interact with it.
The menu is a simple unordered list having `audero-context-menu` as class and an arbitrary ID (for example
`context-menu-1`).

An example of how you can write the menu is shown below:

```html
<ul id="context-menu-1" class="audero-context-menu">
   <li><a href="http://www.audero.it" target="_blank">Audero</a></li>
   <li><a href="https://twitter.com/AurelioDeRosa" target="_blank">Aurelio De Rosa on Twitter</a></li>
   <li><a href="https://github.com/AurelioDeRosa" target="_blank">Aurelio De Rosa on GitHub</a></li>
</ul>
```

Now that you created the menu, you have to attach it to one or more elements. To achieve this goal, you have to call
the `auderoContextMenu()` method, passing the id of the menu, on the desired element(s).

For example, let that you have the following code:

```html
<div id="area-1" class="area">
   Right-click here to show the custom menu.<br />
   Left-click here or click outside this area and the menu will disappear.
</div>
```

A basic call to the plugin is:

```html
<script>
   $(document).ready(function() {
      $('#area-1').auderoContextMenu('context-menu-1');
   });
</script>
```

Please note that the previous snippet is a shortcut for:

```html
<script>
   $(document).ready(function() {
      $('#area-1').auderoContextMenu({
         idMenu: 'context-menu-1'
      });
   });
</script>
```

You can read more on the meaning of `idMenu` and the other options available in the [Options](#options) section.

### Destroy

In some cases, you may want to remove the effect of this plugin. To achieve this goal, you can call the
`auderoContextMenu()` method passing the string `destroy`.

Let's say that you want to delete the effect of the plugin on an element having ID `area-1` as soon as a button having
ID `button-destroy` is clicked. To do that, you can write a code like the following:

```html
<script>
   $('#button-destroy').click(function() {
      $('#area-1').auderoContextMenu('destroy');
   });
</script>
```

## Options

Audero Context Menu has few options you can set during the call to the `auderoContextMenu()` method. The options are:

* `idMenu` (`string`. Default: `''`): The ID of the menu that has to be shown.
* `posX` (`number`. Default: `null`): The X coordinate used to show the menu. If the value is not set or is `null`
the current position of the mouse will be used.
* `posY` (`number`. Default: `null`): The Y coordinate used to show the menu. If the value is not set or is `null`
the current position of the mouse will be used.
* `bindLeftClick` (`boolean`. Default: `false`): If the menu has to be shown also on mouse left button click.

### Override default values

[Audero Context Menu](https://github.com/AurelioDeRosa/Audero-Context-Menu) has been developed following the
current best practices in developing plugins for jQuery. Therefore, it exposes the previously cited options through
the `defaults` object, allowing you to override the properties' default value. Changing the default values, you don't
need to specify them again when you call the `auderoContextMenu()` method. For example, let that you have the following
code:

```html
<script>
   $(document).ready(function() {
      $('#area-1').auderoContextMenu({
         idMenu: 'context-menu-1',
         bindLeftClick: true
      });
      $('#area-2').auderoContextMenu({
         idMenu: 'context-menu-2',
         bindLeftClick: true
      });
   });
</script>
```

Overriding the default values you can turn it into the following:

```html
<script>
   $(document).ready(function() {
      $.fn.auderoContextMenu.defaults.bindLeftClick = true;
      $('#area-1').auderoContextMenu({
         idMenu: 'context-menu-1'
      });
      $('#area-2').auderoContextMenu({
         idMenu: 'context-menu-2'
      });
   });
</script>
```

## Advanced Examples

### Menu with fixed position

This example shows you how, with few changes, you can display the menu in a fixed position. All you have to do is
to place the menu (the `<ul>`) inside the element you want to attach the plugin and set the CSS position attribute
of the latter to `relative`.

So, your HTML code should look like this:

```html
<div id="area-2" class="area">
   Right-click here to show another custom menu with <b>fixed position</b>.<br />
   Left-click here or click outside this area and the menu will disappear.
   <ul id="context-menu-2" class="audero-context-menu">
      <li><a href="http://www.audero.it" target="_blank">Audero</a></li>
      <li><a href="https://www.jquery.com" target="_blank">jQuery.com</a></li>
   </ul>
</div>
```

Then, you need to have the following style somewhere in your page:

```css
#area-2
{
   position: relative;
}
```

Finally, to show the menu at `10px` from the left margin and `20px` from the top margin of the element position, you
have to write the following code:

```html
<script>
   $(document).ready(function() {
      $('#area-2').auderoContextMenu({
         idMenu: 'context-menu-2',
         posX: 10,
         posY: 20
      });
   });
</script>
```

### Bind left click

This example shows how you can have the custom context menu also for the mouse left button click event. Let's that
you have the same HTML code listed in the [Usage](#usage) section, you have to write:

```html
<script>
   $(document).ready(function() {
      $('#area-1').auderoContextMenu({
         idMenu: 'context-menu-1',
         bindLeftClick: true
      });
   });
</script>
```

## License

[Audero Context Menu](https://github.com/AurelioDeRosa/Audero-Context-Menu) is dual licensed under
[MIT](http://www.opensource.org/licenses/MIT) and [GPL-3.0](http://opensource.org/licenses/GPL-3.0).

## Author

[Aurelio De Rosa](http://www.audero.it) ([@AurelioDeRosa](https://twitter.com/AurelioDeRosa))