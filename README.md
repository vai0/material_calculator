# Material Calculator

A copy of the [Google Calculator on Android](https://play.google.com/store/apps/details?id=com.google.android.calculator&hl=en) - but as a web-app.

### Functional Requirements:
- should add, subtract, multiply and divide two numbers 
- DEL button should only delete the last char in expression 
- chain mathematical operations together until equal button is clicked, calculator will tell me the correct output 
- initial input should only handle accept numbers
- should handle duplicate . 
- should handle duplicate operator inputs 
- should handle divide by 0. set result to “Can’t divide by 0” 
- no more than 12 digits can be entered
- when = is clicked, DEL should change to CLR. Clicking CLR should clear both the expression and result screen 
- when = is clicked, result should replace expression area
- press and holding DEL should call the clear function
- data from operators and numbers should be retrieved from element’s data attribute instead of innerText
- should be able to respond to key events

### UI requirements
- colors and fonts should match calculator on android
- clicking on buttons adds ripple effects
- ripples effects should take into account key events
- press and holding DEL should add ripple across .display from the bottom right corner
- transition should exist when result equals expression
- if screen width < 375px, screen width should be 100%, container height should be viewport height
- should use proper operator icons in pad and expression
- advanced-pad should be a drawer

<br>

__[Live Demo](https://justinchi.me/calculator/)__

__Libraries:__ [Material Components](https://material.io/components/web/)

__Tools:__ webpack, npm
