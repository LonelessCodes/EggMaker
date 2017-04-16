# Egg Maker

<https://beta.loneless.org/exp/easter>

![Egg Maker Image](https://github.com/LonelessCodes/EggMaker/raw/master/images/screenshot.png "Egg Maker Screenshot")

**Big** thanks to [Matt DesLauriers](http://mattdesl.svbtle.com) for his [example](http://color-wander.surge.sh) on generative art in NodeJS.

---

Egg Maker is a weekend project that's supposed to be just a non-sensical egg pattern generator that also ships with functionality to throw these eggs around afterwards.

It's written completely in **ES2015+** syntax, bundled using **Webpack** and **Babel**. Using the export/import syntax given by ES2015+ turned out to be a mind twisting difficulty in the middle of development, because of the async nature of browsers (e.g. async loading of images). Importing and exporting was only possible within the first eventloop, unlike the require() importing as we know it from Node, which made it all feel a little *Pyhon-y*. But you know me: anything that's modern I'll do, so I worked my way around that.

### Now to the code

I deeply studied DesLauries' example on generative art and the key features that he used were: 
+ A big library of color palettes that he converted to a minimalistic array (makes life much easier as ***it looks so good***)
+ About 20 images of architecture, nature, black-white patterns, etc., that will be used as height maps
+ a ton of modules including modules for: *Simplex Noise*, contrast, luminance and *seeds*

A random seed is generated, based on that seed the height map, max brush size, number of steps, color palette, noise scale, line style, etc. is chosen. Then drawing begins.

In my Egg Maker here I kinda use the same techniques, just that the height map is generated from pieces/stripes of post-modern architecture and common easter egg patterns
![Graph showing how height maps are made in Egg Maker](https://github.com/LonelessCodes/EggMaker/raw/master/images/heightmap.png "How the height maps are made")

---

### Things learned

Start small. My actual intentions were to create an app in which you can paint easter eggs, save them, look at the eggs from other people, take pictures of your eggs and share them.
This was quickly `nope`. Not in one weekend.

I then started to lower my expectations, which at this time still were pretty big. I actually wanted to use [PIXI.JS](http://pixijs.com) and [Matter.js](http://matterjs.com) for the user to kind of play around. Like, with the egg, in two dimensions. Throwing it around and stuff. This lasted till the end when I noticed the Webpack bundle was dramatically big.

So what happened in the end is just a [Color Wander](http://color-wander.surge.sh)-like code, that has Views implemented which are not being used. I've also discovered a problem with the seeds: getting the color palette, height map and initial particle values works fine, but calculating the new values for each particle seems to be broken (In the seeding sense, as noted).

Other than that, I'm happy.