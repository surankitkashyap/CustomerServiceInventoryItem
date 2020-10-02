 resourceNotFound = function resourceNotFound() { // eslint-disable-line no-undef
	var customizedErrorMessage = {
		"status": "404",
		"reason": "Not Found",
		"code": "Resource Not Found",
		"message": "URI does not represent a recognised resource"
	};
	context.setVariable("errorJSON", "customizedErrorMessage");
	context.setVariable("customizedErrorMessage", JSON.stringify(customizedErrorMessage));
	throw "error";
};