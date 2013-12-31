var oApp = require('express')();

oApp.get('/', function(oRequest, oResponse) {
	"use strict";

	var sBody = 'Please use the API.';
	oResponse.writeHead(200, {'Content-Length': Buffer.byteLength(sBody), 'Content-Type': 'text/plain'});
	oResponse.end(sBody);
});

oApp.post('/dynamic/', function(oRequest, oResponse) {
	"use strict";

	// TODO compare the dynamic content of the POST body.
});

oApp.get('/static/:url', function(oRequest, oResponse) {
	"use strict";

	if (oRequest.params.url) {
		require('http').get(
			oRequest.params.url,
			function (oSubResponse) {
				var oBufferList = require('bl'), oHash = require('crypto').createHash('sha1');

				oSubResponse.pipe(oBufferList(function (mError, oBuffer) {
					if (!mError) {
						oHash.update(oBuffer.toString());

						var sHash = oHash.digest('hex');

						oResponse.writeHead(200, {'Content-Length': Buffer.byteLength(sHash), 'Content-Type': 'text/plain'});
						oResponse.end(sHash);
					} // if
				}));
			}
		);
	} else {
		oResponse.writeHead(200, {'Content-Length': 1, 'Content-Type': 'text/plain'});
		oResponse.end('0');
	} // else
});

oApp.listen(Number(process.argv[2]));