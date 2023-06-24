# PostCSS CSS Variables

[![npm version](https://badge.fury.io/js/postcss-css-variables.svg)](http://badge.fury.io/js/postcss-css-variables) [![Build Status](https://travis-ci.org/MadLittleMods/postcss-css-variables.svg)](https://travis-ci.org/MadLittleMods/postcss-css-variables) [![Gitter](https://badges.gitter.im/MadLittleMods/postcss-css-variables.svg)](https://gitter.im/MadLittleMods/postcss-css-variables?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

[PostCSS](https://github.com/postcss/postcss) plugin to transform [`CSS Custom Properties (CSS variables)`](http://dev.w3.org/csswg/css-variables/) syntax into a static representation. This plugin provides a future-proof way of using **most** of CSS variables features, including selector cascading with some caveats, because this can only see the CSS, not the potentially dynamic HTML and DOM the CSS is applied to.

### Install

```
npm install postcss postcss-css-variables --save-dev
```

### Table of Contents

- [Code Playground](#code-playground)
- [Usage](#usage)
- [Syntax](#syntax) - [Defining Custom Properties with `--*`](#defining-custom-properties-with---) - [Using Variables/Custom Properties with `var()`](#using-variables-custom-properties-with-var)
- [Features](#features) - [At-rules like `@media`, `@support`, etc.](#at-rules-like-media-support-etc) - [Pseudo-classes and Elements](#pseudo-classes-and-elements) - [Nested Rules](#nested-rules)
- [Why?](#why) - [Interoperability](#interoperability) - [Differences from `postcss-custom-properties`](#differences-from-postcss-custom-properties)
- [Caveats](#caveats)
- [Options](#options)
- [Quick Reference/Notes](#quick-referencenotes)
- [Testing](#testing)
- [Changelog](https://github.com/MadLittleMods/postcss-css-variables/blob/master/CHANGELOG.md)

# [Code Playground](https://madlittlemods.github.io/postcss-css-variables/playground/)

[Try it in the playground](https://madlittlemods.github.io/postcss-css-variables/playground/) and see what you think! Just add some CSS and see to see the final transformed/compiled CSS. You can try anything here in the playground, too.

# Usage

[_For more general PostCSS usage, look here._](https://github.com/postcss/postcss#usage)

```js
var postcss = require("postcss");
var cssvariables = require("postcss-css-variables");

var fs = require("fs");

var mycss = fs.readFileSync("input.css", "utf8");

// Process your CSS with postcss-css-variables
var output = postcss([cssvariables(/*options*/)]).process(mycss).css;

console.log(output);
```

# Syntax

### Defining Custom Properties with `--*`

A custom property is any property whose name starts with two dashes `--`. A property must be in a rule.

_Note: `:root` is nothing more than the selector for the root DOM node. Any other selector like `.class`, `#id`, or even `#foo ~ .bar > span.baz` works._

```css
:root {
  --foo-width: 100px;
  --foo-bg-color: rgba(255, 0, 0, 0.85);
}

.foo {
  --foo-width: 100px;
  --foo-bg-color: rgba(255, 0, 0, 0.85);
}
```

Custom properties can be declared multiple times, but like variable scope in other languages, only the most specific one takes precedence.

```css
:root {
  --some-color: red;
}

.foo {
  /* red */
  color: var(--some-color);
}

.bar {
  --some-color: blue;
  /* blue */
  color: var(--some-color);
}

.bar:hover {
  --some-color: green;
  /* Automatically gets a `color: green;` declaration because we `--some-color` used within scope elsewhere */
}
```

_[W3C Draft: CSS Custom Properties for Cascading Variables, section 2](http://dev.w3.org/csswg/css-variables/#defining-variables)_

### Using Variables/Custom Properties with `var()`

```css
.foo {
  width: var(--foo-width);
  /* You can even provide a fallback */
  background: var(--foo-bg-color, #ff0000);
}
```

_[W3C Draft: CSS Custom Properties for Cascading Variables, section 3](http://dev.w3.org/csswg/css-variables/#using-variables)_

# Features

### At-rules like `@media`, `@support`, etc.

It's perfectly okay to declare CSS variables inside media queries and the like. It'll work just as you would expect.

```css
:root {
  --width: 100px;
}

@media (max-width: 1000px) {
  :root {
    --width: 200px;
  }
}

.box {
  width: var(--width);
}
```

Will be transformed to:

```css
.box {
  width: 100px;
}

@media (max-width: 1000px) {
  .box {
    width: 200px;
  }
}
```

### Pseudo-classes and Elements

Psuedo-classes are also dealt with correctly, because it's easy to statically determine.

```css
.foo {
  --foo-color: red;
  color: var(--foo-color);
}

.foo:hover {
  --foo-color: green;
}
```

Will be transformed to:

```css
.foo {
  color: red;
}

.foo:hover {
  color: green;
}
```

### Nested Rules

This pairs very well with [`postcss-nested`](https://github.com/postcss/postcss-nested) or [`postcss-nesting`](https://github.com/jonathantneal/postcss-nesting), adding support for nested rules. For either, you must put the plugin before `postcss-css-variables` in the plugin stack so that the `&` references are expanded first (`postcss-css-variables` doesn't understand them). For example, with `postcss-nested`, your PostCSS setup would look like this:

```js
var postcss = require("postcss");
var cssvariables = require("postcss-css-variables");
var nested = require("postcss-nested");

var fs = require("fs");

var mycss = fs.readFileSync("input.css", "utf8");

var output = postcss([
  // Flatten/unnest rules
  nested,
  // Then process any CSS variables
  cssvariables(/*options*/)
]).process(mycss).css;

console.log(output);
```

For a simple example with nesting:

```css
.box-foo {
  --some-width: 150px;
  width: var(--some-width);

  .box-bar {
    width: var(--some-width);
  }
}
```

With also `postcss-nesting`, this will be transformed to:

```css
.box-foo {
  width: 150px;
}

.box-foo .box-bar {
  width: 150px;
}
```

For a more complex example with a media query:

```css
:root {
  --some-width: 150px;
}

.box-foo {
  width: var(--some-width);

  .box-bar {
    width: var(--some-width);
  }
}

@media (max-width: 800px) {
  .box-foo {
    --some-width: 300px;
  }
}
```

Will be transformed to:

```css
.box-foo {
  width: 150px;
}

.box-foo .box-bar {
  width: 150px;
}

@media (max-width: 800px) {
  .box-foo {
    width: 300px;
  }

  .box-foo .box-bar {
    width: 300px;
  }
}
```

# Why?

This plugin was spawned out of a [discussion on the `cssnext` repo](https://github.com/cssnext/cssnext/issues/99) and a personal need.

There is another similar plugin available, [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties), although it restricts itself much more than this plugin, preferring partial spec conformance. This plugin has the same capabilities but also adds imperfect feature support which stem from not being able to know what the DOM will look like when you compile your CSS. We instead look at the explicit structure of your CSS selectors.

### Interoperability and differences from `postcss-custom-properties`

Putting `postcss-css-variables` in place of `postcss-custom-properties` should work out of the box.

In [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties), CSS variable declarations are specifically restricted to the `:root` selector.

In `postcss-css-variables`, this is not the case and they may be declared inside any rule with whatever selector. The variables are substituted based on statically known CSS selector inheritance.

Here's a quick overview of the differences:

- CSS variables may be declared in any selector like `.foo` or `.foo .bar:hover`, and is not limited to just `:root`
- CSS variables may be declared in `@media`, `@support`, and other at-rules.
- CSS variables may be declared in `:hover` and other psuedo-classes, which get expanded properly.
- Variables in nested rules can be deduced with the help of [`postcss-nested`](https://github.com/postcss/postcss-nested) or [`postcss-nesting`](https://github.com/jonathantneal/postcss-nesting).

Continue to the next section to see where some of these might be unsafe to do. There are reasons behind the ethos of why the other plugin, [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties), is very limited in what it supports, due to differing opinions on what is okay to support.

# Caveats

When you declare a CSS variable inside one selector, but consume it in another, this does make an unsafe assumption about it which can be non-conforming in certain edge cases. Here is an example where these limitations result in non-conforming behavior.

Note the nested markup below. We only know about the DOM's inheritance from your CSS selectors. If you want nest multiple times, you need to be explicit about it in your CSS which isn't necessary with browser that natively support CSS variables. See the innermost `<div class="title">`

```html
<div class="component">
  Black

  <div class="title">
    Blue

    <div class="decoration">
      Green

      <div class="title">Blue with this plugin, but green per spec</div>
    </div>
  </div>
</div>
```

```css
.component {
  --text-color: blue;
}

.component .title {
  color: var(--text-color);
}

.component .decoration {
  --text-color: green;
  color: var(--text-color);
}
```

[`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties) avoids this problem entirely by restricting itself to just the `:root` selector. This is because the developers there would prefer to not support a feature instead of something almost-spec-compliant like what `postcss-css-variables` does.

# Options

### `preserve` (default: `false`)

Allows you to preserve custom properties & var() usage in output.

Possible values:

- `false`: Removes `--var` declarations and replaces `var()` with their resolved/computed values.
- `true`: Keeps `var()` declarations in the output and has the computed value as a fallback declaration. Also keeps computed `--var` declarations.
- `'computed'`: Keeps computed `--var` declarations in the output. Handy to make them available to your JavaScript.
- `(declaration) => boolean|'computed'` : function/callback to programmatically return whether preserve the respective declaration

### `variables` (default: `{}`)

Define an object map of variables in JavaScript that will be declared at the `:root` scope.

Can be a simple key-value pair or an object with a `value` property and an optional `isImportant` bool property.

The object keys are automatically prefixed with `--` (according to CSS custom property syntax) if you do not provide it.

### `preserveInjectedVariables` (default: `true`)

Whether to preserve the custom property declarations inserted via the `variables` option from final output.

A typical use case is [CSS Modules](https://github.com/css-modules/css-modules), where you would want to avoid
repeating custom property definitions in every module passed through this plugin. Setting this option to `false`
prevents JS-injected variables from appearing in output CSS.

```js
var postcss = require("postcss");
var cssvariables = require("postcss-css-variables");

postcss([
  cssvariables({
    variables: {
      "--some-var": "100px",
      "--other-var": {
        value: "#00ff00"
      },
      "--important-var": {
        value: "#ff0000",
        isImportant: true
      }
    }
  })
]).process(css, opts);
```

### `preserveAtRulesOrder` (default: `false`)

Keeps your at-rules like media queries in the order to defined them.

Ideally, this would be defaulted to `true` and it will be in the next major version. All of the tests expecations need to be updated and probably just drop support for `preserveAtRulesOrder: false`

# Quick Reference/Notes

- This plugin was spawned out of a [discussion on the `cssnext` repo](https://github.com/cssnext/cssnext/issues/99).
- We provide a larger CSS variable feature subset than [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties).
- Related links and issues: - [var declared in media query should pull in properties that use/reference that var _on `cssnext/cssnext`_](https://github.com/cssnext/cssnext/issues/99) - [Investigate support for media-query scoped properties _on `postcss/postcss-custom-properties`_](https://github.com/postcss/postcss-custom-properties/issues/9) - [remove `:root` limitation by injecting rules with new declarations that just contains modified properties. _on `postcss/postcss-custom-properties`_](https://github.com/postcss/postcss-custom-properties/issues/1)

# Testing

We have a suite of [Mocha](http://mochajs.org/) tests. If you see something that doesn't have coverage, make an issue or pull request.

Run once:

`npm install`

Run whenever you want to test:

`npm run test`
