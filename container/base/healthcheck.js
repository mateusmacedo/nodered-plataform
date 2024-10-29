var http = require('http');
var https = require('https');
var settings = require('/data/settings.js');
var request;

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var options = {
    host : "localhost",
    port : settings.uiPort || 1880,
    timeout : 4000
};

if (settings.hasOwnProperty("https")) {
    request = https.request(options, (res) => {
        if ((res.statusCode >= 200) && (res.statusCode < 500)) { process.exit(0); }
        else { process.exit(1); }
    });
}
else {
    request = http.request(options, (res) => {
        if ((res.statusCode >= 200) && (res.statusCode < 500)) { process.exit(0); }
        else { process.exit(1); }
    });
}

request.on('error', function(err) {
    process.exit(1);
});

request.end();