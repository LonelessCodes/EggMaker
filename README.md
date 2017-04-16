# Egg Maker

<https://beta.loneless.org/exp/easter>

![Egg Maker Image](https://github.com/LonelessCodes/EggMaker/raw/master/images/screenshot.png "Egg Maker Screenshot")

**Big** thanks to [Daniel Shiffman](http://shiffman.net) for his tutorial on inverse kinematics and also to [Matt DesLauriers](http://mattdesl.svbtle.com) for his [example](http://color-wander.surge.sh) on generative art in NodeJS.

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

```javascript

```