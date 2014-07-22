;(function($){

	"use strict";

	var instanceCounter = 0;

	function Ratestars(input, options){

		this.$input = $(input);
		this.options = $.extend({}, $.ratestars.defaults, options);
		this.init();

	}

	$.extend(Ratestars.prototype, {

		init: function(){

			this.options.maxRate = this.$input.data('maxRate') || this.options.maxRate;
			this.options.starClass = this.$input.data('starClass') || this.options.starClass;
			this.options.elClass = this.$input.data('elClass') || this.options.elClass;

			this.ens = '.ratestars' + (++instanceCounter);
			this.starSelector = '.' + this.options.starClass.split(" ").join('.');
			this.hasLabels = !!this.options.labels.length;

			this.$el = this.$input.wrap('<'+ this.options.tag +'>').parent().addClass(this.options.elClass);
			this.$el.prepend(this.generateHtml());
			this.$stars = this.$el.find(this.starSelector);

			if (this.hasLabels) {
			    this.$label = this.$el.find('.' + this.options.labelClass.split(' ').join('.'));
			    this.labelText = this.$label.text();
			}

			var initInputVal = this.$input.val();

			if (initInputVal.length) {

				var rateNum = parseInt(initInputVal, 10),
					$selectedStar = this.$stars.eq(rateNum-1);

				$selectedStar.prevAll().addBack().addClass(this.options.starActiveClass);
				this.hasLabels && this.$label.text(this.options.labels[rateNum-1]);

			}

			this.events();

		},

		generateHtml: function(){

			var html = '';

			for(var i = 1; i <= this.options.maxRate; i++) {
				html += '<a class="'+ this.options.starClass +'">'+ i +'</a>';
			}

			return this.hasLabels ? html += '<span class="'+ this.options.labelClass +'">'+ this.options.labels[0] +'</span>' : html;

		},

		events: function(){

			var self = this;

			if (this.options.hoverEvents) {

				this.$el.on('mouseover' + this.ens, this.starSelector, function(){

					var $star = $(this);

					self.$el.addClass(self.options.elHoveredClass);
					$star.prevAll().addBack().addClass(self.options.starHoveredClass);
					if ( self.hasLabels ) { self.$label.text(self.options.labels[parseInt($star.text(),10)-1]); }

				}).on('mouseout' + this.ens, this.starSelector, function(){

					self.$el.removeClass(self.options.elHoveredClass);
					self.$stars.removeClass(self.options.starHoveredClass);
					if ( self.hasLabels ) { self.$label.text( self.labelText ); }

				});

			}

			this.$el.on('click' + this.ens, this.starSelector, function(){

				self.setValue(self.$stars.index($(this)) + 1);

			});

		},

		setValue: function(val){

			var $currentStar = this.$stars.eq(val-1),
				self = this;

			this.$stars.removeClass(this.options.starActiveClass);
			$currentStar.prevAll().addBack().addClass(this.options.starActiveClass);

			this.$input.val(val).trigger('change');

			if (this.hasLabels) {
				this.labelText = this.options.labels[val-1];
				this.$label.text(this.labelText);
			}

			$currentStar.addClass(this.options.animateClass);

			setTimeout(function(){
				$currentStar.removeClass(self.options.animateClass);
			}, self.options.animateDuration);

			this.options.rateCallback && this.options.rateCallback(val, this);
			this.options.rateOnce && this.$el.off(this.ens);

		},

		destroy: function(){

			this.$el.off(this.ens);
			this.$input.detach().insertAfter(this.$el);
			this.$el.remove();
			this.$input.data('ratestars', null);

		}
	});

	$.ratestars = Ratestars;

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

	$.fn.ratestars = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'ratestars')) {
				$.data(this, 'ratestars', new Ratestars( this, options ));
			}
		});
	};

})( window.jQuery || window.Zepto);