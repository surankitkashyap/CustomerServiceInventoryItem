requestPayloadUpdateCustomerServiceInventoryItem = function requestPayloadUpdateCustomerServiceInventoryItem() { // eslint-disable-line no-undef
    var soapRequest = context.getVariable("soapRequest"); //soapRequest
    soapRequest = JSON.parse(soapRequest);
	//extracting all the values using json path
    var inventoryItemVBO = soapRequest.Body.UpdateCustomerServiceInventoryItemVBMRequest.CustomerServiceInventoryItemVBO;
    var warrantyStartDate = jsonPath(inventoryItemVBO, "$.Details.WarrantyStartDate.DateString");
    var warrantyEndDate = jsonPath(inventoryItemVBO, "$.Details.WarrantyEndDate.DateString");
    var rolesOwnerName = jsonPath(inventoryItemVBO, "$.Roles.Owner.Name");
    var firstName = jsonPath(inventoryItemVBO, "$.Roles.Subscriber.ContactPeople.ContactPerson[0].IndividualName.FirstName");
    var familyName = jsonPath(inventoryItemVBO, "$.Roles.Subscriber.ContactPeople.ContactPerson[0].IndividualName.FamilyName");
    var email = jsonPath(inventoryItemVBO, "$.Roles.Subscriber.ContactPeople.ContactPerson[0].ContactPoints.ContactPoint[?(@.Email)].Email.FullAddress");
    var telephone = jsonPath(inventoryItemVBO, "$.Roles.Subscriber.ContactPeople.ContactPerson[0].ContactPoints.ContactPoint[?(@.Telephone)].Telephone.FullNumber");
    var town = jsonPath(inventoryItemVBO, "$.Roles.Subscriber.ContactPeople.ContactPerson[0].ContactPoints.ContactPoint[?(@.Postal)].Postal.Town");
    var country = jsonPath(inventoryItemVBO, "$.Roles.Subscriber.ContactPeople.ContactPerson[0].ContactPoints.ContactPoint[?(@.Postal)].Postal.Country");
    var county = jsonPath(inventoryItemVBO, "$.Roles.Subscriber.ContactPeople.ContactPerson[0].ContactPoints.ContactPoint[?(@.Postal)].Postal.County");
    var postCode = jsonPath(inventoryItemVBO, "$.Roles.Subscriber.ContactPeople.ContactPerson[0].ContactPoints.ContactPoint[?(@.Postal)].Postal.PostCode");
    var countryCode = jsonPath(inventoryItemVBO, "$.Roles.Subscriber.ContactPeople.ContactPerson[0].ContactPoints.ContactPoint[?(@.Postal)].Postal.CountryCode");
    var postalcharacteristicsValue = jsonPath(inventoryItemVBO, "$.Roles.Subscriber.ContactPeople.ContactPerson[0].ContactPoints.ContactPoint[?(@.Postal)].Postal.Characteristics.CharacteristicsValue");
    var partsResourceId = jsonPath(inventoryItemVBO, "$.Parts.Resources.Resource.IDs");
    var partsResourceName = jsonPath(inventoryItemVBO, "$.Parts.Resources.Resource.Name");
    var partsResourceStatus = jsonPath(inventoryItemVBO, "$.Parts.Resources.Resource.Status.name");
    var partsCustomerServiceAccountIdSchemeName = jsonPath(inventoryItemVBO, "$.Parts.CustomerServiceAccount.IDs.ID.schemeName");
    var partsCustomerServiceAccountIdValue = jsonPath(inventoryItemVBO, "$.Parts.CustomerServiceAccount.IDs.ID.value")
    var subscriberIdValue = jsonPath(inventoryItemVBO, "$.Roles.Subscriber.IDs[?(@.schemeName=='userId')].value");
    var specificationCharacteristicsValue = jsonPath(inventoryItemVBO, "$.Parts.Extension.LineItems.LineItem[0].CharacteristicsValue");
    var partsSubscriptionId = jsonPath(inventoryItemVBO, "$.Parts.Subscription.IDs");
    var partsNotes = jsonPath(inventoryItemVBO, "$.Parts.Notes[0].Content");
    var salesOrderId = jsonPath(inventoryItemVBO, "$.Parts.Extension.SalesOrder.IDs");
    var salesOrderCategory = jsonPath(inventoryItemVBO, "$.Parts.Extension.SalesOrder.Categories.Category");
    var salesOrderDate = jsonPath(inventoryItemVBO, "$.Parts.Extension.SalesOrder.OrderDate.DateString");
    var resourceCharacteristic = jsonPath(inventoryItemVBO, "$.Parts.Resources.Resource.Characteristics.Characteristic");
    var dlmId= jsonPath(inventoryItemVBO, "$.Parts.Resources.Resource.IDs[?(@.schemeName=='DLM ID')].value");
    context.setVariable("dlmId", dlmId[0]);
	context.setVariable("faultAddress","CustomerServiceInventoryItemServiceV1_0_0: Update");
   
    var requestPayload = {};
  
    var details;
    if (warrantyStartDate || warrantyEndDate) {
        details = {}
        if (warrantyStartDate) {
            details.warrantyStartDate = {}
            details.warrantyStartDate.date = warrantyStartDate[0]
        }
        if (warrantyEndDate) {
            details.warrantyEndDate = {}
            details.warrantyEndDate.date = warrantyEndDate[0]
        }
        requestPayload.details = details;
    }
     requestPayload.roles = {};
     requestPayload.roles.owner = {
        "name": rolesOwnerName[0]
    } 
    requestPayload.roles.subscriber = {}
    requestPayload.roles.subscriber.id = [{
            "value": subscriberIdValue[0] ,
            "schemeName": "userId"
        }
    ]
    var postalCharacteristic = postalcharacteristicsValue[0]
    var postalCharacteritscs = []
    if (postalCharacteristic) {
        postalCharacteristic.forEach(e => {
            var obj = {}
            obj.characteristicName = e.characteristicName
            obj.value = e.Value
            postalCharacteritscs.push(obj)
        })
    }
    var contactPeople = {
        "contactPerson": {
            "individualName": {
                "firstName": firstName[0],
                "familyName": familyName[0]
            },
            "contactPoint": [{
                "email": {
                    "fullAddress": email[0]
                },
                "telephone": {
                    "fullNumber": telephone[0]

                },
                "postal": {
                    "town": town[0],
                    "country": country[0],
                    "county": county[0],
                    "postCode": county[0],
                    "countryCode": countryCode[0],
                    "characteristic": {
                        "characteristicsValue": postalCharacteritscs
                    }

                }
            }]


        }
    }
    requestPayload.roles.subscriber.contactPeople = contactPeople;
    requestPayload.parts = {};
    requestPayload.parts.resource = []
    var Characteristic = resourceCharacteristic[0];
    var Characteritscs = []
    if (Characteristic) {
        Characteristic.forEach(e => {
            var obj = {}
            obj.characteristicName = e.name
            obj.value = e.Value
            Characteritscs.push(obj)
        })
    }
    var resourceObj = {
        "id": partsResourceId[0],
        "name": partsResourceName[0],
        "status": partsResourceStatus[0],
        "characteristic": {
            "characteristicsValue": Characteritscs
        }
    }
    requestPayload.parts.resource.push(resourceObj)

    requestPayload.parts.customerServiceAccount = {
        "id": [{
            "schemeName": partsCustomerServiceAccountIdSchemeName[0],
            "value": partsCustomerServiceAccountIdValue[0]
        }]
    }
    requestPayload.parts.subscription = {
        "id": partsSubscriptionId[0]
    }
    requestPayload.parts.note = [{
        "content": partsNotes[0]
    }];
    requestPayload.parts.salesOrder = {}
    requestPayload.parts.salesOrder.id = salesOrderId[0];
    requestPayload.parts.salesOrder.category = [{
        "value": salesOrderCategory[0]
    }]
    requestPayload.parts.specification = {
        "characteristicsValue": [{
            "characteristicName": "orderDate",
            "value": salesOrderDate[0]
        }]
    }

    var specificationCharacteristic = specificationCharacteristicsValue[0]
    var specificationCharacteritscs = []
    if (specificationCharacteristic) {
        specificationCharacteristic.forEach(e => {
            var obj = {}
            obj.characteristicName = e.characteristicName
            obj.value = e.Value
            specificationCharacteritscs.push(obj)
        })
    }
    requestPayload.parts.lineItem = []
    requestPayload.parts.lineItem.push({
        "specification": {
            "characteristicsValue": specificationCharacteritscs
        }
    })
    context.setVariable("request.content", JSON.stringify(requestPayload))
    context.setVariable("request.header.Accept", "application/json")
    context.setVariable("request.header.Content-Type", "application/json")
    var flowName = context.getVariable("current.flow.name");
	context.setVariable("currentFlowName", flowName);
    
    print("req", JSON.stringify(requestPayload));

};