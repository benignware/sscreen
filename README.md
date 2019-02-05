# sscreen

A scss library for working with custom media queries


## Install

```cli
npm i sscreen -D
```

## Usage

The library consists of a mixin `screen-set` which lets you define your breakpoints and a function `screen-get` for retrieval as well as mixins `screen-up` and `screen-down` by which you actually make your stuff responsive.

> Note: For getting `sscreen` to work in recent user-agents, `@custom-media` directives must be transpiled on top of scss compilation. See [postcss-custom-media](https://github.com/postcss/postcss-custom-media) for further information


Here's a complete example...

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-custom-media')({
      preserve: true // For the sake of example, we preserve our transpiled @custom-media rules
    })
  ]
};
```

```scss
$screen-prefix: prefix-;
$screen-style: kebabCase;
$screen-breakpoint-delimiter: '-';

// Define your breakpoints
@include screen-set((
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
));
```

```scss
// Grid.scss
.Grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: -1rem;
  box-sizing: border-box;
}
```

```scss
// GridItem.scss
.GridItem {
  padding: 1rem;
  box-sizing: border-box;
  $columns: 12;

  @each $breakpoint in map-keys(screen-get()) {
    $infix: screen-infix($breakpoint);

    @include screen-up($breakpoint) {
      @for $size from 1 through $columns {
        &--#{$infix}#{$size} {
          flex: 0 0 percentage($size / $columns);
          max-width: percentage($size / $columns);
        }
      }
    }
  }
}
```

Output:

```css
@custom-media --prefix-xs-down (max-width: 575.98px);

@custom-media --prefix-sm-up (min-width: 576px);

@custom-media --prefix-sm-down (max-width: 767.98px);

@custom-media --prefix-md-up (min-width: 768px);

@custom-media --prefix-md-down (max-width: 991.98px);

@custom-media --prefix-lg-up (min-width: 992px);

@custom-media --prefix-lg-down (max-width: 1199.98px);

@custom-media --prefix-xl-up (min-width: 1200px);

.Grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: -1rem;
  box-sizing: border-box;
}

.GridItem {
  padding: 1rem;
  box-sizing: border-box;
}

.GridItem--1 {
  flex: 0 0 8.33333%;
  max-width: 8.33333%;
}

/* ... */

.GridItem--12 {
  flex: 0 0 100%;
  max-width: 100%;
}

@media (min-width: 576px) {
  .GridItem--sm-1 {
    flex: 0 0 8.33333%;
    max-width: 8.33333%;
  }
  /* ... */
  .GridItem--sm-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (--prefix-sm-up) {
  .GridItem--sm-1 {
    flex: 0 0 8.33333%;
    max-width: 8.33333%;
  }
  /* ... */
  .GridItem--sm-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 768px) {
  .GridItem--md-1 {
    flex: 0 0 8.33333%;
    max-width: 8.33333%;
  }
  /* ... */
  .GridItem--md-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (--prefix-md-up) {
  .GridItem--md-1 {
    flex: 0 0 8.33333%;
    max-width: 8.33333%;
  }
  /* ... */
  .GridItem--md-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 992px) {
  .GridItem--lg-1 {
    flex: 0 0 8.33333%;
    max-width: 8.33333%;
  }
  /* ... */
  .GridItem--lg-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (--prefix-lg-up) {
  .GridItem--lg-1 {
    flex: 0 0 8.33333%;
    max-width: 8.33333%;
  }
  /* ... */
  .GridItem--lg-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 1200px) {
  .GridItem--xl-1 {
    flex: 0 0 8.33333%;
    max-width: 8.33333%;
  }
  /* ... */
  .GridItem--xl-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (--prefix-xl-up) {
  .GridItem--xl-1 {
    flex: 0 0 8.33333%;
    max-width: 8.33333%;
  }
  /* ... */
  .GridItem--xl-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}


```

> Note: `sscreen` is intented for being used at application level and is currently not suited for being incorporated into a dedicated scss library

## Development

In order to run specs, issue the following from your terminal:

```cli
npm test
```

Run dev-server

```cli
npm start
```

Create a build (for whatever purpose)

```cli
npm run build
```
