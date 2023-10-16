
const getNextDayAt = module.exports = (dayName, hour, min, today) => {
	// The today variable is set only for testing. Otherwise, it will be set to
	// today's date.
	today = today || new Date()

	// One day in milliseconds
	var oneDay = 1000 * 60 * 60 * 24

	var todayAtTime = new Date(today);
	todayAtTime.setUTCHours(hour, min, 0)
	var currentDayOfWeek = today.getDay();

	var daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


	// The index for the day you want
	var day = daysOfWeek.indexOf((dayName || '').toLowerCase());
	if(day === -1) throw new Error('Invalid day name')

	// Find the difference between the current day and the one you want
	// If it's the same day as today (or a negative number), jump to the next week
	var diff = (day - currentDayOfWeek + 7) % 7;
	if (diff === 0 && todayAtTime.getTime() < today.getTime()) diff = 7

	// Get the timestamp for the desired day
	var nextDayTimestamp = todayAtTime.getTime() + (oneDay * diff);

	return nextDayTimestamp;
};

if (require.main === module) {
	// tests
	var dayOfWeek = 'friday'
	var hour = 16
	var min = 0
	var dayN = 4
	var monday = 9
	// This test doesn't work if the week spans across two months
	for (let i = 0;i < 7;i++) {
		var next, day = (monday + i)
		if(day < 10) day = '0' + day
		else day = '' + day
		var dateBeforeTime = new Date(`2023-10-${day}T11:37Z`)
		// Next friday should be the 20th and after that the 27th
		// because 11:37 is before 16:00
		next = new Date(getNextDayAt(dayOfWeek, hour, min, dateBeforeTime))
		if((i <= dayN) && (monday + dayN === next.getDate()) || (monday + dayN + 7 === next.getDate())) console.log('PASS: Today is', dateBeforeTime, `Next ${dayOfWeek} is`, next)
		else {
			console.log('FAIL: Today is', dateBeforeTime, `Next ${dayOfWeek} is`, next)
			throw new Error('Test failed')
		}

		var dateAfterTime = new Date(`2023-10-${day}T18:37Z`)
		// Next friday should be the 20th intil 19 and after that the 27th
		// because 18:37 is after 16:00
		next = new Date(getNextDayAt(dayOfWeek, hour, min, dateAfterTime))
		if((i < dayN) && (monday + dayN === next.getDate()) || (monday + dayN + 7 === next.getDate())) console.log('PASS: Today is', dateAfterTime, `Next ${dayOfWeek} is`, next)
		else {
			console.log('FAIL: Today is', dateAfterTime, `Next ${dayOfWeek} is`, next)
			throw new Error('Test failed')
		}
	}
}
