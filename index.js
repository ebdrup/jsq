#!/usr/bin/env node
var findit = require('findit');
var fs = require('fs');
var singleQuote = require('singlequote');

if (!process.argv[2]) {
	console.log('USAGE: jsq fileOrDirectory [fileOrDirectory [fileOrDirectory [..]]]');
} else {
	process.argv.splice(2).forEach(function (dirOrFile) {
		var finder = findit(dirOrFile);
		finder.on('file', function (file) {
			if (/\.js$/.test(file)) {
				var code = fs.readFileSync(file, 'utf-8');
				var codeWithSingleQuotes;
				try {
					codeWithSingleQuotes = singleQuote(code);
				} catch (ex) {
					console.log('Error parsing %s', file, ex);
					return;
				}
				if (code !== codeWithSingleQuotes) {
					console.log('replacing double quoted strings with single quoted strings in %s', file);
					fs.writeFileSync(file, codeWithSingleQuotes, 'utf-8');
				}
			}
		});
	});
}
