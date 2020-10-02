methodNotAllowed = function MethodNotAllowed() { // eslint-disable-line no-undef
	var customizedErrorMessage = {
		"status": "405",
		"reason": "Method Not Allowed",
		"code": "Method Not Allowed",
		"message": "The request method is not supported by this resource"
	};

	
	context.setVariable("errorJSON", "customizedErrorMessage");
	context.setVariable("customizedErrorMessage", JSON.stringify(customizedErrorMessage));
	throw "error";
};