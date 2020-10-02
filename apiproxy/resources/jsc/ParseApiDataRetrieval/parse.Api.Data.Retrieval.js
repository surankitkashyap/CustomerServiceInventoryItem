 // Read & set flow variable from API KVM
function populateValues(apiData) {
	if (apiData) {
		for (var key in apiData) { // eslint-disable-line guard-for-in
			context.setVariable(key.toLowerCase(), apiData[key]);
		}
	}
}

function parseJson(data) {
	try {
		return JSON.parse(data);
	} catch (e) {
		return false;
	}
}

parseAPIData = function parseAPIData() { // eslint-disable-line no-undef
	var validation = parseJson(context.getVariable("validation"));
	populateValues(validation);
	
	var enum_exceptions = parseJson(context.getVariable("enum_exceptions"));
	populateValues(enum_exceptions);
};