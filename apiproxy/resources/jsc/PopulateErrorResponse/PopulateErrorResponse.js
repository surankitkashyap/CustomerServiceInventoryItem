populateErrorResponseVariables = function populateErrorResponseVariables() { // eslint-disable-line no-undef

 	var errorJSON = context.getVariable("errorJSON");
errorPayload = JSON.parse(context.getVariable(errorJSON));
	    code = errorPayload.code;
	    status = errorPayload.status;
	    reason = errorPayload.reason;
	    message = errorPayload.message;


	context.setVariable("e_reason", reason);
	context.setVariable("e_message", message);
	context.setVariable("e_code", code);
	context.setVariable("e_status", status);

// 	}
var date = new Date();
    timestamp = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
	context.setVariable("dateForFault", timestamp);
};