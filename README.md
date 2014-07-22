#Ratestars

jQuery plugin for rating content with stars

##Usage

Run plugin on input as shown in examples bellow

```javascript
$('input').ratestars();

$('input').ratestars({
	'rateOnce': true,
	'rateCallback': function(){
		console.log('Ajax request for saving rating to database')
	}
});

$('input').ratestars({
	maxRate: 3,
	starClass: 'iconBacon'
});
```

##Available options / defaults

```javascript
$.ratestars.defaults = {
	'maxRate': 5,
	'tag': 'p',

	'elClass': 'rateStars',
	'elHoveredClass': 'hovered',
	'starClass': 'rateStar',
	'starActiveClass': 'active',
	'starHoveredClass': 'hovered',
	'labelClass': 'textLabel',

	'animateClass': 'clicked',
	'animateDuration': 300,

	'labels': [],
	'hoverEvents': true,
	'rateOnce': false,
	'rateCallback': null
};
```