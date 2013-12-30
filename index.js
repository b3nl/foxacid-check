var oHTTP = require('http'), oServer = oHTTP.createServer(function (oRequest, oResponse) {
	"use strict";

	var oURL = require('url'), oParsed = oURL.parse(oRequest.url, true);

	oResponse.writeHead(200, {'Content-Type': 'text/plain'});

	if (oParsed.query.url) {
		oHTTP.get(
			oParsed.query.url,
			function (oSubResponse) {
				var oBufferList = require('bl'), oHash = require('crypto').createHash('sha1');

				oSubResponse.pipe(oBufferList(function (mError, oBuffer) {
					if (!mError) {
						oHash.update(oBuffer.toString());

						oResponse.end(oHash.digest('hex'));
					} // if
				}));
			}
		);
	} else {
		oResponse.end('0');
	} // else
});

oServer.listen(Number(process.argv[2]));