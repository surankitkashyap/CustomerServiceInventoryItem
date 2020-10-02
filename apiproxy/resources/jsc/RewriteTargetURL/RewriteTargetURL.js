 targetURL = function targetURL(){
     var url = "https://masterdev-epns-eu1.api.vodafone.com/no-target-path"
     var baseURL = "";
     var status = context.getVariable("eventStatus")
     var id = context.getVariable("proxy.pathsuffix")
      context.setVariable("request.verb", "POST");
    if (status === "On-Hold" || status === "on-hold") {
        baseURL = "/listener/troubleTicketInformationRequiredEvent";
        context.setVariable("target.url", url  + baseURL + id);
       
    } else if(status === "Resolved" || status === "resolved"){
        baseURL = "/listener/troubleTicketResolvedEvent";
        context.setVariable("target.url", url  + baseURL + id);
      
    } else if(status === "Work In Progress" || status === "work in progress"){
        baseURL = "/listener/troubleTicketAttributeValueChangeEvent";
        context.setVariable("target.url", url  + baseURL + id);
       
    }else {
    baseURL = "/listener/troubleTicketCreateEvent";
    context.setVariable("target.url", url  + baseURL);
     
}

 }