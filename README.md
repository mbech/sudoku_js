sudoku_js
=========
#Front End Sudoku!

###Structure of the application:
I structured the app as a basic MVC pattern:

* Model - a board object that stored the game state and had methods to manipulate it
* View - a render object that could be passed a board and represent it on the page, along with other general display-related methods
* Controller - the SUD namespace, with namespace level methods to coordinate calls to board and render methods, triggered on page load or user-input

Additional objects include:
* a bind object, that sets up event listeners on rendered DOM elements, with callbacks to the controller
* a sudoStates object to hold starting configurations (the wikipedia example board) as an input for initializing board objects.
###Technologies used:
* JQuery - slightly more concise selectors, event bindings.  Didn't end up using much of the utility though, could probably have stuck with vanilla JS.
* normalize.css - to help out with more consistant styling across browsers.
* SCSS - no huge advantage here over plain css as there's not a lot to style.  Still, the variables are always nice for quickly trying different color-schemes.


###Reasoning behind technical choices:

###Trade-offs made:
1. Simpler board representation using an array of numbers rather than object (saved some typing and initial complexity, but probably would have been cleaner to use cell objects, as described in next section)
2. More specific render methods to handle differnt types of redraws, rather than just redrawing the board every time.  (More code, but should save on some expensive DOM manipulation)
3. Per the "no frameworks allowed" instructions, I assumed that included testing frameworks (e.g. Jasmine), so I held off on writing tests from scratch.  In retrospect, it would have been worth taking time to write a basic assertEq with some console logs to verify board state manipulation, rather than having to confirm manually.

###To implement if additional time:
* **Add an interface for the user to load/create different boards from sudoState (possibly as URL query string).** The states are stored in an 81-length string of digits (0 for empty cell).  Creating and running a new board in the app takes a simple SUD method call:

```js
SUD.run(sudoStateString);
```

*  **Refactor the board state to contain actual cell objects rather than numbers, reducing the logic required in render.**  Info about cell conflicts ended up being kept as data on the DOM nodes (as there was no 'cell' object kept in board), meaning render had to assign/update this data rather than simply formatting/displaying existing board data. Refactoring the board object to be the authority on all board-related info (such as current cells in conflict, sources of cell conflicts).

*  If actually being deployed, combine and minify/compress js, css.
