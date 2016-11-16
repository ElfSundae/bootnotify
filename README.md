# bootnotify

An easy way to show [Bootstrap Alerts][].

## Installation

```
npm install bootnotify
```

## Usage

:tada: **See [LIVE DEMO][] for more info.**

```js
$('body').bootnotify('Hello!');

$('#notify').bootnotify('Hello!', 'success');

$('#notify').bootnotify('<b>Error!</b>', 'danger', 'top');

$('#notify').bootnotify({
    title: '<i class="fa fa-warning"></i> Warning!',
    message: '...',
    animation: 'slide'
});

$('#notify').bootnotify('Auto hide').delay(2000).slideUp();
```

## LICENSE

MIT

[bootstrap alerts]: http://getbootstrap.com/components/#alerts
[live demo]: https://elfsundae.github.io/bootnotify/
