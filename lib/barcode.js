(function() {
	// Create the global barcode object
	var barcode = {};

	// Define the bar widths
	var narrowWidth = 3;
	var wideWidth = 7;
	var quietWidth = 7;

	// Create a map with each letter's pattern. Upper case = bar, lower
	// case = space. N/n = narrow, W/w = wide.
	var patterns = {
		'*': 'NwNnWnWnN',
		'-': 'NwNnNnWnW',
		'$': 'NwNwNwNnN',
		'%': 'NnNwNwNwN',
		' ': 'NwWnNnWnN',
		'.': 'WwNnNnWnN',
		'/': 'NwNwNnNwN',
		'+': 'NwNnNwNwN',
		'0': 'NnNwWnWnN',
		'1': 'WnNwNnNnW',
		'2': 'NnWwNnNnW',
		'3': 'WnWwNnNnN',
		'4': 'NnNwWnNnW',
		'5': 'WnNwWnNnN',
		'6': 'NnWwWnNnN',
		'7': 'NnNwNnWnW',
		'8': 'WnNwNnWnN',
		'9': 'NnWwNnWnN',
		'A': 'WnNnNwNnW',
		'B': 'NnWnNwNnW',
		'C': 'WnWnNwNnN',
		'D': 'NnNnWwNnW',
		'E': 'WnNnWwNnN',
		'F': 'NnWnWwNnN',
		'G': 'NnNnNwWnW',
		'H': 'WnNnNwWnN',
		'I': 'NnWnNwWnN',
		'J': 'NnNnWwWnN',
		'K': 'WnNnNnNwW',
		'L': 'NnWnNnNwW',
		'M': 'WnWnNnNwN',
		'N': 'NnNnWnNwW',
		'O': 'WnNnWnNwN',
		'P': 'NnWnWnNwN',
		'Q': 'NnNnNnWwW',
		'R': 'WnNnNnWwN',
		'S': 'NnWnNnWwN',
		'T': 'NnNnWnWwN',
		'U': 'WwNnNnNnW',
		'V': 'NwWnNnNnW',
		'W': 'WwWnNnNnN',
		'X': 'NwNnWnNnW',
		'Y': 'WwNnWnNnN',
		'Z': 'NwWnWnNnN'
	};

	/**
	 * Creates a barcode
	 *
	 * @param  string  contents
	 * @throws Error   if the string contains an invalid letter
	 * @return Wrapper
	 */
	barcode.create = function(contents) {
		// Get the width and height of the barcode (convert to pixels)
		var width = (contents.length * 0.2 + 0.5) * (3 / 0.011);
		var height = width * 0.26;

		// Create the canvas to draw to
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext('2d');

		// Add in the start and stop characters
		contents = '*' + contents.toUpperCase() + '*';

		// Go through and draw the lines character by character
		var currX = quietWidth;
		ctx.fillStyle = '#000';
		for (var i = 0; i < contents.length; i++) {
			// Get the current letter and pattern
			var letter = contents.charAt(i);
			var pattern = patterns[letter];

			// Throw an error if this pattern was not found
			if (!pattern) {
				throw new Error(letter + ' is not a valid barcode 39 letter');
			}

			// Go through the pattern
			for (var j = 0; j < pattern.length; j++) {
				if (pattern.charAt(j) === 'n') {
					// Skip this space and move forward
					currX += narrowWidth;
				}
				else if (pattern.charAt(j) === 'w') {
					// Skip this space and move forward
					currX += wideWidth;
				}
				else if (pattern.charAt(j) === 'N') {
					// Draw the black bar and move forward
					ctx.fillRect(currX, 0, narrowWidth, height);
					currX += narrowWidth;
				}
				else {
					// Draw the black bar and move forward
					ctx.fillRect(currX, 0, wideWidth, height);
					currX += wideWidth;
				}
			}

			// Add in the character gap
			currX += narrowWidth;
		}

		// Add in the quiet zone on the end
		currX += quietWidth;

		// Crop the canvas to only be as wide as it needs to be
		var croppedCanvas = document.createElement('canvas');
		var croppedCtx = croppedCanvas.getContext('2d');

		croppedCanvas.width = currX;
		croppedCanvas.height = height;

		croppedCtx.drawImage(canvas, 0, 0);

		// Get the image's data URL and return a wrapper around it
		return new Wrapper(croppedCanvas.toDataURL('image/png'));
	};

	/**
	 * Wrapper for a barcode
	 *
	 * @param string src
	 */
	var Wrapper = function(src) {
		this.image = document.createElement('img');
		this.image.src = src;
	};

	/**
	 * Appends the barcode image to the given parent
	 *
	 * @param  DOMElement|jQuery object parent
	 */
	Wrapper.prototype.appendTo = function(parent) {
		// Append to a jQuery object
		if (window.jQuery && parent instanceof jQuery) {
			parent.append(this.image);
		}
		// Append to a DOMElement
		else {
			parent.appendChild(this.image);
		}
	};

	/**
	 * Retrieves the image source for the barcode
	 *
	 * @return string
	 */
	Wrapper.prototype.src = function() {
		return this.image.src;
	};

	// Export the barcode object
	window.barcode = barcode;
})();