module.exports = app => {
	// Mounting home router to app 
	require('./home')(app);

	// Mounting members router to app 
	require('./members')(app);

	// Mounting addresses router to app 
	require('./addresses')(app);
}