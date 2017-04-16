const gulp = require("gulp");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const clone = require("gulp-clone");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const html = require("gulp-htmlclean");
const del = require("del");
const fs = require("fs");
const Canvas = require("canvas-prebuilt");

gulp.task("js", () => {
  return gulp.src("./src/js/main.js")
    .pipe(webpackStream(require("./webpack.config.js"), webpack))
    .pipe(gulp.dest("./build/"));
});

gulp.task("sass", () => {
  return gulp.src("./src/sass/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" })
      .on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./build/css/"));
});

gulp.task("html", () => {
  return gulp.src("./src/**.html", { base: "./src" })
    .pipe(html())
    .pipe(gulp.dest("./build/"));
});

gulp.task("images", () => {
  return gulp.src("./src/assets/**/*.(png|gif|jpg|jpeg|bmp|svg)")
    .pipe(imagemin())
    .pipe(gulp.dest("./build/assets/"));
});

gulp.task("assets", () => {
  return gulp.src(["./src/assets/**/*", "!./src/assets/**/*.(png|gif|jpg|jpeg|bmp|svg)"])
    .pipe(clone())  
    .pipe(gulp.dest("./build/assets/"));
});

gulp.task("maps", cb => {
  fs.readdir("./src/maps", (err, files) => {
    if (err) cb(err);

    const width = 800;
    const height = 200;
    const canvas = new Canvas(width, height * (files.length || 1));
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    files.forEach((map, i) => {
      const img = new Canvas.Image();
      img.src = fs.readFileSync("./src/maps/" + map);
      ctx.drawImage(img, 0, i * height);
    });
    if (!fs.existsSync("./build/assets/")) fs.mkdirSync("./build/assets/");
    fs.writeFile("./build/assets/maps.png", canvas.toBuffer(), cb);
  });
});

gulp.task("clean", () => {
  del.sync("./build/**/*");
});

gulp.task("build", ["clean", "html", "images", "assets", "maps", "js", "sass"]);

gulp.task("watch", () => {
  const express = require("express");
  const app = express();

  app.use(express.static("./build/"));
  
  app.listen(8080, "0.0.0.0", () => console.log("Listening at localhost:8080"));

  gulp.watch("./src/js/**/*.js", ["js"]);
  gulp.watch("./src/sass/**/*.scss", ["sass"]);
  gulp.watch("./src/**.html", ["html"]);
  gulp.watch("./src/assets/**/*.(png|gif|jpg|jpeg|bmp|svg)", ["images"]);
  gulp.watch(["./src/assets/**/*", "!./src/assets/**/*.(png|gif|jpg|jpeg|bmp|svg)"], ["assets"]);
});

gulp.task("default", ["build", "watch"]);