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

While it is tedious, with Tampermonkey it looks to me like you have to manually force the script to upgrade.  One way to do this is to leave a browser tab open to the user script (e.g. http://localhost/projects/mapjack/.grunt/mapjack/dist/mapjack.user.js or however you browse your project files).  Then you make changes in your text editor, wait a second or two for the build to finish, reload the tab, and agree to update the user script.
