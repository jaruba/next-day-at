module.exports = (dayName, hour, min) => {
	// The current day
	var oneDay = 1000 * 60 * 60 * 24
	var date = new Date((new Date()).setUTCHours(hour,min,0));
	var now = date.getDay();

	// Days of the week
	var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

	// The index for the day you want
	var day = days.indexOf((dayName || '').toLowerCase());

	// Find the difference between the current day and the one you want
	// If it's the same day as today (or a negative number), jump to the next week
	var diff = day - now;

	var nextDayTimestamp
	if (diff === 0) {
		nextDayTimestamp = date.getTime() + (oneDay * diff);
	} else {
		diff = diff < 1 ? 7 + diff : diff;

		// Get the timestamp for the desired day
		nextDayTimestamp = date.getTime() + (oneDay * diff);
	}

	// Get the next day
	return nextDayTimestamp;
};
