const actions = require('js/actions/actions')
const weather = require('js/skills/weather')
const Timer = require('js/skills/timer')
const event = require('js/events/events')
const responses = require('js/responses/responses')

function parseIntent(cmd){

	/* param {cmd} - response object from speech to text engine */

	// this one is for google dialogflow, you might need to make adjustments for a different engine	

	console.log(cmd)

	switch(cmd.intent){

		case "greeting":
			actions.setAnswer(responses.greeting, {type: 'remote'})
			break

		case "camera":
			event.emit(`camera-${cmd.params.on.stringValue}`)
			break

		case "timer":
			let timer = new Timer(cmd.params.time.numberValue, cmd.params.timeUnit.stringValue)
			timer.startTimer()
			break

		case "weather":
			weather.getWeather(cmd.params.city.stringValue)
			break

		case "changeGlasses":
			event.emit("change-glasses")
			break

		case "goodbye":
			actions.setAnswer(responses.bye, {type: 'local'})
			break
		default:
			actions.setAnswer(responses.confused, {type:'local'})
			break
	}

	// setAnswer(responses[cmd.intent], {type:'remote'})
}

module.exports = {
	parseIntent
}