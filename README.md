jsq
---

Command line tool for transforming all double quote strings in JavaScript (.js) file(s) to single quoted strings

```
npm install jsq -g
```

usage
-----
```
jsq fileOrDirectory [fileOrDirectory [...]]
```

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

Why?
----
I created this tool because we where initially using both single quoted and double quoted strings in our JavaScript code
on project.

Then we decided that our coding-standard should be single-quotes JavaSctipt strings, but the codebase was a mix.

With `jsq` I was able to clean up the entire project in a jiff.
