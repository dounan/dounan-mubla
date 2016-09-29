## Start dev server

```
npm start
```

This starts the webpack dev server at <http://localhost:8080>.

## Build and deploy

```
npm run build
npm run deploy
```

The static files are deployed to github at <https://dounan.github.io/dounan-mubla/>.

## Analyzing the build

```
npm run stats[-dev]
```

The command above will output a file **build-stats[-dev].json** that can be
analyzed with a tool such as <http://webpack.github.io/analyse/>.

## Notes

### CSS files

Each CSS file should correspond to exactly one component. Because of this, it
makes more sense to keep the CSS file right next to the component file. This is
why the CSS files are also placed in the components directory with the same
name as the .jsx file.

Not every component needs to have a CSS file.

