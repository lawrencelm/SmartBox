

/*console.log("hello");
var proxy = "http://jsonp.guffa.com/Proxy.ashx?url=pubapi.cryptsy.com%2fapi.php%3fmethod=marketdatav2";
console.log("hello");
var urlhalf1 = "http://open.api.ebay.com/*/

var wrapper;

var cb_log = function(data){
    var items = data.findItemsByKeywordsResponse[0].searchResult[0].item || [];
    var searchresults = [];
    for (var i = 0; i < items.length; ++i) {
        var item     = items[i];
        //console.log(item);
        if (item && item.sellingStatus[0].currentPrice[0]['__value__'] && item.title && item.galleryPlusPictureURL){
            var price    = item.sellingStatus[0].currentPrice[0]['__value__'];
            var title    = item.title;
            var pic      = item.galleryPlusPictureURL;
            var URL      = item.viewItemURL;
            //console.log(price);
            //console.log(pic);
            //console.log(title);
            searchresults.push({"title":title, "price":price, "pic":pic, "URL":URL});
        }
    }
    var apiData = {"APItype":"EBAY", "list":searchresults};
    console.log(searchresults);
    wrapper(apiData);
}

var requestEbay = function(keywordString, callback) { //callback takes response object as parm
    keywordString = keywordString.split(' ').join('%20');
    console.log('search string is ' + keywordString);

    wrapper = callback;

	var url = "http://svcs.ebay.com/services/search/FindingService/v1";
	    url += "?OPERATION-NAME=findItemsByKeywords";
	    url += "&SERVICE-VERSION=1.0.0";
	    url += "&SECURITY-APPNAME=DucNguye-db45-4205-adda-a7cf5ef17a5e";
	    url += "&GLOBAL-ID=EBAY-US";
	    url += "&RESPONSE-DATA-FORMAT=JSON";
	    url += "&callback=cb_log";
	    url += "&REST-PAYLOAD";
	    url += "&keywords=" + keywordString;
	    url += "&paginationInput.entriesPerPage=10";

    var s = document.createElement('script');
    s.src = url;
    document.body.appendChild(s);
}


/*var HttpClient = function (){
	this.get = function(aurl, aCallback){
		var req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			if(req.readyState==4 && req.status==200)
				aCallback(req.responseText);
		}
		req.open('GET', aurl, true);
		req.send(null);
	}
}

var newreq = new HttpClient();
newreq.get(urlhalf1,function(x){
	console.log(x);
	}
);
console.log("hello");
console.log("hello");*/


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
