# v0.18.0 - 2021-05-11

- [breaking] Add basic postcss 8 support (older versions of PostCSS no longer compatible)
  - Thank you to [@delucis](https://github.com/delucis) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/129)


# v0.17.0 - 2020-04-24

- Expand variables in AtRule properties
  - Thank you to [@pvande](https://github.com/pvande) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/104)
  - Merged via https://github.com/MadLittleMods/postcss-css-variables/pull/121

# v0.16.0 - 2020-04-24

- Add ability to pass callback function to `options.preserve` to determine whether to preserve declaration
  - Thank you to [@ekatioz](https://github.com/ekatioz) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/116)

# v0.15.0 - 2020-04-24

- Fix algorithm to find balanced `var()` pairs and nested parenthesis
  - Thank you to [@Poetro](https://github.com/Poetro) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/112)

# v0.14.0 - 2019-11-24

- Fix regex in `resolve-value.js` to allow nested CSS functions
  - Thank you to [@juliovedovatto](https://github.com/juliovedovatto) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/97)

# v0.13.0 - 2019-06-17

- Add `options.preserveAtRulesOrder` so media queries are outputted in the order they are defined (as expected)
  - Thank you to [@erikthalen](https://github.com/erikthalen) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/92) via https://github.com/MadLittleMods/postcss-css-variables/pull/101
- Remove `calc` from readme table of contents for non-existent section
  - Thank you to [@AlexandreArpin](https://github.com/AlexandreArpin) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/99)

# v0.12.0 - 2019-02-21

- Accept whitespace in `var( --var )` expression
  - Thank you to [@benwest](https://github.com/benwest) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/93)

# v0.11.0 - 2018-10-09

- Fix JS-defined variables using `isImportant`, https://github.com/MadLittleMods/postcss-css-variables/pull/87

# v0.10.0 - 2018-09-25

- Cast `opts.variables` variable values to string
  - Thank you to [@shonie](https://github.com/shonie) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/84)

# v0.9.0 - 2018-06-26

- Adds `opts.preserveInjectedVariables`, which when set to `false`, removes the `:root { ... }` custom property declarations added via `opts.variables`
  - Thank you to [@akdetrick](https://github.com/akdetrick) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/74)

# v0.8.1 - 2018-03-21

- Log `undefined` variables (available in `result.warnings()`)
  - Thank you to [@pixeldrew](https://github.com/pixeldrew) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/69)

# v0.8.0 - 2017-08-08

- Remove PostCSS `moveTo`/`append` deprecation warnings, [#50](https://github.com/MadLittleMods/postcss-css-variables/issues/50)
  - Thank you to [@modosc](https://github.com/modosc) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/56)

# v0.7.0 - 2017-03-12

- Resolve `var` usage in fallbacks, [#37](https://github.com/MadLittleMods/postcss-css-variables/issues/37)
  - Thank you to [@asvny](https://github.com/asvny) and [@marklu](https://github.com/marklu) for the contribution, [#39](https://github.com/MadLittleMods/postcss-css-variables/issues/39) -> [#49](https://github.com/MadLittleMods/postcss-css-variables/pull/49)

# v0.6.0 - 2016-09-23

- Update/refactor readme
  - Thank you to [@isiahmeadows](github.com/isiahmeadows) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/36)
- Use string value for `undefined` variables to play nice with other plugins downstream
  - Thank you to [@vincentorback](github.com/vincentorback) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/44)

# v0.5.2 - 2016-08-24

- Fix [#42](https://github.com/MadLittleMods/postcss-css-variables/issues/42) where `opts.preserve` was not working inside at-rules
  - Thank you to [@muftiev](github.com/muftiev) for the [contribution](https://github.com/MadLittleMods/postcss-css-variables/pull/43)

# v0.5.1 - 2015-10-24

- Fix [postcss/postcss#611](https://github.com/postcss/postcss/issues/611) where we were trying to remove the root node on clean up
- Improved test setup

# v0.5.0 - 2015-09-12

- Upgrade to PostCSS v5. Fix [#20](https://github.com/MadLittleMods/postcss-css-variables/issues/20)

# v0.4.0 - 2015-07-02

- Fix [#15](https://github.com/MadLittleMods/postcss-css-variables/issues/15) - Remove slowness from cloning the `root` with `node.clone().removeAll()`. Now using `./lib/shallow-clone-node.js` to avoid cloning children which will get removed right after. - Thank you to [@ddprrt](https://github.com/ddprrt) for bringing up the slowness issue in this article, [PostCSS misconceptions](https://medium.com/@ddprrt/postcss-misconceptions-faf5dc5038df).

# v0.3.9 - 2015-06-29

- Remove `opts` global leak. Fix [#13](https://github.com/MadLittleMods/postcss-css-variables/issues/13)

# v0.3.8 - 2015-05-28

- Add support for pseudo selectors `:hover` `:before`

# v0.3.7 - 2015-05-27

- Fix [#7](https://github.com/MadLittleMods/postcss-css-variables/issues/7): Support for child combinator
- Added tests for child-combinator/direct-descendant coverage

# v0.3.6 - 2015-05-21

- Fix [#6](https://github.com/MadLittleMods/postcss-css-variables/issues/6). Variable usage in comma separated selector to use proper scope

# v0.3.5 - 2015-05-12

- Big refactor of code to reduce cyclomatic complexity. Still needs work though.
- Fix variable referencing another variable resolution when being changed by at-rule in non-root rule

# v0.3.4 - 2015-05-12

- Fix variable referencing another variable resolution when being changed by at-rule

# v0.3.3 - 2015-05-11

- Add support for last piece of combinator chain in selector resolution matching. - `.foo + .bar` can match variables declared in `.bar`

# v0.3.1 - 2015-05-05

- Large overhaul of code to make it more robust on proper scope resolution.
- Fix [#2]](https://github.com/MadLittleMods/postcss-css-variables/issues/2)

# v0.2.3 - 2015-05-04

- Add support for CSS4 descendant selector `>>` syntax

# v0.2.2 - 2015-05-01

- Automatically prefix any variables defined in `options.variables` with `--` (according to CSS custom property syntax).

# v0.2.1 - 2015-04-30

- Added support for descendant selector nesting instead of just physical space nesting
- Fixed issue with comma separated rules. It was throwing a undefined is not a function error
- Moved to external scope check `isUnderScope` instead of integrated into `resolveValue`
- Added test for empty `var()` call. See [test/fixtures/empty-var-func.css](https://github.com/MadLittleMods/postcss-css-variables/blob/master/test/fixtures/empty-var-func.css)

# v0.1.0 - 2015-04-29

- First release
