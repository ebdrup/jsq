#!/usr/bin/env node
var findit = require('findit');
var fs = require('fs');
var singleQuote = require('singlequote');
var verbose = false;
var args = process.argv.splice(2).filter(function (param) {
	return param === '-v' ? !(verbose = true) : true
});

if (!args.length) {
	console.log('USAGE: jsq fileOrDirectory [fileOrDirectory [fileOrDirectory [..]]] [-v]');
} else {
	var replaceCount = 0, skipCount = 0, fileCount = 0;
	args.forEach(function (dirOrFile) {
		var finder = findit(dirOrFile);
		finder.on('file', function (file) {
			if (/\.js$/.test(file)) {
				fileCount++;
				var code = fs.readFileSync(file, 'utf-8');
				var codeWithSingleQuotes;
				try {
					codeWithSingleQuotes = singleQuote(code);
				} catch (ex) {
					skipCount++;
					verbose && console.log('Skipping file because of error parsing file or bug in jsq %s', file, ex);
					return;
				}
				if (code !== codeWithSingleQuotes) {
					replaceCount++;
					verbose && console.log('Replacing double quoted strings with single quoted strings in %s', file);
					fs.writeFileSync(file, codeWithSingleQuotes, 'utf-8');
				}
			}
		});
		finder.on('end', function () {
			console.log('%d .js files were scanned by jsq', fileCount);
			skipCount && console.log('%s of those were skipped because of error parsing file or bug in jsq', skipCount,
				verbose ? '' : '(use -v param to see details)');
			console.log('%s of those had double quoted JavaScript strings replaced', replaceCount || 'None');
		});
	});
}
