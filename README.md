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

```scss
$screen-prefix: prefix-;
$screen-style: camelCase;

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
    @include screen-up($breakpoint) {
      @for $size from 1 through $columns {
        &--#{$breakpoint}-#{$size} {
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
@custom-media --prefix-down (max-width: 575.98px);

@custom-media --prefix-smUp (min-width: 576px);

@custom-media --prefix-smDown (max-width: 767.98px);

@custom-media --prefix-mdUp (min-width: 768px);

@custom-media --prefix-mdDown (max-width: 991.98px);

@custom-media --prefix-lgUp (min-width: 992px);

@custom-media --prefix-lgDown (max-width: 1199.98px);

@custom-media --prefix-xlUp (min-width: 1200px);

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

.GridItem--xs-1 {
  flex: 0 0 8.33333%;
  max-width: 8.33333%;
}

/* ... */

.GridItem--xs-12 {
  flex: 0 0 100%;
  max-width: 100%;
}

@media (--prefix-smUp) {
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

@media (--prefix-mdUp) {
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

@media (--prefix-lgUp) {
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

@media (--prefix-xlUp) {
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
