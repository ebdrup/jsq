jsq
---

Command line tool for transforming all double quote strings in JavaScript (.js) file(s) to single quoted strings

```
npm install jsq -g
```

usage
-----
```
jsq fileOrDirectory [fileOrDirectory [...]] [-v]
```

`-v` will give you verbose output.

effect
------
A file containing the code:

```js
var y = "hello";
function x(){
	return "hello\" I am a string's for sure";
}
```

Will contain this, after `jsq` is run on it:

```js
var y = 'hello';
function x(){
	return 'hello" I am a string\'s for sure';
}
```

jsq prints errors when running it with `-v` parameter, should I worry?
----------------------------------------------------------------------
TLDR; No don't worry. Files are just skipped.

When in verbose mode `jsq` prints an error for one of two reasons:
- The JavaScript code is invalid and can not be parsed correctly: The file is skipped.
- There is a bug in `jsq` that would cause it to produce malformed JavaScript: The file is skipped.

So basically, `jsq` is just letting you know that some files are beeing skipped.

why create jsq?
---------------
I created this tool because we where initially using both single quoted and double quoted strings in our JavaScript code
on a project.

Then we decided that our coding-standard should be single-quotes JavaSctipt strings, but the codebase was a mix.

With `jsq` I was able to clean up the entire project in a jiff.
