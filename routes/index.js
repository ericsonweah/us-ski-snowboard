'use strict';
/*
|--------------------------------------------------------------------------
| All Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register any web route for your application. These
| routes are immediately mounted to the main app 

|
*/

module.exports = app => {
	// Mounting home router to app 
	require('./home')(app);

	// Mounting members router to app 
	require('./members')(app);

	// Mounting addresses router to app 
	require('./addresses')(app);
}