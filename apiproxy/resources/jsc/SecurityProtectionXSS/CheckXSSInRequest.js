 /* global request*/
var escapeRegex = function (string) {
	return string.replace(/[-\/\\^$*+?.()|{}<>]/g, "\\$&"); // eslint-disable-line no-useless-escape
};

function escapeXml(unsafe) {
	return unsafe.replace(/[<>&'"]/g, function (c) {
		switch (c) {
		case "<": return "&lt;";
		case ">": return "&gt;";
		case "&": return "&amp;";
		case "'": return "&apos;";
		case "\"": return "&quot;";
		default : return c;
		}
	});
}


checkXSSInRequest = function checkXSSInRequest() { // eslint-disable-line no-undef
	try {

		var securityRequestXss = context.getVariable("security_request_xss");
		var securityRequestXssJson = JSON.parse(securityRequestXss);
		var securityRequestXssHeaders = securityRequestXssJson.security_request_xss_headers;
		var securityRequestXssQuery = securityRequestXssJson.security_request_xss_query;
		var securityRequestXssPayload = securityRequestXssJson.security_request_xss_payload;
		var securityRequestXmlEscape = securityRequestXssJson.security_request_xml_escape;
		var regex;
		var result;
		var paramList;
		var paramName;
		var paramValue;
		var isHeaderXssEnabled = false;
		var isQueryXssEnabled = false;
		var isPayloadXssEnabled = false;
		var isEscapeXssEnabled = false;


		if (securityRequestXssHeaders) {
			isHeaderXssEnabled = securityRequestXssHeaders.enabled;

			if (isHeaderXssEnabled) {
				regex = new RegExp(escapeRegex(securityRequestXssHeaders.regex));
				var headerList = context.getVariable("request.headers.names");
				if ((headerList !== null) && (headerList !== "[]")) {
					for (var headerName in request.headers) { // eslint-disable-line guard-for-in
						var headerValue = context.getVariable("request.header." + headerName + ".values") + "";
						headerValue = headerValue.substr(1, headerValue.length - 2);
						result = regex.test(headerValue);
						if (result) {
							context.setVariable("errorJSON", "error_interface_error");
							throw "internalConfigError";
						}
					}
				}
			}
		}


		if (securityRequestXssQuery) {
			isQueryXssEnabled = securityRequestXssQuery.enabled;
			if (isQueryXssEnabled) {
				regex = new RegExp(escapeRegex(securityRequestXssQuery.regex));
				paramList = context.getVariable("request.queryparams.names") + "";
				paramList = paramList.substr(1, paramList.length - 2);
				var paramListArray = paramList.split(",");
				if ((paramList !== null) && (paramList !== "[]")) {
					for (var i in paramListArray) { // eslint-disable-line guard-for-in
						paramName = paramListArray[i];
						paramValue = context.getVariable("request.queryparam." + paramName + "");
						result = regex.test(paramValue);
						if (result) {
							context.setVariable("errorJSON", "error_interface_error");
							throw "internalConfigError";
						}

					}
				}
			}
		}


		var requestVerb = context.getVariable("request.verb");
		if (requestVerb === "POST" || requestVerb === "PUT") {
		var messageContent = context.getVariable("message.content");
        context.setVariable("messageContent",messageContent);

			if (securityRequestXssPayload) {
				isPayloadXssEnabled = securityRequestXssPayload.enabled;
				if (isPayloadXssEnabled && messageContent) {
					regex = new RegExp(securityRequestXssPayload.regex);
					var contentType = context.getVariable("message.header.Content-Type");
					if (contentType.indexOf("json") > 0) {
                      try {
							var payloadJson = JSON.parse(context
									.getVariable("message.content"));
						} catch (err) {
							context.setVariable("errorJSON",
									"error_invalid_input_data");
							throw "invalid_request";
						}
						var payloadStr = JSON.stringify(payloadJson);
						if (regex.test(payloadStr)){
							context.setVariable("errorJSON", "error_interface_error");
							throw "internalConfigError";
						}
					} else if (contentType.indexOf("form") > 0) {
						paramList = context.getVariable("request.formparams.names");
						if ((paramList !== null) && (paramList !== "[]")) {

							for (paramName in request.formparams) { // eslint-disable-line guard-for-in
								paramValue = context.getVariable("request.formparam." + paramName);
								result = regex.test(paramValue);
								if (result) {

									context.setVariable("errorJSON", "error_interface_error");
									throw "internalConfigError";
								}
							}
						}
					}
				}
			}
		}
		if (securityRequestXmlEscape) {
			isEscapeXssEnabled = securityRequestXmlEscape.enabled;
			if (isEscapeXssEnabled) {
				var xmlEscapeVars = securityRequestXmlEscape["xml-escape-vars"]; // eslint-disable-line no-undef
				var xmlEscapeVarsList = xmlEscapeVars.split(",");
				for (var j = 0; j < xmlEscapeVarsList.length; j++) {
					var flowVariable = xmlEscapeVarsList[j];
					var value = context.getVariable(flowVariable);
					value = escapeXml(value);
					context.setVariable(flowVariable, value);
				}
			}
		}

	} catch (err) {

		var errorJson = (context.getVariable("errorJSON") || "error_interface_error");
		context.setVariable("errorJSON", errorJson);
		throw "internalConfigError";
	}
};
