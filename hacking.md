# hacking mapjack

If you're interested in contributing, modifying, or otherwise messing around with this, here's a quick description of the dev setup.

I've developed this with Node v0.8.18.  It should work on 0.10.x, but you may find otherwise (and please open a ticket when you do).

To get all dependencies:

    npm install

The rest of the build is driven by Grunt.  The Grunt CLI is included as a dev dependency, so you don't need it installed globally.  I've added script aliases for the key Grunt tasks, so you can `npm run foo` instead of `grunt foo` for basic tasks.

Build the `mapjack.user.js`:

    npm run build

(If you're following along, this would be `grunt build` if you have Grunt installed globally.)

Set up a watch to continuously rebuild `mapjack.user.js`:

    npm run watch

(You guessed it, this is `grunt watch` for the global install.)

The resulting `mapjack.user.js` file is built in `.grunt/mapjack/dist`.  The steps to load this as a user script depends on your browser extension.

With Tampermonkey, you can drop this `mapjack.user.js` script directly in the editor.  Or if you browse to its location on your filesystem in your browser, you can click on it to update.  This is kind of tedious to do repeatedly.  It might be slightly easier to create a user script with the required preamble that has a `@require` for the location of this script.  This might look something like the following:

```js
// ==UserScript==
// @name mapjack
// @namespace http://tschaub.net/mapjack/
// @version 0.0.2
// @description Map based editing of GeoJSON files on GitHub.
// @match https://github.com/*/*/edit/*/*.geojson
// @copyright 2013+, Tim Schaub
// @require file:///path/to/your/mapjack/.grunt/mapjack/dist/mapjack.user.js
// ==/UserScript==
```

I think you will still run into caching issues with this approach though (because the version number isn't changing with changes to the underlying script).  So you'll likely have to re-save this script with each change to the `@require`d `mapjack.user.js` script.  Clunky, I know.
