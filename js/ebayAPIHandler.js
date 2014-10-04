function httpGet(theUrl)
{
	$.getJSON(theUrl, function(data)
	{
	    $.each(data, function()
	    {
	        console.log(hello);
	    })
	});
}
console.log("hello");
var proxy = "http://jsonp.guffa.com/Proxy.ashx?url=pubapi.cryptsy.com%2fapi.php%3fmethod=marketdatav2";
var urlhalf1 = "http:%2%2svcs.ebay.com%2services%2search%2FindingService%2v1?SECURITY-APPNAME=DucNguye-db45-4205-adda-a7cf5ef17a5e&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=";
var keywords = "iphone";
var urlhalf2 = "%203g&paginationInput.entriesPerPage=3";
console.log(urlhalf1+keywords+urlhalf2);
httpGet(urlhalf1+keywords+urlhalf2);

/*$(document).ready(function() {
    $.ajax(
	{
	    url: "http://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=DucNguye-db45-4205-adda-a7cf5ef17a5e&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=iphone%203g&paginationInput.entriesPerPage=3",
	    type: 'GET',
	    dataType: 'json',
	    accept: 'application/json',
	    success: function(data)
	    {  
	        console.log(data);
	        var objets= $.parseJSON(data);

	        $.each(objets, function(i, obj)
	        {
	           console.log(obj.title);
	        });
	    }
	});
});*/
