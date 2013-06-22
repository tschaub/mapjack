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

With Tampermonkey you can `@require` the user script on your filesystem during development.  For example, if the path to the build script is `/path/to/mapjack/.grunt/mapjack/dist/mapjack.user.js` then you could create a new script in Tampermonkey that looks like this:

    // ==UserScript==
    // @name mapjack
    // @namespace http://tschaub.net/mapjack/
    // @version 0.0.5
    // @description Map based editing of GeoJSON files on GitHub.
    // @match https://github.com/*/*/edit/*/*.geojson
    // @grant unsafeWindow
    // @require file:///path/to/mapjack/.grunt/mapjack/dist/mapjack.user.js
    // ==/UserScript==

With the latest Tampermonkey, scripts that use the `file://` scheme are not cached, so you should be able to reload after making edits and pull in your edits.
