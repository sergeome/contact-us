//TODO - what is undefined used for below?

(function ($, window, document, Motif, undefined) {

	"use strict";

	var App = function () {
		this.initUI();
		this.initForms();
		this.initGoogleMaps();
		this.loadSVGSprite();
		this.initMobileMenu();
	};

	App.prototype.initUI = function () {
		//TODO - fix error for plugin below
		// $(".js-tabs").plugin("tabs", {
		// 	"cssTransition": Modernizr.csstransitions
		// });
		$(".canvas-trigger").plugin("reveal", {
			"type": "exclusive",
			"activeClass": "is-active",
			"visitedClass": "was-active"
		});
		$(".js-reveal").plugin("reveal", {
			"type": "exclusive",
			"activeClass": "is-revealed",
			"visitedClass": "was-revealed"
		});
		$(".js-fade").plugin("reveal", {
			"activeClass": "is-faded",
			"visitedClass": "was-faded"
		});
		$(".js-expand").plugin("reveal", {
			"type": "exclusive",
			"activeClass": "is-expanded",
			"visitedClass": "was-expanded"
		});
	};

	App.prototype.initForms = function () {
		$("[data-validation='ajax']").plugin("ajaxSubmission");
		$("[data-validation='true']").plugin("gauntlet");
	};

	App.prototype.initGoogleMaps = function () {

		var googleMapsLibURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBBg51aZ0IIgsdXSw35gOOGsqFhIOjoRnw';

		$.getScript(googleMapsLibURL, function(){
			var myLatLng = {lat: 32.773095, lng: -96.790237};
			var map = new google.maps.Map($('.google-maps')[0], {
				zoom: 8,
				center: myLatLng
			});
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: 'Hello World!'
			});
		});
	};

	App.prototype.loadSVGSprite = function () {

		var self = {};

		function insertSprite(data) {
			var svgString = $(data).find('svg')[0].outerHTML;
			$('body').prepend(svgString)
		}

		self.init = function () {
			$.ajax({
				method: 'get',
				url: 'dist/icons/icons-sprite.svg',
				success: insertSprite
			})
		};

		$(document).ready(function () {
			self.init()
		})

	};

	App.prototype.initMobileMenu = function () {
		$(document).ready(function () {
			var navLinks = $('.nav-links');

			var mobileMenuOpen = $('.hamburger__open');
			var mobileMenuClose = $('.hamburger__close');

			// Calculate mobile menu height
			var docHeight = $(document).height();
			var headerHeight = $('.header-wrapper').height();
			var navHeight = $('.main-nav').height();
			var mobileMenuHeight = docHeight - navHeight - headerHeight;

			//Add click listener
			$('.hamburger').on('click', function () {
				//Getting window width
				var windowWidth = $(window).width();

				// If menu is already opened then remove class and animate to width 0
				if ($(navLinks).hasClass('nav-links--expanded')) {
					$(navLinks).animate({
						width: "0"
					}, 300, function () {
						//TODO - refactor with CSS Classes
						mobileMenuClose.hide();
						mobileMenuOpen.show();
						$(this).removeClass('nav-links--expanded');
						$(this).removeAttr('style');
					});
				} else {
					//If menu isn't opened then opened it
					$(navLinks).css('height', mobileMenuHeight); //specify Mobile menu height
					$(navLinks).css('display', 'block'); // Show menu
					// If it mobile screen open menu in full width
					if (windowWidth < 480) {
						$(navLinks).animate({
							width: "100%"
						}, 300, function () {
							$(this).addClass('nav-links--expanded');
							mobileMenuOpen.hide();
							mobileMenuClose.show();
						});
					} else { // If it tablet screen open menu in 30% of full width
						$(navLinks).animate({
							width: "30%"
						}, 300, function () {
							$(this).addClass('nav-links--expanded');
							mobileMenuOpen.hide();
							mobileMenuClose.show();
						});
					}
				}
			})
		});

	};

	new App();

}(jQuery, window, document, window.Motif = window.Motif || {
		"utils": {},
		"apps": {}
}) );