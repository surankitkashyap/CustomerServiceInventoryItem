 routeToTargetServer = function routeToTargetServer() { // eslint-disable-line no-undef
    var operation = context.getVariable("currentFlowName");
    print("operation",operation)
    if (operation === "UpdateCustomerServiceInventoryItem") {
        context.setVariable("request.verb", "PUT");
        context.setVariable("target.copy.pathsuffix", false);
        var id = context.getVariable("dlmId");
        print("dlmid",id)
        if(id){
        var targetUrl = "/customerServiceInventoryItemAPI/v2/customerServiceInventoryItem/" + id
        }else{
            var targetUrl = "/customerServiceInventoryItemAPI/v2/customerServiceInventoryItem/"
        }
print("targeturl",targetUrl)
        context.setVariable("targetUrl", targetUrl);
    } 
    }

