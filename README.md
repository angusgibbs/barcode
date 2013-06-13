# Barcode.js by [Angus Gibbs](http://angusgibbs.com)

Generates barcode 39 labels in browser.

## Usage

Once you have barcode.js included on your page, call `barcode.create` to generate your barcode:

```javascript
var code = barcode.create('HELLO WORLD');
```

Valid letters are `0-9`, `A-Z`, `+`, `-`, `$`, `%`, `.`, `/`, and ` ` (space). **`barcode.create` throws an error if an invalid letter is entered.**

*Note: lowercase letters, which are not allowed by the barcode 39, will be converted to uppercase.*

Once you have your barcode, you can either add it to the DOM with `#appendTo` or get its source data with `#src()`:

```javascript
code.appendTo(document.querySelector('body'));

// or

code.appendTo($('body')); // Works with jQuery!

// or

var src = code.src();
```

## Support

Barcode.js should with with all browsers that support canvas, so:

* IE 9+ (further support can be added using [explorercanvas](http://explorercanvas.googlecode.com))
* Firefox 3.6+
* Chrome
* Safari 3.1+
* Opera 9.0+
* iOS Safari 3.2+
* Android 2.1+