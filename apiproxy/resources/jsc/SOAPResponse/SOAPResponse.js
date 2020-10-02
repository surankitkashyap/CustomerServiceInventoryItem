soapResponse = function() {
    var resp = context.getVariable('response.content')
    resp = JSON.parse(resp);
    var id = resp.id[0].value;
	var name = resp.name;
    var conversationID = context.getVariable("conversationID");
    var useCache = context.getVariable("useCache");
    var lastModified = context.getVariable("lastModified")
    var operator = context.getVariable("operator")
	var sourceCountryCode = context.getVariable("sourceCountryCode")
    var destinationSystem = context.getVariable("destinationSystem")
    var destinationDivision = context.getVariable("destinationDivision")
    var destinationTimestamp = context.getVariable("destinationTimestamp")
    var sourceTimestamp = context.getVariable("sourceTimestamp")
    var sourceDivision = context.getVariable("sourceDivision")
    var sourceSystem = context.getVariable("sourceSystem")
    var sourceOperator = context.getVariable("sourceOperator")
    var soapAction = context.getVariable("soapAction")
    var messageID = context.getVariable("messageID")
    var date = new Date();
    timestamp = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
	
    var responseXml = '<?xml version="1.0" encoding="utf-8"?>' +
        '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<SOAP-ENV:Header>';
  
        responseXml = responseXml + '<ns:Correlation xmlns:xs="http://www.w3.org/2001/XMLSchema" ' +
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xmlns:ns="http://group.vodafone.com/contract/vho/header/v1" ' +
            'xmlns:ns0="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<ns:ConversationID>' + conversationID + '</ns:ConversationID>' +
            '</ns:Correlation>';

		
    responseXml = responseXml + '<ns:ServiceDocumentation xmlns:xs="http://www.w3.org/2001/XMLSchema" ' +
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xmlns:ns="http://group.vodafone.com/contract/vho/header/v1" ' +
        'xmlns:ns0="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<ns:ContractVersion>' + "V1.0" + '</ns:ContractVersion>' +
        '<ns:Implementation>' +
        '<ns:Version>' + "V1.0" + '</ns:Version>' +
        '<ns:Build>' + "0" + '</ns:Build>' +
        '</ns:Implementation>' +
        '</ns:ServiceDocumentation>';
		
    responseXml = responseXml + '<ns:ResultStatus xmlns:xs="http://www.w3.org/2001/XMLSchema" ' +
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xmlns:ns="http://group.vodafone.com/contract/vho/header/v1" ' +
        'xmlns:ns0="http://schemas.xmlsoap.org/soap/envelope/">';
    if (timestamp) {
        responseXml = responseXml + '<ns1:Timestamp xmlns:ns1="http://docs.oasis-open.org/wsrf/bf-2">' + timestamp + '</ns1:Timestamp>';
    }
    responseXml = responseXml + '<ns1:Originator xmlns:ns1="http://docs.oasis-open.org/wsrf/bf-2">' +
        '<ns2:Address xmlns:ns2="http://www.w3.org/2005/08/addressing">' + "CustomerServiceInventoryItemServiceV1_0_0 : Update" + '</ns2:Address>' +
        '</ns1:Originator>';
    responseXml = responseXml + '<ns1:ReasonCode xmlns:ns1="http://group.vodafone.com/contract/vfo/fault/v1">' + "000" + '</ns1:ReasonCode>' +
        '<ns1:Message xmlns:ns1="http://group.vodafone.com/contract/vfo/fault/v1">' + "success" + '</ns1:Message>' +
        '</ns:ResultStatus>';
    responseXml = responseXml + '<ns:Destination xmlns:xs="http://www.w3.org/2001/XMLSchema" ' +
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xmlns:ns="http://group.vodafone.com/contract/vho/header/v1" ' +
        'xmlns:ns0="http://schemas.xmlsoap.org/soap/envelope/">';

	if (sourceCountryCode) {
        responseXml = responseXml + '<ns:CountryCode>' + sourceCountryCode + '</ns:CountryCode>';
    }
	
    if (sourceOperator) {
        responseXml = responseXml + '<ns:Operator>' + sourceOperator + '</ns:Operator>';
    }
    if (sourceDivision) {
        responseXml = responseXml + '<ns:Division>' + sourceDivision + '</ns:Division>'
    }
    if (sourceSystem) {
        responseXml = responseXml + '<ns:System>' + sourceSystem + '</ns:System>'
    }
    if (timestamp) {
        responseXml = responseXml + '<ns:Timestamp>' + timestamp + '</ns:Timestamp>'
    }
    responseXml = responseXml + '</ns:Destination>';
    if (messageID) {
        responseXml = responseXml + '<ns:MessageID xmlns:xs="http://www.w3.org/2001/XMLSchema" ' +
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xmlns:ns="http://www.w3.org/2005/08/addressing" ' +
            'xmlns:ns0="http://schemas.xmlsoap.org/soap/envelope/">' + messageID + '</ns:MessageID>';
    }
  
    responseXml = responseXml + '</SOAP-ENV:Header>' +
        '<SOAP-ENV:Body>' +
        '<ns0:UpdateCustomerServiceInventoryItemVBMResponse xmlns:ns0="http://group.vodafone.com/schema/vbm/service/customer-service-inventory-item/v1">' +
        '<ns0:CustomerServiceInventoryItemVBO>' +
        '<ns1:IDs xmlns:ns1="http://group.vodafone.com/schema/common/v1">' +
        '<ns1:ID>' + id + '</ns1:ID>' +
        '</ns1:IDs>' +
		'<ns2:Name xmlns:ns2="http://group.vodafone.com/schema/common/v1">' + name +'</ns2:Name>' +
        '</ns0:CustomerServiceInventoryItemVBO>' +
        '</ns0:UpdateCustomerServiceInventoryItemVBMResponse>' +
        '</SOAP-ENV:Body>' +
        '</SOAP-ENV:Envelope>';
	context.setVariable("response.content", responseXml)
    context.setVariable("response.header.Content-Type", "application/xml")
}