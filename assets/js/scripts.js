// Utility function
function Util () {};

/* class manipulation functions */
Util.hasClass = function(el, className) {
	return el.classList.contains(className);
};

Util.addClass = function(el, className) {
	var classList = className.split(' ');
 	el.classList.add(classList[0]);
 	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
	var classList = className.split(' ');
	el.classList.remove(classList[0]);	
	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
	if(bool) Util.addClass(el, className);
	else Util.removeClass(el, className);
};

Util.setAttributes = function(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

/* DOM manipulation */
Util.getChildrenByClassName = function(el, className) {
  var children = el.children,
    childrenByClass = [];
  for (var i = 0; i < children.length; i++) {
    if (Util.hasClass(children[i], className)) childrenByClass.push(children[i]);
  }
  return childrenByClass;
};

Util.is = function(elem, selector) {
  if(selector.nodeType){
    return elem === selector;
  }

  var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector),
    length = qa.length;

  while(length--){
    if(qa[length] === elem){
      return true;
    }
  }

  return false;
};

/* Animate height of an element */
Util.setHeight = function(start, to, element, duration, cb, timeFunction) {
	var change = to - start,
	    currentTime = null;

  var animateHeight = function(timestamp){  
    if (!currentTime) currentTime = timestamp;         
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = parseInt((progress/duration)*change + start);
    if(timeFunction) {
      val = Math[timeFunction](progress, start, to - start, duration);
    }
    element.style.height = val+"px";
    if(progress < duration) {
        window.requestAnimationFrame(animateHeight);
    } else {
    	if(cb) cb();
    }
  };
  
  //set the height of the element before starting animation -> fix bug on Safari
  element.style.height = start+"px";
  window.requestAnimationFrame(animateHeight);
};

/* Smooth Scroll */
Util.scrollTo = function(final, duration, cb, scrollEl) {
  var element = scrollEl || window;
  var start = element.scrollTop || document.documentElement.scrollTop,
    currentTime = null;

  if(!scrollEl) start = window.scrollY || document.documentElement.scrollTop;
      
  var animateScroll = function(timestamp){
  	if (!currentTime) currentTime = timestamp;        
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = Math.easeInOutQuad(progress, start, final-start, duration);
    element.scrollTo(0, val);
    if(progress < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  window.requestAnimationFrame(animateScroll);
};

/* Move Focus */
Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName("body")[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};

/* Misc */

Util.getIndexInArray = function(array, el) {
  return Array.prototype.indexOf.call(array, el);
};

Util.cssSupports = function(property, value) {
  return CSS.supports(property, value);
};

// merge a set of user options into plugin defaults
// https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
Util.extend = function() {
  // Variables
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  // Check if a deep merge
  if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
    deep = arguments[0];
    i++;
  }

  // Merge the object into the extended object
  var merge = function (obj) {
    for ( var prop in obj ) {
      if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
        // If deep merge and property is an object, merge properties
        if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
          extended[prop] = extend( true, extended[prop], obj[prop] );
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for ( ; i < length; i++ ) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;
};

// Check if Reduced Motion is enabled
Util.osHasReducedMotion = function() {
  if(!window.matchMedia) return false;
  var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(matchMediaObj) return matchMediaObj.matches;
  return false; // return false if not supported
}; 

/* Animation curves */
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

Math.easeInQuart = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t + b;
};

Math.easeOutQuart = function (t, b, c, d) { 
  t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
};

Math.easeInOutQuart = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t + b;
	t -= 2;
	return -c/2 * (t*t*t*t - 2) + b;
};

Math.easeOutElastic = function (t, b, c, d) {
  var s=1.70158;var p=d*0.7;var a=c;
  if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  if (a < Math.abs(c)) { a=c; var s=p/4; }
  else var s = p/(2*Math.PI) * Math.asin (c/a);
  return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
};


/* JS Utility Classes */

// make focus ring visible only for keyboard navigation (i.e., tab key) 
(function() {
  var focusTab = document.getElementsByClassName('js-tab-focus'),
    shouldInit = false,
    outlineStyle = false,
    eventDetected = false;

  function detectClick() {
    if(focusTab.length > 0) {
      resetFocusStyle(false);
      window.addEventListener('keydown', detectTab);
    }
    window.removeEventListener('mousedown', detectClick);
    outlineStyle = false;
    eventDetected = true;
  };

  function detectTab(event) {
    if(event.keyCode !== 9) return;
    resetFocusStyle(true);
    window.removeEventListener('keydown', detectTab);
    window.addEventListener('mousedown', detectClick);
    outlineStyle = true;
  };

  function resetFocusStyle(bool) {
    var outlineStyle = bool ? '' : 'none';
    for(var i = 0; i < focusTab.length; i++) {
      focusTab[i].style.setProperty('outline', outlineStyle);
    }
  };

  function initFocusTabs() {
    if(shouldInit) {
      if(eventDetected) resetFocusStyle(outlineStyle);
      return;
    }
    shouldInit = focusTab.length > 0;
    window.addEventListener('mousedown', detectClick);
  };

  initFocusTabs();
  window.addEventListener('initFocusTabs', initFocusTabs);
}());

function resetFocusTabsStyle() {
  window.dispatchEvent(new CustomEvent('initFocusTabs'));
};
// File#: _1_accordion
// Usage: codyhouse.co/license
(function() {
	var Accordion = function(element) {
		this.element = element;
		this.items = getChildrenByClassName(this.element, 'js-accordion__item');
		this.version = this.element.getAttribute('data-version') ? '-'+this.element.getAttribute('data-version') : '';
		this.showClass = 'accordion'+this.version+'__item--is-open';
		this.animateHeight = (this.element.getAttribute('data-animation') == 'on');
		this.multiItems = !(this.element.getAttribute('data-multi-items') == 'off'); 
		// deep linking options
		this.deepLinkOn = this.element.getAttribute('data-deep-link') == 'on';
		// init accordion
		this.initAccordion();
	};

	Accordion.prototype.initAccordion = function() {
		//set initial aria attributes
		for( var i = 0; i < this.items.length; i++) {
			var button = this.items[i].getElementsByTagName('button')[0],
				content = this.items[i].getElementsByClassName('js-accordion__panel')[0],
				isOpen = this.items[i].classList.contains(this.showClass) ? 'true' : 'false';
			button.setAttribute('aria-expanded', isOpen);
			button.setAttribute('aria-controls', 'accordion-content-'+i);
			button.setAttribute('id', 'accordion-header-'+i);
			button.classList.add('js-accordion__trigger');
			content.setAttribute('aria-labelledby', 'accordion-header-'+i);
			content.setAttribute('id', 'accordion-content-'+i);
		}

		//listen for Accordion events
		this.initAccordionEvents();

		// check deep linking option
		this.initDeepLink();
	};

	Accordion.prototype.initAccordionEvents = function() {
		var self = this;

		this.element.addEventListener('click', function(event) {
			var trigger = event.target.closest('.js-accordion__trigger');
			//check index to make sure the click didn't happen inside a children accordion
			if( trigger && Array.prototype.indexOf.call(self.items, trigger.parentElement) >= 0) self.triggerAccordion(trigger);
		});
	};

	Accordion.prototype.triggerAccordion = function(trigger) {
		var bool = (trigger.getAttribute('aria-expanded') === 'true');

		this.animateAccordion(trigger, bool, false);

		if(!bool && this.deepLinkOn) {
			history.replaceState(null, '', '#'+trigger.getAttribute('aria-controls'));
		}
	};

	Accordion.prototype.animateAccordion = function(trigger, bool, deepLink) {
		var self = this;
		var item = trigger.closest('.js-accordion__item'),
			content = item.getElementsByClassName('js-accordion__panel')[0],
			ariaValue = bool ? 'false' : 'true';

		if(!bool) item.classList.add(this.showClass);
		trigger.setAttribute('aria-expanded', ariaValue);
		self.resetContentVisibility(item, content, bool);

		if( !this.multiItems && !bool || deepLink) this.closeSiblings(item);
	};

	Accordion.prototype.resetContentVisibility = function(item, content, bool) {
		item.classList.toggle(this.showClass, !bool);
		content.removeAttribute("style");
		if(bool && !this.multiItems) { // accordion item has been closed -> check if there's one open to move inside viewport 
			this.moveContent();
		}
	};

	Accordion.prototype.closeSiblings = function(item) {
		//if only one accordion can be open -> search if there's another one open
		var index = Array.prototype.indexOf.call(this.items, item);
		for( var i = 0; i < this.items.length; i++) {
			if(this.items[i].classList.contains(this.showClass) && i != index) {
				this.animateAccordion(this.items[i].getElementsByClassName('js-accordion__trigger')[0], true, false);
				return false;
			}
		}
	};

	Accordion.prototype.moveContent = function() { // make sure title of the accordion just opened is inside the viewport
		var openAccordion = this.element.getElementsByClassName(this.showClass);
		if(openAccordion.length == 0) return;
		var boundingRect = openAccordion[0].getBoundingClientRect();
		if(boundingRect.top < 0 || boundingRect.top > window.innerHeight) {
			var windowScrollTop = window.scrollY || document.documentElement.scrollTop;
			window.scrollTo(0, boundingRect.top + windowScrollTop);
		}
	};

	Accordion.prototype.initDeepLink = function() {
		if(!this.deepLinkOn) return;
		var hash = window.location.hash.substr(1);
		if(!hash || hash == '') return;
		var trigger = this.element.querySelector('.js-accordion__trigger[aria-controls="'+hash+'"]');
		if(trigger && trigger.getAttribute('aria-expanded') !== 'true') {
			this.animateAccordion(trigger, false, true);
			setTimeout(function(){trigger.scrollIntoView(true);});
		}
	};

	function getChildrenByClassName(el, className) {
		var children = el.children,
    childrenByClass = [];
		for (var i = 0; i < children.length; i++) {
			if (children[i].classList.contains(className)) childrenByClass.push(children[i]);
		}
		return childrenByClass;
	};

	window.Accordion = Accordion;
	
	//initialize the Accordion objects
	var accordions = document.getElementsByClassName('js-accordion');
	if( accordions.length > 0 ) {
		for( var i = 0; i < accordions.length; i++) {
			(function(i){new Accordion(accordions[i]);})(i);
		}
	}
}());
// File#: _1_custom-select
// Usage: codyhouse.co/license
(function() {
  // NOTE: you need the js code when using the --custom-dropdown/--minimal variation of the Custom Select component. Default version does nor require JS.
  
  var CustomSelect = function(element) {
    this.element = element;
    this.select = this.element.getElementsByTagName('select')[0];
    this.optGroups = this.select.getElementsByTagName('optgroup');
    this.options = this.select.getElementsByTagName('option');
    this.selectedOption = getSelectedOptionText(this);
    this.selectId = this.select.getAttribute('id');
    this.trigger = false;
    this.dropdown = false;
    this.customOptions = false;
    this.arrowIcon = this.element.getElementsByTagName('svg');
    this.label = document.querySelector('[for="'+this.selectId+'"]');
    this.labelContent = '';
    if(this.label) this.labelContent = ', '+this.label.textContent;

    this.optionIndex = 0; // used while building the custom dropdown

    initCustomSelect(this); // init markup
    initCustomSelectEvents(this); // init event listeners
  };
  
  function initCustomSelect(select) {
    // create the HTML for the custom dropdown element
    select.element.insertAdjacentHTML('beforeend', initButtonSelect(select) + initListSelect(select));
    
    // save custom elements
    select.dropdown = select.element.getElementsByClassName('js-select__dropdown')[0];
    select.trigger = select.element.getElementsByClassName('js-select__button')[0];
    select.customOptions = select.dropdown.getElementsByClassName('js-select__item');
    
    // hide default select
    select.select.classList.add('is-hidden');
    if(select.arrowIcon.length > 0 ) select.arrowIcon[0].style.display = 'none';

    // store drowdown min width
    select.minWidth = parseInt(getComputedStyle(select.dropdown).getPropertyValue('min-width'));

    // place dropdown
    placeDropdown(select);
  };

  function initCustomSelectEvents(select) {
    // option selection in dropdown
    initSelection(select);

    // click events
    select.trigger.addEventListener('click', function(){
      toggleCustomSelect(select, false);
    });
    if(select.label) {
      // move focus to custom trigger when clicking on <select> label
      select.label.addEventListener('click', function(){
        moveFocus(select.trigger);
      });
    }
    // keyboard navigation
    select.dropdown.addEventListener('keydown', function(event){
      if(event.keyCode && event.keyCode == 38 || event.key && event.key.toLowerCase() == 'arrowup') {
        keyboardCustomSelect(select, 'prev', event);
      } else if(event.keyCode && event.keyCode == 40 || event.key && event.key.toLowerCase() == 'arrowdown') {
        keyboardCustomSelect(select, 'next', event);
      }
    });
    // native <select> element has been updated -> update custom select as well
    select.element.addEventListener('select-updated', function(event){
      resetCustomSelect(select);
    });
  };

  function toggleCustomSelect(select, bool) {
    var ariaExpanded;
    if(bool) {
      ariaExpanded = bool;
    } else {
      ariaExpanded = select.trigger.getAttribute('aria-expanded') == 'true' ? 'false' : 'true';
    }
    select.trigger.setAttribute('aria-expanded', ariaExpanded);
    if(ariaExpanded == 'true') {
      var selectedOption = getSelectedOption(select);
      moveFocus(selectedOption); // fallback if transition is not supported
      select.dropdown.addEventListener('transitionend', function cb(){
        moveFocus(selectedOption);
        select.dropdown.removeEventListener('transitionend', cb);
      });
      placeDropdown(select); // place dropdown based on available space
    }
  };

  function placeDropdown(select) {
    // remove placement classes to reset position
    select.dropdown.classList.remove('select__dropdown--right', 'select__dropdown--up');
    var triggerBoundingRect = select.trigger.getBoundingClientRect();
    select.dropdown.classList.toggle('select__dropdown--right', (document.documentElement.clientWidth - 5 < triggerBoundingRect.left + select.dropdown.offsetWidth));
    // check if there's enough space up or down
    var moveUp = (window.innerHeight - triggerBoundingRect.bottom - 5) < triggerBoundingRect.top;
    select.dropdown.classList.toggle('select__dropdown--up', moveUp);
    // set max-height based on available space
    var maxHeight = moveUp ? triggerBoundingRect.top - 20 : window.innerHeight - triggerBoundingRect.bottom - 20;
    if(select.minWidth < triggerBoundingRect.width) { // check if we need to set a min-width
      select.dropdown.setAttribute('style', 'max-height: '+maxHeight+'px; min-width: '+triggerBoundingRect.width+'px;');
    } else {
      select.dropdown.setAttribute('style', 'max-height: '+maxHeight+'px;');
    }
  };

  function keyboardCustomSelect(select, direction, event) { // navigate custom dropdown with keyboard
    event.preventDefault();
    var index = Array.prototype.indexOf.call(select.customOptions, document.activeElement);
    index = (direction == 'next') ? index + 1 : index - 1;
    if(index < 0) index = select.customOptions.length - 1;
    if(index >= select.customOptions.length) index = 0;
    moveFocus(select.customOptions[index]);
  };

  function initSelection(select) { // option selection
    select.dropdown.addEventListener('click', function(event){
      var option = event.target.closest('.js-select__item');
      if(!option) return;
      selectOption(select, option);
    });
  };
  
  function selectOption(select, option) {
    if(option.hasAttribute('aria-selected') && option.getAttribute('aria-selected') == 'true') {
      // selecting the same option
      select.trigger.setAttribute('aria-expanded', 'false'); // hide dropdown
    } else { 
      var selectedOption = select.dropdown.querySelector('[aria-selected="true"]');
      if(selectedOption) selectedOption.setAttribute('aria-selected', 'false');
      option.setAttribute('aria-selected', 'true');
      select.trigger.getElementsByClassName('js-select__label')[0].textContent = option.textContent;
      select.trigger.setAttribute('aria-expanded', 'false');
      // new option has been selected -> update native <select> element _ arai-label of trigger <button>
      updateNativeSelect(select, option.getAttribute('data-index'));
      updateTriggerAria(select); 
    }
    // move focus back to trigger
    select.trigger.focus();
  };

  function updateNativeSelect(select, index) {
    select.select.selectedIndex = index;
    select.select.dispatchEvent(new CustomEvent('change', {bubbles: true})); // trigger change event
    select.select.dispatchEvent(new CustomEvent('input', {bubbles: true})); // trigger change event
  };

  function updateTriggerAria(select) {
    select.trigger.setAttribute('aria-label', select.options[select.select.selectedIndex].innerHTML+select.labelContent);
  };

  function getSelectedOptionText(select) {// used to initialize the label of the custom select button
    var label = '';
    if('selectedIndex' in select.select) {
      label = select.options[select.select.selectedIndex].text;
    } else {
      label = select.select.querySelector('option[selected]').text;
    }
    return label;

  };
  
  function initButtonSelect(select) { // create the button element -> custom select trigger
    // check if we need to add custom classes to the button trigger
    var customClasses = select.element.getAttribute('data-trigger-class') ? ' '+select.element.getAttribute('data-trigger-class') : '';

    var label = select.options[select.select.selectedIndex].innerHTML+select.labelContent;
  
    var button = '<button type="button" class="js-select__button select__button'+customClasses+'" aria-label="'+label+'" aria-expanded="false" aria-controls="'+select.selectId+'-dropdown"><span aria-hidden="true" class="js-select__label select__label">'+select.selectedOption+'</span>';
    if(select.arrowIcon.length > 0 && select.arrowIcon[0].outerHTML) {
      var clone = select.arrowIcon[0].cloneNode(true);
      clone.classList.remove('select__icon');
      button = button +clone.outerHTML;
    }
    
    return button+'</button>';

  };

  function initListSelect(select) { // create custom select dropdown
    var list = '<div class="js-select__dropdown select__dropdown" aria-describedby="'+select.selectId+'-description" id="'+select.selectId+'-dropdown">';
    list = list + getSelectLabelSR(select);
    if(select.optGroups.length > 0) {
      for(var i = 0; i < select.optGroups.length; i++) {
        var optGroupList = select.optGroups[i].getElementsByTagName('option'),
          optGroupLabel = '<li><span class="select__item select__item--optgroup">'+select.optGroups[i].getAttribute('label')+'</span></li>';
        list = list + '<ul class="select__list" role="listbox">'+optGroupLabel+getOptionsList(select, optGroupList) + '</ul>';
      }
    } else {
      list = list + '<ul class="select__list" role="listbox">'+getOptionsList(select, select.options) + '</ul>';
    }
    return list;
  };

  function getSelectLabelSR(select) {
    if(select.label) {
      return '<p class="sr-only" id="'+select.selectId+'-description">'+select.label.textContent+'</p>'
    } else {
      return '';
    }
  };
  
  function resetCustomSelect(select) {
    // <select> element has been updated (using an external control) - update custom select
    var selectedOption = select.dropdown.querySelector('[aria-selected="true"]');
    if(selectedOption) selectedOption.setAttribute('aria-selected', 'false');
    var option = select.dropdown.querySelector('.js-select__item[data-index="'+select.select.selectedIndex+'"]');
    option.setAttribute('aria-selected', 'true');
    select.trigger.getElementsByClassName('js-select__label')[0].textContent = option.textContent;
    select.trigger.setAttribute('aria-expanded', 'false');
    updateTriggerAria(select); 
  };

  function getOptionsList(select, options) {
    var list = '';
    for(var i = 0; i < options.length; i++) {
      var selected = options[i].hasAttribute('selected') ? ' aria-selected="true"' : ' aria-selected="false"',
        disabled = options[i].hasAttribute('disabled') ? ' disabled' : '';
      list = list + '<li><button type="button" class="reset js-select__item select__item select__item--option" role="option" data-value="'+options[i].value+'" '+selected+disabled+' data-index="'+select.optionIndex+'">'+options[i].text+'</button></li>';
      select.optionIndex = select.optionIndex + 1;
    };
    return list;
  };

  function getSelectedOption(select) {
    var option = select.dropdown.querySelector('[aria-selected="true"]');
    if(option) return option;
    else return select.dropdown.getElementsByClassName('js-select__item')[0];
  };

  function moveFocusToSelectTrigger(select) {
    if(!document.activeElement.closest('.js-select')) return
    select.trigger.focus();
  };
  
  function checkCustomSelectClick(select, target) { // close select when clicking outside it
    if( !select.element.contains(target) ) toggleCustomSelect(select, 'false');
  };

  function moveFocus(element) {
    element.focus();
    if (document.activeElement !== element) {
      element.setAttribute('tabindex','-1');
      element.focus();
    }
  };
  
  //initialize the CustomSelect objects
  var customSelect = document.getElementsByClassName('js-select');
  if( customSelect.length > 0 ) {
    var selectArray = [];
    for( var i = 0; i < customSelect.length; i++) {
      (function(i){selectArray.push(new CustomSelect(customSelect[i]));})(i);
    }

    // listen for key events
    window.addEventListener('keyup', function(event){
      if( event.keyCode && event.keyCode == 27 || event.key && event.key.toLowerCase() == 'escape' ) {
        // close custom select on 'Esc'
        selectArray.forEach(function(element){
          moveFocusToSelectTrigger(element); // if focus is within dropdown, move it to dropdown trigger
          toggleCustomSelect(element, 'false'); // close dropdown
        });
      } 
    });
    // close custom select when clicking outside it
    window.addEventListener('click', function(event){
      selectArray.forEach(function(element){
        checkCustomSelectClick(element, event.target);
      });
    });
  }
}());
// File#: _1_drawer
// Usage: codyhouse.co/license
(function() {
	var Drawer = function(element) {
		this.element = element;
		this.content = document.getElementsByClassName('js-drawer__body')[0];
		this.triggers = document.querySelectorAll('[aria-controls="'+this.element.getAttribute('id')+'"]');
		this.firstFocusable = null;
		this.lastFocusable = null;
		this.selectedTrigger = null;
		this.isModal = this.element.classList.contains('js-drawer--modal');
		this.showClass = "drawer--is-visible";
		this.preventScrollEl = this.getPreventScrollEl();
		this.initDrawer();
	};

	Drawer.prototype.getPreventScrollEl = function() {
		var scrollEl = false;
		var querySelector = this.element.getAttribute('data-drawer-prevent-scroll');
		if(querySelector) scrollEl = document.querySelector(querySelector);
		return scrollEl;
	};

	Drawer.prototype.initDrawer = function() {
		var self = this;
		//open drawer when clicking on trigger buttons
		if ( this.triggers ) {
			for(var i = 0; i < this.triggers.length; i++) {
				this.triggers[i].addEventListener('click', function(event) {
					event.preventDefault();
					if(self.element.classList.contains(self.showClass)) {
						self.closeDrawer(event.target);
						return;
					}
					self.selectedTrigger = event.target;
					self.showDrawer();
					self.initDrawerEvents();
				});
			}
		}

		// if drawer is already open -> we should initialize the drawer events
		if(this.element.classList.contains(this.showClass)) this.initDrawerEvents();
	};

	Drawer.prototype.showDrawer = function() {
		var self = this;
		this.content.scrollTop = 0;
		this.element.classList.add(this.showClass);
		this.getFocusableElements();
		moveFocus(this.element);
		// wait for the end of transitions before moving focus
		this.element.addEventListener("transitionend", function cb(event) {
			moveFocus(self.element);
			self.element.removeEventListener("transitionend", cb);
		});
		this.emitDrawerEvents('drawerIsOpen', this.selectedTrigger);
		// change the overflow of the preventScrollEl
		if(this.preventScrollEl) this.preventScrollEl.style.overflow = 'hidden';
	};

	Drawer.prototype.closeDrawer = function(target) {
		this.element.classList.remove(this.showClass);
		this.firstFocusable = null;
		this.lastFocusable = null;
		if(this.selectedTrigger) this.selectedTrigger.focus();
		//remove listeners
		this.cancelDrawerEvents();
		this.emitDrawerEvents('drawerIsClose', target);
		// change the overflow of the preventScrollEl
		if(this.preventScrollEl) this.preventScrollEl.style.overflow = '';
	};

	Drawer.prototype.initDrawerEvents = function() {
		//add event listeners
		this.element.addEventListener('keydown', this);
		this.element.addEventListener('click', this);
	};

	Drawer.prototype.cancelDrawerEvents = function() {
		//remove event listeners
		this.element.removeEventListener('keydown', this);
		this.element.removeEventListener('click', this);
	};

	Drawer.prototype.handleEvent = function (event) {
		switch(event.type) {
			case 'click': {
				this.initClick(event);
			}
			case 'keydown': {
				this.initKeyDown(event);
			}
		}
	};

	Drawer.prototype.initKeyDown = function(event) {
		if( event.keyCode && event.keyCode == 27 || event.key && event.key == 'Escape' ) {
			//close drawer window on esc
			this.closeDrawer(false);
		} else if( this.isModal && (event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' )) {
			//trap focus inside drawer
			this.trapFocus(event);
		}
	};

	Drawer.prototype.initClick = function(event) {
		//close drawer when clicking on close button or drawer bg layer 
		if( !event.target.closest('.js-drawer__close') && !event.target.classList.contains('js-drawer') ) return;
		event.preventDefault();
		this.closeDrawer(event.target);
	};

	Drawer.prototype.trapFocus = function(event) {
		if( this.firstFocusable == document.activeElement && event.shiftKey) {
			//on Shift+Tab -> focus last focusable element when focus moves out of drawer
			event.preventDefault();
			this.lastFocusable.focus();
		}
		if( this.lastFocusable == document.activeElement && !event.shiftKey) {
			//on Tab -> focus first focusable element when focus moves out of drawer
			event.preventDefault();
			this.firstFocusable.focus();
		}
	}

	Drawer.prototype.getFocusableElements = function() {
		//get all focusable elements inside the drawer
		var allFocusable = this.element.querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary');
		this.getFirstVisible(allFocusable);
		this.getLastVisible(allFocusable);
	};

	Drawer.prototype.getFirstVisible = function(elements) {
		//get first visible focusable element inside the drawer
		for(var i = 0; i < elements.length; i++) {
			if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
				this.firstFocusable = elements[i];
				return true;
			}
		}
	};

	Drawer.prototype.getLastVisible = function(elements) {
		//get last visible focusable element inside the drawer
		for(var i = elements.length - 1; i >= 0; i--) {
			if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
				this.lastFocusable = elements[i];
				return true;
			}
		}
	};

	Drawer.prototype.emitDrawerEvents = function(eventName, target) {
		var event = new CustomEvent(eventName, {detail: target});
		this.element.dispatchEvent(event);
	};

	function moveFocus(element) {
    element.focus();
    if (document.activeElement !== element) {
      element.setAttribute('tabindex','-1');
      element.focus();
    }
  };

	window.Drawer = Drawer;

	//initialize the Drawer objects
	var drawer = document.getElementsByClassName('js-drawer');
	if( drawer.length > 0 ) {
		for( var i = 0; i < drawer.length; i++) {
			(function(i){new Drawer(drawer[i]);})(i);
		}
	}
}());
// File#: _1_filter-navigation
// Usage: codyhouse.co/license
(function() {
  var FilterNav = function(element) {
    this.element = element;
    this.wrapper = this.element.getElementsByClassName('js-filter-nav__wrapper')[0];
    this.nav = this.element.getElementsByClassName('js-filter-nav__nav')[0];
    this.list = this.nav.getElementsByClassName('js-filter-nav__list')[0];
    this.control = this.element.getElementsByClassName('js-filter-nav__control')[0];
    this.modalClose = this.element.getElementsByClassName('js-filter-nav__close-btn')[0];
    this.placeholder = this.element.getElementsByClassName('js-filter-nav__placeholder')[0];
    this.marker = this.element.getElementsByClassName('js-filter-nav__marker');
    this.layout = 'expanded';
    initFilterNav(this);
  };

  function initFilterNav(element) {
    checkLayout(element); // init layout
    if(element.layout == 'expanded') placeMarker(element);
    element.element.addEventListener('update-layout', function(event){ // on resize - modify layout
      checkLayout(element);
    });

    // update selected item
    element.wrapper.addEventListener('click', function(event){
      var newItem = event.target.closest('.js-filter-nav__btn');
      if(newItem) {
        updateCurrentItem(element, newItem);
        return;
      }
      // close modal list - mobile version only
      if(event.target.classList.contains('js-filter-nav__wrapper') || event.target.closest('.js-filter-nav__close-btn')) toggleModalList(element, false);
    });

    // open modal list - mobile version only
    element.control.addEventListener('click', function(event){
      toggleModalList(element, true);
    });
    
    // listen for key events
		window.addEventListener('keyup', function(event){
			// listen for esc key
			if( (event.keyCode && event.keyCode == 27) || (event.key && event.key.toLowerCase() == 'escape' )) {
				// close navigation on mobile if open
				if(element.control.getAttribute('aria-expanded') == 'true' && isVisible(element.control)) {
					toggleModalList(element, false);
				}
			}
			// listen for tab key
			if( (event.keyCode && event.keyCode == 9) || (event.key && event.key.toLowerCase() == 'tab' )) {
				// close navigation on mobile if open when nav loses focus
				if(element.control.getAttribute('aria-expanded') == 'true' && isVisible(element.control) && !document.activeElement.closest('.js-filter-nav__wrapper')) toggleModalList(element, false);
			}
		});
  };

  function updateCurrentItem(element, btn) {
    if(btn.getAttribute('aria-current') == 'true') {
      toggleModalList(element, false);
      return;
    }
    var activeBtn = element.wrapper.querySelector('[aria-current]');
    if(activeBtn) activeBtn.removeAttribute('aria-current');
    btn.setAttribute('aria-current', 'true');
    // update trigger label on selection (visible on mobile only)
    element.placeholder.textContent = btn.textContent;
    toggleModalList(element, false);
    if(element.layout == 'expanded') placeMarker(element);
  };

  function toggleModalList(element, bool) {
    element.control.setAttribute('aria-expanded', bool);
    element.wrapper.classList.toggle('filter-nav__wrapper--is-visible', bool);
    if(bool) {
      element.nav.querySelectorAll('[href], button:not([disabled])')[0].focus();
    } else if(isVisible(element.control)) {
      element.control.focus();
    }
  };

  function isVisible(element) {
		return (element.offsetWidth || element.offsetHeight || element.getClientRects().length);
	};

  function checkLayout(element) {
    if(element.layout == 'expanded' && switchToCollapsed(element)) { // check if there's enough space 
      element.layout = 'collapsed';
      element.element.classList.remove('filter-nav--expanded');
      element.element.classList.add('filter-nav--collapsed');
      element.modalClose.classList.remove('is-hidden');
      element.control.classList.remove('is-hidden');
    } else if(element.layout == 'collapsed' && switchToExpanded(element)) {
      element.layout = 'expanded';
      element.element.classList.add('filter-nav--expanded');
      element.element.classList.remove('filter-nav--collapsed');
      element.modalClose.classList.add('is-hidden');
      element.control.classList.add('is-hidden');
    }
    // place background element
    if(element.layout == 'expanded') placeMarker(element);
  };

  function switchToCollapsed(element) {
    return element.nav.scrollWidth > element.nav.offsetWidth;
  };

  function switchToExpanded(element) {
    element.element.style.visibility = 'hidden';
    element.element.classList.add('filter-nav--expanded');
    element.element.classList.remove('filter-nav--collapsed');
    var switchLayout = element.nav.scrollWidth <= element.nav.offsetWidth;
    element.element.classList.remove('filter-nav--expanded');
    element.element.classList.add('filter-nav--collapsed');
    element.element.style.visibility = 'visible';
    return switchLayout;
  };

  function placeMarker(element) {
    var activeElement = element.wrapper.querySelector('.js-filter-nav__btn[aria-current="true"]');
    if(element.marker.length == 0 || !activeElement ) return;
    element.marker[0].style.width = activeElement.offsetWidth+'px';
    element.marker[0].style.transform = 'translateX('+(activeElement.getBoundingClientRect().left - element.list.getBoundingClientRect().left)+'px)';
  };

  var filterNav = document.getElementsByClassName('js-filter-nav');
  if(filterNav.length > 0) {
    var filterNavArray = [];
    for(var i = 0; i < filterNav.length; i++) {
      filterNavArray.push(new FilterNav(filterNav[i]));
    }

    var resizingId = false,
      customEvent = new CustomEvent('update-layout');

    window.addEventListener('resize', function() {
      clearTimeout(resizingId);
      resizingId = setTimeout(doneResizing, 100);
    });

    // wait for font to be loaded
    if(document.fonts) {
      document.fonts.onloadingdone = function (fontFaceSetEvent) {
        doneResizing();
      };
    }

    function doneResizing() {
      for( var i = 0; i < filterNavArray.length; i++) {
        (function(i){filterNavArray[i].element.dispatchEvent(customEvent)})(i);
      };
    };
  }
}());
// File#: _1_filter
// Usage: codyhouse.co/license
(function() {
  var Filter = function(opts) {
    this.options = extendProps(Filter.defaults , opts); // used to store custom filter/sort functions
    this.element = this.options.element;
    this.elementId = this.element.getAttribute('id');
    this.items = this.element.querySelectorAll('.js-filter__item');
    this.controllers = document.querySelectorAll('[aria-controls="'+this.elementId+'"]'); // controllers wrappers
    this.fallbackMessage = document.querySelector('[data-fallback-gallery-id="'+this.elementId+'"]');
    this.filterString = []; // combination of different filter values
    this.sortingString = '';  // sort value - will include order and type of argument (e.g., number or string)
    // store info about sorted/filtered items
    this.filterList = []; // list of boolean for each this.item -> true if still visible , otherwise false
    this.sortingList = []; // list of new ordered this.item -> each element is [item, originalIndex]
    
    // store grid info for animation
    this.itemsGrid = []; // grid coordinates
    this.itemsInitPosition = []; // used to store coordinates of this.items before animation
    this.itemsIterPosition = []; // used to store coordinates of this.items before animation - intermediate state
    this.itemsFinalPosition = []; // used to store coordinates of this.items after filtering
    
    // animation off
    this.animateOff = this.element.getAttribute('data-filter-animation') == 'off';
    // used to update this.itemsGrid on resize
    this.resizingId = false;
    // default acceleration style - improve animation
    this.accelerateStyle = 'will-change: transform, opacity; transform: translateZ(0); backface-visibility: hidden;';

    // handle multiple changes
    this.animating = false;
    this.reanimate = false;

    initFilter(this);
  };

  function initFilter(filter) {
    resetFilterSortArray(filter, true, true); // init array filter.filterList/filter.sortingList
    createGridInfo(filter); // store grid coordinates in filter.itemsGrid
    initItemsOrder(filter); // add data-orders so that we can reset the sorting

    // events handling - filter update
    for(var i = 0; i < filter.controllers.length; i++) {
      filter.filterString[i] = ''; // reset filtering

      // get proper filter/sorting string based on selected controllers
      (function(i){
        filter.controllers[i].addEventListener('change', function(event) {  
          if(event.target.tagName.toLowerCase() == 'select') { // select elements
            (!event.target.getAttribute('data-filter'))
              ? setSortingString(filter, event.target.value, event.target.options[event.target.selectedIndex])
              : setFilterString(filter, i, 'select');
          } else if(event.target.tagName.toLowerCase() == 'input' && (event.target.getAttribute('type') == 'radio' || event.target.getAttribute('type') == 'checkbox') ) { // input (radio/checkboxed) elements
            (!event.target.getAttribute('data-filter'))
              ? setSortingString(filter, event.target.getAttribute('data-sort'), event.target)
              : setFilterString(filter, i, 'input');
          } else {
            // generic inout element
            (!filter.controllers[i].getAttribute('data-filter'))
              ? setSortingString(filter, filter.controllers[i].getAttribute('data-sort'), filter.controllers[i])
              : setFilterString(filter, i, 'custom');
          }

          updateFilterArray(filter);
        });

        filter.controllers[i].addEventListener('click', function(event) { // retunr if target is select/input elements
          var filterEl = event.target.closest('[data-filter]');
          var sortEl = event.target.closest('[data-sort]');
          if(!filterEl && !sortEl) return;
          if(filterEl && ( filterEl.tagName.toLowerCase() == 'input' || filterEl.tagName.toLowerCase() == 'select')) return;
          if(sortEl && (sortEl.tagName.toLowerCase() == 'input' || sortEl.tagName.toLowerCase() == 'select')) return;
          if(sortEl && sortEl.classList.contains('js-filter__custom-control')) return;
          if(filterEl && filterEl.classList.contains('js-filter__custom-control')) return;
          // this will be executed only for a list of buttons -> no inputs
          event.preventDefault();
          resetControllersList(filter, i, filterEl, sortEl);
          sortEl 
            ? setSortingString(filter, sortEl.getAttribute('data-sort'), sortEl)
            : setFilterString(filter, i, 'button');
          updateFilterArray(filter);
        });

        // target search inputs -> update them on 'input'
        filter.controllers[i].addEventListener('input', function(event) {
          if(event.target.tagName.toLowerCase() == 'input' && (event.target.getAttribute('type') == 'search' || event.target.getAttribute('type') == 'text') ) {
            setFilterString(filter, i, 'custom');
            updateFilterArray(filter);
          }
        });
      })(i);
    }

    // handle resize - update grid coordinates in filter.itemsGrid
    window.addEventListener('resize', function() {
      clearTimeout(filter.resizingId);
      filter.resizingId = setTimeout(function(){createGridInfo(filter)}, 300);
    });

    // check if there are filters/sorting values already set
    checkInitialFiltering(filter);

    // reset filtering results if filter selection was changed by an external control (e.g., form reset) 
    filter.element.addEventListener('update-filter-results', function(event){
      // reset filters first
      for(var i = 0; i < filter.controllers.length; i++) filter.filterString[i] = '';
      filter.sortingString = '';
      checkInitialFiltering(filter);
    });
  };

  function checkInitialFiltering(filter) {
    for(var i = 0; i < filter.controllers.length; i++) { // check if there's a selected option
      // buttons list
      var selectedButton = filter.controllers[i].getElementsByClassName('js-filter-selected');
      if(selectedButton.length > 0) {
        var sort = selectedButton[0].getAttribute('data-sort');
        sort
          ? setSortingString(filter, selectedButton[0].getAttribute('data-sort'), selectedButton[0])
          : setFilterString(filter, i, 'button');
        continue;
      }

      // input list
      var selectedInput = filter.controllers[i].querySelectorAll('input:checked');
      if(selectedInput.length > 0) {
        var sort = selectedInput[0].getAttribute('data-sort');
        sort
          ? setSortingString(filter, sort, selectedInput[0])
          : setFilterString(filter, i, 'input');
        continue;
      }
      // select item
      if(filter.controllers[i].tagName.toLowerCase() == 'select') {
        var sort = filter.controllers[i].getAttribute('data-sort');
        sort
          ? setSortingString(filter, filter.controllers[i].value, filter.controllers[i].options[filter.controllers[i].selectedIndex])
          : setFilterString(filter, i, 'select');
         continue;
      }
      // check if there's a generic custom input
      var radioInput = filter.controllers[i].querySelector('input[type="radio"]'),
        checkboxInput = filter.controllers[i].querySelector('input[type="checkbox"]');
      if(!radioInput && !checkboxInput) {
        var sort = filter.controllers[i].getAttribute('data-sort');
        var filterString = filter.controllers[i].getAttribute('data-filter');
        if(sort) setSortingString(filter, sort, filter.controllers[i]);
        else if(filterString) setFilterString(filter, i, 'custom');
      }
    }

    updateFilterArray(filter);
  };

  function setSortingString(filter, value, item) { 
    // get sorting string value-> sortName:order:type
    var order = item.getAttribute('data-sort-order') ? 'desc' : 'asc';
    var type = item.getAttribute('data-sort-number') ? 'number' : 'string';
    filter.sortingString = value+':'+order+':'+type;
  };

  function setFilterString(filter, index, type) { 
    // get filtering array -> [filter1:filter2, filter3, filter4:filter5]
    if(type == 'input') {
      var checkedInputs = filter.controllers[index].querySelectorAll('input:checked');
      filter.filterString[index] = '';
      for(var i = 0; i < checkedInputs.length; i++) {
        filter.filterString[index] = filter.filterString[index] + checkedInputs[i].getAttribute('data-filter') + ':';
      }
    } else if(type == 'select') {
      if(filter.controllers[index].multiple) { // select with multiple options
        filter.filterString[index] = getMultipleSelectValues(filter.controllers[index]);
      } else { // select with single option
        filter.filterString[index] = filter.controllers[index].value;
      }
    } else if(type == 'button') {
      var selectedButtons = filter.controllers[index].querySelectorAll('.js-filter-selected');
      filter.filterString[index] = '';
      for(var i = 0; i < selectedButtons.length; i++) {
        filter.filterString[index] = filter.filterString[index] + selectedButtons[i].getAttribute('data-filter') + ':';
      }
    } else if(type == 'custom') {
      filter.filterString[index] = filter.controllers[index].getAttribute('data-filter');
    }
  };

  function resetControllersList(filter, index, target1, target2) {
    // for a <button>s list -> toggle js-filter-selected + custom classes
    var multi = filter.controllers[index].getAttribute('data-filter-checkbox'),
      customClass = filter.controllers[index].getAttribute('data-selected-class');
    
    customClass = (customClass) ? 'js-filter-selected '+ customClass : 'js-filter-selected';
    if(multi == 'true') { // multiple options can be on
      (target1) 
        ? toggleClass(target1, customClass, !target1.classList.contains('js-filter-selected'))
        : toggleClass(target2, customClass, !target2.classList.contains('js-filter-selected'));
    } else { // only one element at the time
      // remove the class from all siblings
      var selectedOption = filter.controllers[index].querySelector('.js-filter-selected');
      if(selectedOption) removeClass(selectedOption, customClass);
      (target1) 
        ? addClass(target1, customClass)
        : addClass(target2, customClass);
    }
  };

  function updateFilterArray(filter) { // sort/filter strings have been updated -> so you can update the gallery
    if(filter.animating) {
      filter.reanimate = true;
      return;
    }
    filter.animating = true;
    filter.reanimate = false;
    createGridInfo(filter); // get new grid coordinates
    sortingGallery(filter); // update sorting list 
    filteringGallery(filter); // update filter list
    resetFallbackMessage(filter, true); // toggle fallback message
    if(reducedMotion || filter.animateOff) {
      resetItems(filter);
    } else {
      updateItemsAttributes(filter);
    }
  };

  function sortingGallery(filter) {
    // use sorting string to reorder gallery
    var sortOptions = filter.sortingString.split(':');
    if(sortOptions[0] == '' || sortOptions[0] == '*') {
      // no sorting needed
      restoreSortOrder(filter);
    } else { // need to sort
      if(filter.options[sortOptions[0]]) { // custom sort function -> user takes care of it
        filter.sortingList = filter.options[sortOptions[0]](filter.sortingList);
      } else {
        filter.sortingList.sort(function(left, right) {
          var leftVal = left[0].getAttribute('data-sort-'+sortOptions[0]),
          rightVal = right[0].getAttribute('data-sort-'+sortOptions[0]);
          if(sortOptions[2] == 'number') {
            leftVal = parseFloat(leftVal);
            rightVal = parseFloat(rightVal);
          }
          if(sortOptions[1] == 'desc') return leftVal <= rightVal ? 1 : -1;
          else return leftVal >= rightVal ? 1 : -1;
        });
      }
    }
  };

  function filteringGallery(filter) {
    // use filtering string to reorder gallery
    resetFilterSortArray(filter, true, false);
    // we can have multiple filters
    for(var i = 0; i < filter.filterString.length; i++) {
      //check if multiple filters inside the same controller
      if(filter.filterString[i] != '' && filter.filterString[i] != '*' && filter.filterString[i] != ' ') {
        singleFilterGallery(filter, filter.filterString[i].split(':'));
      }
    }
  };

  function singleFilterGallery(filter, subfilter) {
    if(!subfilter || subfilter == '' || subfilter == '*') return;
    // check if we have custom options
    var customFilterArray = [];
    for(var j = 0; j < subfilter.length; j++) {
      if(filter.options[subfilter[j]]) { // custom function
        customFilterArray[subfilter[j]] = filter.options[subfilter[j]](filter.items);
      }
    }

    for(var i = 0; i < filter.items.length; i++) {
      var filterValues = filter.items[i].getAttribute('data-filter').split(' ');
      var present = false;
      for(var j = 0; j < subfilter.length; j++) {
        if(filter.options[subfilter[j]] && customFilterArray[subfilter[j]][i]) { // custom function
          present = true;
          break;
        } else if(subfilter[j] == '*' || filterValues.indexOf(subfilter[j]) > -1) {
          present = true;
          break;
        }
      }
      filter.filterList[i] = !present ? false : filter.filterList[i];
    }
  };

  function updateItemsAttributes(filter) { // set items before triggering the update animation
    // get offset of all elements before animation
    storeOffset(filter, filter.itemsInitPosition);
    // set height of container
    filter.element.setAttribute('style', 'height: '+parseFloat(filter.element.offsetHeight)+'px; width: '+parseFloat(filter.element.offsetWidth)+'px;');

    for(var i = 0; i < filter.items.length; i++) { // remove is-hidden class from items now visible and scale to zero
      if( filter.items[i].classList.contains('is-hidden') && filter.filterList[i]) {
        filter.items[i].setAttribute('data-scale', 'on');
        filter.items[i].setAttribute('style', filter.accelerateStyle+'transform: scale(0.5); opacity: 0;')
        removeClass(filter.items[i], 'is-hidden');
      }
    }
    // get new elements offset
    storeOffset(filter, filter.itemsIterPosition);
    // translate items so that they are in the right initial position
    for(var i = 0; i < filter.items.length; i++) {
      if( filter.items[i].getAttribute('data-scale') != 'on') {
        filter.items[i].setAttribute('style', filter.accelerateStyle+'transform: translateX('+parseInt(filter.itemsInitPosition[i][0] - filter.itemsIterPosition[i][0])+'px) translateY('+parseInt(filter.itemsInitPosition[i][1] - filter.itemsIterPosition[i][1])+'px);');
      }
    }

    animateItems(filter)
  };

  function animateItems(filter) {
    var transitionValue = 'transform '+filter.options.duration+'ms cubic-bezier(0.455, 0.03, 0.515, 0.955), opacity '+filter.options.duration+'ms';

    // get new index of items in the list
    var j = 0;
    for(var i = 0; i < filter.sortingList.length; i++) {
      var item = filter.items[filter.sortingList[i][1]];
      if(item.classList.contains('is-hidden') || !filter.filterList[filter.sortingList[i][1]]) {
        // item is hidden or was previously hidden -> final position equal to first one
        filter.itemsFinalPosition[filter.sortingList[i][1]] = filter.itemsIterPosition[filter.sortingList[i][1]];
        if(item.getAttribute('data-scale') == 'on') j = j + 1; 
      } else {
        filter.itemsFinalPosition[filter.sortingList[i][1]] = [filter.itemsGrid[j][0], filter.itemsGrid[j][1]]; // left/top
        j = j + 1; 
      }
    } 

    setTimeout(function(){
      for(var i = 0; i < filter.items.length; i++) {
        if(filter.filterList[i] && filter.items[i].getAttribute('data-scale') == 'on') { // scale up item
          filter.items[i].setAttribute('style', filter.accelerateStyle+'transition: '+transitionValue+'; transform: translateX('+parseInt(filter.itemsFinalPosition[i][0] - filter.itemsIterPosition[i][0])+'px) translateY('+parseInt(filter.itemsFinalPosition[i][1] - filter.itemsIterPosition[i][1])+'px) scale(1); opacity: 1;');
        } else if(filter.filterList[i]) { // translate item
          filter.items[i].setAttribute('style', filter.accelerateStyle+'transition: '+transitionValue+'; transform: translateX('+parseInt(filter.itemsFinalPosition[i][0] - filter.itemsIterPosition[i][0])+'px) translateY('+parseInt(filter.itemsFinalPosition[i][1] - filter.itemsIterPosition[i][1])+'px);');
        } else { // scale down item
          filter.items[i].setAttribute('style', filter.accelerateStyle+'transition: '+transitionValue+'; transform: scale(0.5); opacity: 0;');
        }
      };
    }, 50);  
    
    // wait for the end of transition of visible elements
    setTimeout(function(){
      resetItems(filter);
    }, (filter.options.duration + 100));
  };

  function resetItems(filter) {
    // animation was off or animation is over -> reset attributes
    for(var i = 0; i < filter.items.length; i++) {
      filter.items[i].removeAttribute('style');
      toggleClass(filter.items[i], 'is-hidden', !filter.filterList[i]);
      filter.items[i].removeAttribute('data-scale');
    }
    
    for(var i = 0; i < filter.items.length; i++) {// reorder
      filter.element.appendChild(filter.items[filter.sortingList[i][1]]);
    }

    filter.items = [];
    filter.items = filter.element.querySelectorAll('.js-filter__item');
    resetFilterSortArray(filter, false, true);
    filter.element.removeAttribute('style');
    filter.animating = false;
    if(filter.reanimate) {
      updateFilterArray(filter);
    }

    resetFallbackMessage(filter, false); // toggle fallback message

    // emit custom event - end of filtering
    filter.element.dispatchEvent(new CustomEvent('filter-selection-updated'));
  };

  function resetFilterSortArray(filter, filtering, sorting) {
    for(var i = 0; i < filter.items.length; i++) {
      if(filtering) filter.filterList[i] = true;
      if(sorting) filter.sortingList[i] = [filter.items[i], i];
    }
  };

  function createGridInfo(filter) {
    var containerWidth = parseFloat(window.getComputedStyle(filter.element).getPropertyValue('width')),
      itemStyle, itemWidth, itemHeight, marginX, marginY, colNumber;

    // get offset first visible element
    for(var i = 0; i < filter.items.length; i++) {
      if( !filter.items[i].classList.contains('is-hidden') ) {
        itemStyle = window.getComputedStyle(filter.items[i]),
        itemWidth = parseFloat(itemStyle.getPropertyValue('width')),
        itemHeight = parseFloat(itemStyle.getPropertyValue('height')),
        marginX = parseFloat(itemStyle.getPropertyValue('margin-left')) + parseFloat(itemStyle.getPropertyValue('margin-right')),
        marginY = parseFloat(itemStyle.getPropertyValue('margin-bottom')) + parseFloat(itemStyle.getPropertyValue('margin-top'));
        if(marginX == 0 && marginY == 0) {
          // grid is set using the gap property and not margins
          var margins = resetMarginValues(filter);
          marginX = margins[0];
          marginY = margins[1];
        }
        var colNumber = parseInt((containerWidth + marginX)/(itemWidth+marginX));
        filter.itemsGrid[0] = [filter.items[i].offsetLeft, filter.items[i].offsetTop]; // left, top
        break;
      }
    }

    for(var i = 1; i < filter.items.length; i++) {
      var x = i < colNumber ? i : i % colNumber,
        y = i < colNumber ? 0 : Math.floor(i/colNumber);
      filter.itemsGrid[i] = [filter.itemsGrid[0][0] + x*(itemWidth+marginX), filter.itemsGrid[0][1] + y*(itemHeight+marginY)];
    }
  };

  function storeOffset(filter, array) {
    for(var i = 0; i < filter.items.length; i++) {
      array[i] = [filter.items[i].offsetLeft, filter.items[i].offsetTop];
    }
  };

  function initItemsOrder(filter) {
    for(var i = 0; i < filter.items.length; i++) {
      filter.items[i].setAttribute('data-init-sort-order', i);
    }
  };

  function restoreSortOrder(filter) {
    for(var i = 0; i < filter.items.length; i++) {
      filter.sortingList[parseInt(filter.items[i].getAttribute('data-init-sort-order'))] = [filter.items[i], i];
    }
  };

  function resetFallbackMessage(filter, bool) {
    if(!filter.fallbackMessage) return;
    var show = true;
    for(var i = 0; i < filter.filterList.length; i++) {
      if(filter.filterList[i]) {
        show = false;
        break;
      }
    };
    if(bool) { // reset visibility before animation is triggered
      if(!show) addClass(filter.fallbackMessage, 'is-hidden');
      return;
    }
    toggleClass(filter.fallbackMessage, 'is-hidden', !show);
  };

  function getMultipleSelectValues(multipleSelect) {
    // get selected options of a <select multiple> element
    var options = multipleSelect.options,
      value = '';
    for(var i = 0; i < options.length; i++) {
      if(options[i].selected) {
        if(value != '') value = value + ':';
        value = value + options[i].value;
      }
    }
    return value;
  };

  function resetMarginValues(filter) {
    var gapX = getComputedStyle(filter.element).getPropertyValue('--gap-x'),
      gapY = getComputedStyle(filter.element).getPropertyValue('--gap-y'),
      gap = getComputedStyle(filter.element).getPropertyValue('--gap'),
      gridGap = [0, 0];

    // if the gap property is used to create the grid (not margin left/right) -> get gap values rather than margins
    // check if the --gap/--gap-x/--gap-y
    var newDiv = document.createElement('div'),
      cssText = 'position: absolute; opacity: 0; width: 0px; height: 0px';
    if(gapX && gapY) {
      cssText = 'position: absolute; opacity: 0; width: '+gapX+'; height: '+gapY;
    } else if(gap) {
      cssText = 'position: absolute; opacity: 0; width: '+gap+'; height: '+gap;
    } else if(gapX) {
      cssText = 'position: absolute; opacity: 0; width: '+gapX+'; height: 0px';
    } else if(gapY) {
      cssText = 'position: absolute; opacity: 0; width: 0px; height: '+gapY;
    } else { // --gap/--gap-x/--gap-y properties are not defined -> get grid gap property values
      gapX = getGridGap(filter, 'columns', filter.element.offsetWidth);
      gapY = getGridGap(filter, 'rows', filter.element.offsetHeight);
      if(isNaN(gapY)) gapY = gapX;
      cssText = 'position: absolute; opacity: 0; width: '+gapX+'; height: '+gapY;
    }
    newDiv.style.cssText = cssText;
    filter.element.appendChild(newDiv);
    var boundingRect = newDiv.getBoundingClientRect();
    gridGap = [boundingRect.width, boundingRect.height];
    filter.element.removeChild(newDiv);
    return gridGap;
  };

  function getGridGap(filter, direction, containerSize) {
    var computedStyle = getComputedStyle(filter.element),
      template = computedStyle.getPropertyValue('grid-template-'+direction);
    
    var arrayEl = template.split(' '),
      gap = (containerSize - parseFloat(arrayEl[0])*arrayEl.length)/(arrayEl.length - 1);
    return gap+'px';
  };

  function toggleClass(el, className, bool) {
    if(bool) addClass(el, className);
    else removeClass(el, className);
  };

  function addClass(el, className) {
    var classList = className.split(' ');
    el.classList.add(classList[0]);
    if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
  };

  function removeClass(el, className) {
    var classList = className.split(' ');
    el.classList.remove(classList[0]);
    if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
  };

  var extendProps = function () {
    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;
    // Check if a deep merge
    if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
      deep = arguments[0];
      i++;
    }
    // Merge the object into the extended object
    var merge = function (obj) {
      for ( var prop in obj ) {
        if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
        // If deep merge and property is an object, merge properties
          if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
            extended[prop] = extend( true, extended[prop], obj[prop] );
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };
    // Loop through each object and conduct a merge
    for ( ; i < length; i++ ) {
      var obj = arguments[i];
      merge(obj);
    }
    return extended;
  };

  Filter.defaults = {
    element : false,
    duration: 400
  };

  window.Filter = Filter;

  // init Filter object
  var filterGallery = document.getElementsByClassName('js-filter'),
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if( filterGallery.length > 0 ) {
    for( var i = 0; i < filterGallery.length; i++) {
      var duration = filterGallery[i].getAttribute('data-filter-duration');
      if(!duration) duration = Filter.defaults.duration;
      new Filter({element: filterGallery[i], duration: duration});
    }
  }
}());
// File#: _1_main-header
// Usage: codyhouse.co/license
(function() {
	var mainHeader = document.getElementsByClassName('js-header');
	if( mainHeader.length > 0 ) {
		var trigger = mainHeader[0].getElementsByClassName('js-header__trigger')[0],
			nav = mainHeader[0].getElementsByClassName('js-header__nav')[0];

		// we'll use these to store the node that needs to receive focus when the mobile menu is closed 
		var focusMenu = false;

		//detect click on nav trigger
		trigger.addEventListener("click", function(event) {
			event.preventDefault();
			toggleNavigation(!nav.classList.contains('header__nav--is-visible'));
		});

		// listen for key events
		window.addEventListener('keyup', function(event){
			// listen for esc key
			if( (event.keyCode && event.keyCode == 27) || (event.key && event.key.toLowerCase() == 'escape' )) {
				// close navigation on mobile if open
				if(trigger.getAttribute('aria-expanded') == 'true' && isVisible(trigger)) {
					focusMenu = trigger; // move focus to menu trigger when menu is close
					trigger.click();
				}
			}
			// listen for tab key
			if( (event.keyCode && event.keyCode == 9) || (event.key && event.key.toLowerCase() == 'tab' )) {
				// close navigation on mobile if open when nav loses focus
				if(trigger.getAttribute('aria-expanded') == 'true' && isVisible(trigger) && !document.activeElement.closest('.js-header')) trigger.click();
			}
		});

		// listen for resize
		var resizingId = false;
		window.addEventListener('resize', function() {
			clearTimeout(resizingId);
			resizingId = setTimeout(doneResizing, 500);
		});

		function doneResizing() {
			if( !isVisible(trigger) && mainHeader[0].classList.contains('header--expanded')) toggleNavigation(false); 
		};
	}

	function isVisible(element) {
		return (element.offsetWidth || element.offsetHeight || element.getClientRects().length);
	};

	function toggleNavigation(bool) { // toggle navigation visibility on small device
		nav.classList.toggle('header__nav--is-visible', bool);
		mainHeader[0].classList.toggle('header--expanded', bool);
		trigger.setAttribute('aria-expanded', bool);
		if(bool) { //opening menu -> move focus to first element inside nav
			nav.querySelectorAll('[href], input:not([disabled]), button:not([disabled])')[0].focus();
		} else if(focusMenu) {
			focusMenu.focus();
			focusMenu = false;
		}
	};
}());
// File#: _1_number-input
// Usage: codyhouse.co/license
(function() {
	var InputNumber = function(element) {
		this.element = element;
		this.input = this.element.getElementsByClassName('js-number-input__value')[0];
		this.min = parseFloat(this.input.getAttribute('min'));
		this.max = parseFloat(this.input.getAttribute('max'));
		this.step = parseFloat(this.input.getAttribute('step'));
		if(isNaN(this.step)) this.step = 1;
		this.precision = getStepPrecision(this.step);
		initInputNumberEvents(this);
	};

	function initInputNumberEvents(input) {
		// listen to the click event on the custom increment buttons
		input.element.addEventListener('click', function(event){ 
			var increment = event.target.closest('.js-number-input__btn');
			if(increment) {
				event.preventDefault();
				updateInputNumber(input, increment);
			}
		});

		// when input changes, make sure the new value is acceptable
		input.input.addEventListener('focusout', function(event){
			var value = parseFloat(input.input.value);
			if( value < input.min ) value = input.min;
			if( value > input.max ) value = input.max;
			// check value is multiple of step
			value = checkIsMultipleStep(input, value);
			if( value != parseFloat(input.input.value)) input.input.value = value;

		});
	};

	function getStepPrecision(step) {
		// if step is a floating number, return its precision
		return (step.toString().length - Math.floor(step).toString().length - 1);
	};

	function updateInputNumber(input, btn) {
		var value = ( btn.classList.contains('number-input__btn--plus') ) ? parseFloat(input.input.value) + input.step : parseFloat(input.input.value) - input.step;
		if( input.precision > 0 ) value = value.toFixed(input.precision);
		if( value < input.min ) value = input.min;
		if( value > input.max ) value = input.max;
		input.input.value = value;
		input.input.dispatchEvent(new CustomEvent('change', {bubbles: true})); // trigger change event
	};

	function checkIsMultipleStep(input, value) {
		// check if the number inserted is a multiple of the step value
		var remain = (value*10*input.precision)%(input.step*10*input.precision);
		if( remain != 0) value = value - remain;
		if( input.precision > 0 ) value = value.toFixed(input.precision);
		return value;
	};

	window.InputNumber = InputNumber;

	//initialize the InputNumber objects
	var inputNumbers = document.getElementsByClassName('js-number-input');
	if( inputNumbers.length > 0 ) {
		for( var i = 0; i < inputNumbers.length; i++) {
			(function(i){new InputNumber(inputNumbers[i]);})(i);
		}
	}
}());
// File#: _1_read-more
// Usage: codyhouse.co/license
(function() {
  var ReadMore = function(element) {
    this.element = element;
    this.moreContent = this.element.getElementsByClassName('js-read-more__content');
    this.count = this.element.getAttribute('data-characters') || 200;
    this.counting = 0;
    this.btnClasses = this.element.getAttribute('data-btn-class');
    this.ellipsis = this.element.getAttribute('data-ellipsis') && this.element.getAttribute('data-ellipsis') == 'off' ? false : true;
    this.btnShowLabel = 'Read more';
    this.btnHideLabel = 'Read less';
    this.toggleOff = this.element.getAttribute('data-toggle') && this.element.getAttribute('data-toggle') == 'off' ? false : true;
    if( this.moreContent.length == 0 ) splitReadMore(this);
    setBtnLabels(this);
    initReadMore(this);
  };

  function splitReadMore(readMore) { 
    splitChildren(readMore.element, readMore); // iterate through children and hide content
  };

  function splitChildren(parent, readMore) {
    if(readMore.counting >= readMore.count) {
      parent.classList.add('js-read-more__content');
      return parent.outerHTML;
    }
    var children = parent.childNodes;
    var content = '';
    for(var i = 0; i < children.length; i++) {
      if (children[i].nodeType == Node.TEXT_NODE) {
        content = content + wrapText(children[i], readMore);
      } else {
        content = content + splitChildren(children[i], readMore);
      }
    }
    parent.innerHTML = content;
    return parent.outerHTML;
  };

  function wrapText(element, readMore) {
    var content = element.textContent;
    if(content.replace(/\s/g,'').length == 0) return '';// check if content is empty
    if(readMore.counting >= readMore.count) {
      return '<span class="js-read-more__content">' + content + '</span>';
    }
    if(readMore.counting + content.length < readMore.count) {
      readMore.counting = readMore.counting + content.length;
      return content;
    }
    var firstContent = content.substr(0, readMore.count - readMore.counting);
    firstContent = firstContent.substr(0, Math.min(firstContent.length, firstContent.lastIndexOf(" ")));
    var secondContent = content.substr(firstContent.length, content.length);
    readMore.counting = readMore.count;
    return firstContent + '<span class="js-read-more__content">' + secondContent + '</span>';
  };

  function setBtnLabels(readMore) { // set custom labels for read More/Less btns
    var btnLabels = readMore.element.getAttribute('data-btn-labels');
    if(btnLabels) {
      var labelsArray = btnLabels.split(',');
      readMore.btnShowLabel = labelsArray[0].trim();
      readMore.btnHideLabel = labelsArray[1].trim();
    }
  };

  function initReadMore(readMore) { // add read more/read less buttons to the markup
    readMore.moreContent = readMore.element.getElementsByClassName('js-read-more__content');
    if( readMore.moreContent.length == 0 ) {
      readMore.element.classList.add('read-more--loaded');
      return;
    }
    var btnShow = ' <button class="js-read-more__btn '+readMore.btnClasses+'">'+readMore.btnShowLabel+'</button>';
    var btnHide = ' <button class="js-read-more__btn is-hidden '+readMore.btnClasses+'">'+readMore.btnHideLabel+'</button>';
    if(readMore.ellipsis) {
      btnShow = '<span class="js-read-more__ellipsis" aria-hidden="true">...</span>'+ btnShow;
    }

    readMore.moreContent[readMore.moreContent.length - 1].insertAdjacentHTML('afterend', btnHide);
    readMore.moreContent[0].insertAdjacentHTML('afterend', btnShow);
    resetAppearance(readMore);
    initEvents(readMore);
  };

  function resetAppearance(readMore) { // hide part of the content
    for(var i = 0; i < readMore.moreContent.length; i++) readMore.moreContent[i].classList.add('is-hidden');
    readMore.element.classList.add('read-more--loaded'); // show entire component
  };

  function initEvents(readMore) { // listen to the click on the read more/less btn
    readMore.btnToggle = readMore.element.getElementsByClassName('js-read-more__btn');
    readMore.ellipsis = readMore.element.getElementsByClassName('js-read-more__ellipsis');

    readMore.btnToggle[0].addEventListener('click', function(event){
      event.preventDefault();
      updateVisibility(readMore, true);
    });
    readMore.btnToggle[1].addEventListener('click', function(event){
      event.preventDefault();
      updateVisibility(readMore, false);
    });
  };

  function updateVisibility(readMore, visibile) {
    for(var i = 0; i < readMore.moreContent.length; i++) readMore.moreContent[i].classList.toggle('is-hidden', !visibile);
    // reset btns appearance
    readMore.btnToggle[0].classList.toggle('is-hidden', visibile);
    readMore.btnToggle[1].classList.toggle('is-hidden', !visibile);
    if(readMore.ellipsis.length > 0 ) readMore.ellipsis[0].classList.toggle('is-hidden', visibile);
    
    if(!readMore.toggleOff) readMore.btn.classList.add('is-hidden');
    // move focus
    if(visibile) {
      var targetTabIndex = readMore.moreContent[0].getAttribute('tabindex');
      elMoveFocus(readMore.moreContent[0]);
      resetFocusTarget(readMore.moreContent[0], targetTabIndex);
    } else {
      elMoveFocus(readMore.btnToggle[0]);
    }
  };

  function resetFocusTarget(target, tabindex) {
    if( parseInt(target.getAttribute('tabindex')) < 0) {
			target.style.outline = 'none';
			!tabindex && target.removeAttribute('tabindex');
		}
  };

  function elMoveFocus(element) {
    element.focus();
    if (document.activeElement !== element) {
      element.setAttribute('tabindex','-1');
      element.focus();
    }
  };

  //initialize the ReadMore objects
	var readMore = document.getElementsByClassName('js-read-more');
	if( readMore.length > 0 ) {
		for( var i = 0; i < readMore.length; i++) {
			(function(i){new ReadMore(readMore[i]);})(i);
		}
	};
}());
if(!Util) function Util () {};

Util.hasClass = function(el, className) {
  return el.classList.contains(className);
};

Util.addClass = function(el, className) {
  var classList = className.split(' ');
  el.classList.add(classList[0]);
  if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
  var classList = className.split(' ');
  el.classList.remove(classList[0]);
  if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
  if(bool) Util.addClass(el, className);
  else Util.removeClass(el, className);
};

Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName('body')[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};


// File#: _1_responsive-sidebar
// Usage: codyhouse.co/license
(function() {
  var Sidebar = function(element) {
		this.element = element;
		this.triggers = document.querySelectorAll('[aria-controls="'+this.element.getAttribute('id')+'"]');
		this.firstFocusable = null;
		this.lastFocusable = null;
		this.selectedTrigger = null;
    this.showClass = "sidebar--is-visible";
    this.staticClass = "sidebar--static";
    this.customStaticClass = "";
    this.readyClass = "sidebar--loaded";
    this.contentReadyClass = "sidebar-loaded:show";
    this.layout = false; // this will be static or mobile
    this.preventScrollEl = getPreventScrollEl(this);
    getCustomStaticClass(this); // custom classes for static version
    initSidebar(this);
  };

  function getPreventScrollEl(element) {
		var scrollEl = false;
		var querySelector = element.element.getAttribute('data-sidebar-prevent-scroll');
		if(querySelector) scrollEl = document.querySelector(querySelector);
		return scrollEl;
	};

  function getCustomStaticClass(element) {
    var customClasses = element.element.getAttribute('data-static-class');
    if(customClasses) element.customStaticClass = ' '+customClasses;
  };
  
  function initSidebar(sidebar) {
    initSidebarResize(sidebar); // handle changes in layout -> mobile to static and viceversa
    
		if ( sidebar.triggers ) { // open sidebar when clicking on trigger buttons - mobile layout only
			for(var i = 0; i < sidebar.triggers.length; i++) {
				sidebar.triggers[i].addEventListener('click', function(event) {
					event.preventDefault();
          toggleSidebar(sidebar, event.target);
				});
			}
		}

    // use the 'openSidebar' event to trigger the sidebar
    sidebar.element.addEventListener('openSidebar', function(event) {
      toggleSidebar(sidebar, event.detail);
    });
  };

  function toggleSidebar(sidebar, target) {
    if(Util.hasClass(sidebar.element, sidebar.showClass)) {
      sidebar.selectedTrigger = target;
      closeSidebar(sidebar);
      return;
    }
    sidebar.selectedTrigger = target;
    showSidebar(sidebar);
    initSidebarEvents(sidebar);
  };

  function showSidebar(sidebar) { // mobile layout only
		Util.addClass(sidebar.element, sidebar.showClass);
		getFocusableElements(sidebar);
		Util.moveFocus(sidebar.element);
    // change the overflow of the preventScrollEl
		if(sidebar.preventScrollEl) sidebar.preventScrollEl.style.overflow = 'hidden';
  };

  function closeSidebar(sidebar) { // mobile layout only
		Util.removeClass(sidebar.element, sidebar.showClass);
		sidebar.firstFocusable = null;
		sidebar.lastFocusable = null;
    if(sidebar.selectedTrigger) sidebar.selectedTrigger.focus();
    sidebar.element.removeAttribute('tabindex');
		//remove listeners
		cancelSidebarEvents(sidebar);
    // change the overflow of the preventScrollEl
		if(sidebar.preventScrollEl) sidebar.preventScrollEl.style.overflow = '';
	};

  function initSidebarEvents(sidebar) { // mobile layout only
    //add event listeners
		sidebar.element.addEventListener('keydown', handleEvent.bind(sidebar));
		sidebar.element.addEventListener('click', handleEvent.bind(sidebar));
  };

  function cancelSidebarEvents(sidebar) { // mobile layout only
    //remove event listeners
		sidebar.element.removeEventListener('keydown', handleEvent.bind(sidebar));
		sidebar.element.removeEventListener('click', handleEvent.bind(sidebar));
  };

  function handleEvent(event) { // mobile layout only
    switch(event.type) {
      case 'click': {
        initClick(this, event);
      }
      case 'keydown': {
        initKeyDown(this, event);
      }
    }
  };

  function initKeyDown(sidebar, event) { // mobile layout only
    if( event.keyCode && event.keyCode == 27 || event.key && event.key == 'Escape' ) {
      //close sidebar window on esc
      closeSidebar(sidebar);
    } else if( event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' ) {
      //trap focus inside sidebar
      trapFocus(sidebar, event);
    }
  };

  function initClick(sidebar, event) { // mobile layout only
    //close sidebar when clicking on close button or sidebar bg layer 
		if( !event.target.closest('.js-sidebar__close-btn') && !Util.hasClass(event.target, 'js-sidebar') ) return;
		event.preventDefault();
		closeSidebar(sidebar);
  };

  function trapFocus(sidebar, event) { // mobile layout only
    if( sidebar.firstFocusable == document.activeElement && event.shiftKey) {
			//on Shift+Tab -> focus last focusable element when focus moves out of sidebar
			event.preventDefault();
			sidebar.lastFocusable.focus();
		}
		if( sidebar.lastFocusable == document.activeElement && !event.shiftKey) {
			//on Tab -> focus first focusable element when focus moves out of sidebar
			event.preventDefault();
			sidebar.firstFocusable.focus();
		}
  };

  function initSidebarResize(sidebar) {
    // custom event emitted when window is resized - detect only if the sidebar--static@{breakpoint} class was added
    var beforeContent = getComputedStyle(sidebar.element, ':before').getPropertyValue('content');
    if(beforeContent && beforeContent !='' && beforeContent !='none') {
      checkSidebarLayout(sidebar);

      sidebar.element.addEventListener('update-sidebar', function(event){
        checkSidebarLayout(sidebar);
      });
    } 
    // check if there a main element to show
    var mainContent = document.getElementsByClassName(sidebar.contentReadyClass);
    if(mainContent.length > 0) Util.removeClass(mainContent[0], sidebar.contentReadyClass);
    Util.addClass(sidebar.element, sidebar.readyClass);
  };

  function checkSidebarLayout(sidebar) {
    var layout = getComputedStyle(sidebar.element, ':before').getPropertyValue('content').replace(/\'|"/g, '');
    if(layout == sidebar.layout) return;
    sidebar.layout = layout;
    if(layout != 'static') Util.addClass(sidebar.element, 'is-hidden');
    Util.toggleClass(sidebar.element, sidebar.staticClass + sidebar.customStaticClass, layout == 'static');
    if(layout != 'static') setTimeout(function(){Util.removeClass(sidebar.element, 'is-hidden')});
    // reset element role 
    (layout == 'static') ? sidebar.element.removeAttribute('role', 'alertdialog') :  sidebar.element.setAttribute('role', 'alertdialog');
    // reset mobile behaviour
    if(layout == 'static' && Util.hasClass(sidebar.element, sidebar.showClass)) closeSidebar(sidebar);
  };

  function getFocusableElements(sidebar) {
    //get all focusable elements inside the drawer
		var allFocusable = sidebar.element.querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary');
		getFirstVisible(sidebar, allFocusable);
		getLastVisible(sidebar, allFocusable);
  };

  function getFirstVisible(sidebar, elements) {
		//get first visible focusable element inside the sidebar
		for(var i = 0; i < elements.length; i++) {
			if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
				sidebar.firstFocusable = elements[i];
				return true;
			}
		}
	};

	function getLastVisible(sidebar, elements) {
		//get last visible focusable element inside the sidebar
		for(var i = elements.length - 1; i >= 0; i--) {
			if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
				sidebar.lastFocusable = elements[i];
				return true;
			}
		}
  };

  window.Sidebar = Sidebar;

  //initialize the Sidebar objects
	var sidebar = document.getElementsByClassName('js-sidebar');
	if( sidebar.length > 0 ) {
		for( var i = 0; i < sidebar.length; i++) {
			(function(i){new Sidebar(sidebar[i]);})(i);
    }
    // switch from mobile to static layout
    var customEvent = new CustomEvent('update-sidebar');
    window.addEventListener('resize', function(event){
      (!window.requestAnimationFrame) ? setTimeout(function(){resetLayout();}, 250) : window.requestAnimationFrame(resetLayout);
    });

    (window.requestAnimationFrame) // init sidebar layout
      ? window.requestAnimationFrame(resetLayout)
      : resetLayout();

    function resetLayout() {
      for( var i = 0; i < sidebar.length; i++) {
        (function(i){sidebar[i].dispatchEvent(customEvent)})(i);
      };
    };
	}
}());
// File#: _1_slider
// Usage: codyhouse.co/license
(function() {
	var Slider = function(element) {
		this.element = element;
		this.rangeWrapper = this.element.getElementsByClassName('slider__range');
		this.rangeInput = this.element.getElementsByClassName('slider__input');
		this.value = this.element.getElementsByClassName('js-slider__value'); 
		this.floatingValue = this.element.getElementsByClassName('js-slider__value--floating'); 
		this.rangeMin = this.rangeInput[0].getAttribute('min');
		this.rangeMax = this.rangeInput[0].getAttribute('max');
		this.sliderWidth = window.getComputedStyle(this.element.getElementsByClassName('slider__range')[0]).getPropertyValue('width');
		this.thumbWidth = getComputedStyle(this.element).getPropertyValue('--slide-thumb-size');
		this.isInputVar = (this.value[0].tagName.toLowerCase() == 'input');
		this.isFloatingVar = this.floatingValue.length > 0;
		if(this.isFloatingVar) {
			this.floatingValueLeft = window.getComputedStyle(this.floatingValue[0]).getPropertyValue('left');
		}
		initSlider(this);
	};

	function initSlider(slider) {
		updateLabelValues(slider);// update label/input value so that it is the same as the input range
		updateLabelPosition(slider, false); // update label position if floating variation
		updateRangeColor(slider, false); // update range bg color
		checkRangeSupported(slider); // hide label/input value if input range is not supported
		
		// listen to change in the input range
		for(var i = 0; i < slider.rangeInput.length; i++) {
			(function(i){
				slider.rangeInput[i].addEventListener('input', function(event){
					updateSlider(slider, i);
				});
				slider.rangeInput[i].addEventListener('change', function(event){ // fix issue on IE where input event is not emitted
					updateSlider(slider, i);
				});
			})(i);
		}

		// if there's an input text, listen for changes in value, validate it and then update slider
		if(slider.isInputVar) {
			for(var i = 0; i < slider.value.length; i++) {
				(function(i){
					slider.value[i].addEventListener('change', function(event){
						updateRange(slider, i);
					});
				})(i);
			}
		}

		// native <input> element has been updated (e.g., form reset) -> update custom appearance
		slider.element.addEventListener('slider-updated', function(event){
			for(var i = 0; i < slider.value.length; i++) {updateSlider(slider, i);}
		});

		// custom events - emitted if slider has allows for multi-values
		slider.element.addEventListener('inputRangeLimit', function(event){
			updateLabelValues(slider);
			updateLabelPosition(slider, event.detail);
		});
	};

	function updateSlider(slider, index) {
		updateLabelValues(slider);
		updateLabelPosition(slider, index);
		updateRangeColor(slider, index);
	};

	function updateLabelValues(slider) {
		for(var i = 0; i < slider.rangeInput.length; i++) {
			slider.isInputVar ? slider.value[i].value = slider.rangeInput[i].value : slider.value[i].textContent = slider.rangeInput[i].value;
		}
	};

	function updateLabelPosition(slider, index) {
		if(!slider.isFloatingVar) return;
		var i = index ? index : 0,
			j = index ? index + 1: slider.rangeInput.length;
		for(var k = i; k < j; k++) {
			var percentage = (slider.rangeInput[k].value - slider.rangeMin)/(slider.rangeMax - slider.rangeMin);
			slider.floatingValue[k].style.left = 'calc(0.5 * '+slider.floatingValueLeft+' + '+percentage+' * ( '+slider.sliderWidth+' - '+slider.floatingValueLeft+' ))';
		}
	};

	function updateRangeColor(slider, index) {
		if(slider.rangeInput.length > 1) {slider.element.dispatchEvent(new CustomEvent('updateRange', {detail: index}));return;}
		var percentage = (slider.rangeInput[0].value - slider.rangeMin)/(slider.rangeMax - slider.rangeMin)*100,
			fill = 'calc('+percentage+'*('+slider.sliderWidth+' - 0.5*'+slider.thumbWidth+')/100)',
			empty = 'calc('+slider.sliderWidth+' - '+percentage+'*('+slider.sliderWidth+' - 0.5*'+slider.thumbWidth+')/100)';

		slider.rangeWrapper[0].style.setProperty('--slider-fill-value', fill);
		slider.rangeWrapper[0].style.setProperty('--slider-empty-value', empty);
	};

	function updateRange(slider, index) {
		var newValue = parseFloat(slider.value[index].value);
		if(isNaN(newValue)) {
			slider.value[index].value = slider.rangeInput[index].value;
			return;
		} else {
			if(newValue < slider.rangeMin) newValue = slider.rangeMin;
			if(newValue > slider.rangeMax) newValue = slider.rangeMax;
			slider.rangeInput[index].value = newValue;
			var inputEvent = new Event('change');
			slider.rangeInput[index].dispatchEvent(inputEvent);
		}
	};

	function checkRangeSupported(slider) {
		var input = document.createElement("input");
		input.setAttribute("type", "range");
		slider.element.classList.toggle('slider--range-not-supported', input.type !== "range")
	};

	//initialize the Slider objects
	var sliders = document.getElementsByClassName('js-slider');
	if( sliders.length > 0 ) {
		for( var i = 0; i < sliders.length; i++) {
			(function(i){new Slider(sliders[i]);})(i);
		}
	}
}());
// File#: _1_swipe-content
(function() {
	var SwipeContent = function(element) {
		this.element = element;
		this.delta = [false, false];
		this.dragging = false;
		this.intervalId = false;
		initSwipeContent(this);
	};

	function initSwipeContent(content) {
		content.element.addEventListener('mousedown', handleEvent.bind(content));
		content.element.addEventListener('touchstart', handleEvent.bind(content), {passive: true});
	};

	function initDragging(content) {
		//add event listeners
		content.element.addEventListener('mousemove', handleEvent.bind(content));
		content.element.addEventListener('touchmove', handleEvent.bind(content), {passive: true});
		content.element.addEventListener('mouseup', handleEvent.bind(content));
		content.element.addEventListener('mouseleave', handleEvent.bind(content));
		content.element.addEventListener('touchend', handleEvent.bind(content));
	};

	function cancelDragging(content) {
		//remove event listeners
		if(content.intervalId) {
			(!window.requestAnimationFrame) ? clearInterval(content.intervalId) : window.cancelAnimationFrame(content.intervalId);
			content.intervalId = false;
		}
		content.element.removeEventListener('mousemove', handleEvent.bind(content));
		content.element.removeEventListener('touchmove', handleEvent.bind(content));
		content.element.removeEventListener('mouseup', handleEvent.bind(content));
		content.element.removeEventListener('mouseleave', handleEvent.bind(content));
		content.element.removeEventListener('touchend', handleEvent.bind(content));
	};

	function handleEvent(event) {
		switch(event.type) {
			case 'mousedown':
			case 'touchstart':
				startDrag(this, event);
				break;
			case 'mousemove':
			case 'touchmove':
				drag(this, event);
				break;
			case 'mouseup':
			case 'mouseleave':
			case 'touchend':
				endDrag(this, event);
				break;
		}
	};

	function startDrag(content, event) {
		content.dragging = true;
		// listen to drag movements
		initDragging(content);
		content.delta = [parseInt(unify(event).clientX), parseInt(unify(event).clientY)];
		// emit drag start event
		emitSwipeEvents(content, 'dragStart', content.delta, event.target);
	};

	function endDrag(content, event) {
		cancelDragging(content);
		// credits: https://css-tricks.com/simple-swipe-with-vanilla-javascript/
		var dx = parseInt(unify(event).clientX), 
	    dy = parseInt(unify(event).clientY);
	  
	  // check if there was a left/right swipe
		if(content.delta && (content.delta[0] || content.delta[0] === 0)) {
	    var s = getSign(dx - content.delta[0]);
			
			if(Math.abs(dx - content.delta[0]) > 30) {
				(s < 0) ? emitSwipeEvents(content, 'swipeLeft', [dx, dy]) : emitSwipeEvents(content, 'swipeRight', [dx, dy]);	
			}
	    
	    content.delta[0] = false;
	  }
		// check if there was a top/bottom swipe
	  if(content.delta && (content.delta[1] || content.delta[1] === 0)) {
	  	var y = getSign(dy - content.delta[1]);

	  	if(Math.abs(dy - content.delta[1]) > 30) {
	    	(y < 0) ? emitSwipeEvents(content, 'swipeUp', [dx, dy]) : emitSwipeEvents(content, 'swipeDown', [dx, dy]);
	    }

	    content.delta[1] = false;
	  }
		// emit drag end event
	  emitSwipeEvents(content, 'dragEnd', [dx, dy]);
	  content.dragging = false;
	};

	function drag(content, event) {
		if(!content.dragging) return;
		// emit dragging event with coordinates
		(!window.requestAnimationFrame) 
			? content.intervalId = setTimeout(function(){emitDrag.bind(content, event);}, 250) 
			: content.intervalId = window.requestAnimationFrame(emitDrag.bind(content, event));
	};

	function emitDrag(event) {
		emitSwipeEvents(this, 'dragging', [parseInt(unify(event).clientX), parseInt(unify(event).clientY)]);
	};

	function unify(event) { 
		// unify mouse and touch events
		return event.changedTouches ? event.changedTouches[0] : event; 
	};

	function emitSwipeEvents(content, eventName, detail, el) {
		var trigger = false;
		if(el) trigger = el;
		// emit event with coordinates
		var event = new CustomEvent(eventName, {detail: {x: detail[0], y: detail[1], origin: trigger}});
		content.element.dispatchEvent(event);
	};

	function getSign(x) {
		if(!Math.sign) {
			return ((x > 0) - (x < 0)) || +x;
		} else {
			return Math.sign(x);
		}
	};

	window.SwipeContent = SwipeContent;
	
	//initialize the SwipeContent objects
	var swipe = document.getElementsByClassName('js-swipe-content');
	if( swipe.length > 0 ) {
		for( var i = 0; i < swipe.length; i++) {
			(function(i){new SwipeContent(swipe[i]);})(i);
		}
	}
}());
// File#: _1_toast
// Usage: codyhouse.co/license
(function() {
  var Toasts = function() {
    this.toastsEl = document.getElementsByClassName('js-toast');
    this.toastsId = getRandomInt(0, 1000);
    this.index = 0;
    this.closingToast = false;
    initToasts(this);
  };

  // public method to initialize new toast elements
  Toasts.prototype.initToast = function(element) {
		initSingleToast(this, element);
	};

  function initToasts(obj) {
    // create a wrapper element for each toast variation
    createWrapper(obj, 'top-right');
    createWrapper(obj, 'top-left');
    createWrapper(obj, 'top-center');
    createWrapper(obj, 'bottom-right');
    createWrapper(obj, 'bottom-left');
    createWrapper(obj, 'bottom-center');

    // init single toast element
    for(var i = 0; i < obj.toastsEl.length; i++) {
      initSingleToast(obj, obj.toastsEl[i]);
    }

    // listen for dynamic toast creation
    window.addEventListener('newToast', function(event) {
      initSingleToast(obj, event.detail);
    });
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  };

  function createWrapper(obj, position) {
    var classes = 'top-0 left-0 flex-column';
    if(position == 'top-right') classes = 'top-0 right-0 flex-column';
    if(position == 'top-center') classes = 'top-0 left-50% -translate-x-50% flex-column items-center';
    if(position == 'bottom-right') classes = 'bottom-0 right-0 flex-column-reverse';
    if(position == 'bottom-left') classes = 'bottom-0 left-0 flex-column-reverse';
    if(position == 'bottom-center') classes = 'bottom-0 left-50% -translate-x-50% flex-column-reverse items-center';

    var div = '<div class="toast-wrapper position-fixed flex '+classes+'" id="toast-wrapper-'+position+'"></div>';
    document.body.insertAdjacentHTML('beforeend', div);
    obj[position] = document.getElementById('toast-wrapper-'+position);
  };

  function initSingleToast(obj, toast) {
    var id = 'toast-'+obj.toastsId+'-'+obj.index;
    obj.index = obj.index + 1;
    // store toast info in the Toasts obj
    obj[id] = {};
    obj[id]['interval'] = toast.getAttribute('data-toast-interval') || 5000,
    obj[id]['intervalId'] = false;
    obj[id]['closing'] = false;
    // get position type
    var classes = toast.getAttribute('class');
    obj[id]['position'] = 'top-right';
    if(classes.indexOf('toast--top-left') > -1) obj[id]['position'] = 'top-left';
    if(classes.indexOf('toast--top-center') > -1) obj[id]['position'] = 'top-center';
    if(classes.indexOf('toast--bottom-right') > -1) obj[id]['position'] = 'bottom-right';
    if(classes.indexOf('toast--bottom-left') > -1) obj[id]['position'] = 'bottom-left'; 
    if(classes.indexOf('toast--bottom-center') > -1) obj[id]['position'] = 'bottom-center';

    // listen for custom open event
    toast.addEventListener('openToast', function() {
      if(!toast.classList.contains('toast--hidden') || obj[id]['closing']) return;
      openToast(obj, toast, id);
    });

    // close toast
    toast.addEventListener('click', function(event){
      if(event.target.closest('.js-toast__close-btn')) {
        obj.closingToast = true;
        closeToast(obj, toast, id);
      }
    });
  };

  function openToast(obj, toast, id) {
    if(obj[id]['intervalId']) {
      clearInterval(obj[id]['intervalId']);
      obj[id]['intervalId'] = false;
    }
    // place toast - insert in the proper container
    var fragment = document.createDocumentFragment();
    fragment.appendChild(toast);
    obj[obj[id]['position']].appendChild(fragment);

    // change position
    toast.style.position = 'static';

    // show toast
    setTimeout(function() {
      toast.classList.remove('toast--hidden');
    });
    
    // automatically close after a time interval
    if(obj[id]['interval'] && parseInt(obj[id]['interval']) > 0) {
      setToastInterval(obj, toast, id, obj[id]['interval']);
    }
  };

  function setToastInterval(obj, toast, id, interval) {
    obj[id]['intervalId'] = setTimeout(function(){
      if(obj.closingToast) return setToastInterval(obj, toast, id, 1000);
      closeToast(obj, toast, id);
    }, interval);
  };

  function closeToast(obj, toast, id) {
    obj[id]['closing'] = true;
    toast.classList.add('toast--hidden');
    // clear timeout
    if(obj[id]['intervalId']) clearTimeout(obj[id]['intervalId']);
    // remove toast and animate siblings
    closeToastAnimation(obj, toast, id);    
  };

  function closeToastAnimation(obj, toast, id) {
    // get all next elements 
    var siblings = getToastNextSiblings(toast);
    // get translate value (could be positive or negative based on position)
    var toastStyle = window.getComputedStyle(toast),
      margin = parseInt(toastStyle.getPropertyValue('margin-top')) || parseInt(toastStyle.getPropertyValue('margin-bottom'));
    // translate next elements if any
    var translate = toast.offsetHeight + margin;
    if(obj[id]['position'].indexOf('top') > -1) {
      translate = '-'+translate
    }
    for(var i = 0; i < siblings.length; i++) {
      siblings[i].style.transform = 'translateY('+translate+'px)';
    }
    // remove toast and reset translate
    toast.addEventListener('transitionend', function cb(event){
      if(event.propertyName != 'opacity') return;
      toast.removeEventListener('transitionend', cb);
      removeToast(toast, siblings, obj, id);
      obj.closingToast = false;
    });
  };

  function getToastNextSiblings(toast) {
    var array = [];
    var nextSibling = toast.nextElementSibling;
    if(nextSibling) {
      array.push(nextSibling);
      var nextSiblingsIterate = getToastNextSiblings(nextSibling);
      Array.prototype.push.apply(array, nextSiblingsIterate);
    }
    return array;
  };

  function removeToast(toast, siblings, obj, id) {
    // reset position
    toast.style.position = '';

    // move toast back to body
    var fragment = document.createDocumentFragment();
    fragment.appendChild(toast);
    document.body.appendChild(fragment); 

    // reset siblings translate
    for(var i = 0; i < siblings.length; i++) {
      (function(i){
        // set transition to none
        siblings[i].style.transition = 'none';
        siblings[i].style.transform = '';
        setTimeout(function() {siblings[i].style.transition = '';}, 10);
      })(i);
    }

    // reset closing status
    obj[id]['closing'] = false;
  };

  window.Toasts = Toasts;

	//initialize the Toasts objects
	var toasts = document.getElementsByClassName('js-toast');
	if( toasts.length > 0 ) {
		new Toasts();
	}
}());
if(!Util) function Util () {};

Util.addClass = function(el, className) {
  var classList = className.split(' ');
  el.classList.add(classList[0]);
  if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.cssSupports = function(property, value) {
  return CSS.supports(property, value);
};

// File#: _2_slider-multi-value
// Usage: codyhouse.co/license
(function() {
	var SliderMulti = function(element) {
		this.element = element;
		this.rangeWrapper = this.element.getElementsByClassName('slider__range');
		this.rangeInput = this.element.getElementsByClassName('slider__input');
		this.rangeMin = this.rangeInput[0].getAttribute('min');
		this.rangeMax = this.rangeInput[0].getAttribute('max');
		this.sliderWidth = window.getComputedStyle(this.element.getElementsByClassName('slider__range')[0]).getPropertyValue('width');
		this.thumbWidth = getComputedStyle(this.element).getPropertyValue('--slide-thumb-size');
		initSliderMulti(this);
	};

	function initSliderMulti(slider) {
		// toggle custom class based on browser support
		toggleMsClass(slider);

		// init bg color of the slider
		updateRangeColor(slider);

		slider.element.addEventListener('updateRange', function(event){
			checkRangeValues(slider, event.detail);
			updateRangeColor(slider);
		});

		// custom event emitted after window resize
		slider.element.addEventListener('update-slider-multi-value', function(event){
			slider.sliderWidth = window.getComputedStyle(slider.element.getElementsByClassName('slider__range')[0]).getPropertyValue('width');
			updateRangeColor(slider);
		});
	};

	function checkRangeValues(slider, index) {
		// if min value was changed -> make sure min value is smaller than max value 
		// if max value was changed -> make sure max value is bigger than min value 
		var i = (index == 0) ? 1 : 0,
			limit = parseFloat(slider.rangeInput[i].value);
		if( (index == 0 && slider.rangeInput[0].value >= limit) || (index == 1 && slider.rangeInput[1].value <= limit) ) {
			slider.rangeInput[index].value = limit;
			slider.element.dispatchEvent(new CustomEvent('inputRangeLimit', {detail: index}))
		}
	};

	function updateRangeColor(slider) { // update background fill color of the slider
		var percentageStart = parseInt((slider.rangeInput[0].value - slider.rangeMin)/(slider.rangeMax - slider.rangeMin)*100),
			percentageEnd = parseInt((slider.rangeInput[1].value - slider.rangeMin)/(slider.rangeMax - slider.rangeMin)*100), 
			start = 'calc('+percentageStart+'*('+slider.sliderWidth+' - 0.5*'+slider.thumbWidth+')/100)',
			end = 'calc('+percentageEnd+'*('+slider.sliderWidth+' - 0.5*'+slider.thumbWidth+')/100)';

		slider.rangeWrapper[0].style.setProperty('--slider-fill-value-start', start);
		slider.rangeWrapper[0].style.setProperty('--slider-fill-value-end', end);
	};

	function toggleMsClass(slider) {
		var cssVariablesSupport = Util.cssSupports('--color-value', 'red'),
			imeAlignSuport = Util.cssSupports('-ms-ime-align', 'auto');
		if(imeAlignSuport || !cssVariablesSupport) Util.addClass(slider.element, 'slider--ms-fallback'); // IE and Edge (<=18) Fallback
	};

	//initialize the SliderMulti objects
	var slidersMulti = document.getElementsByClassName('js-slider');
	if( slidersMulti.length > 0 ) {
		var slidersMultiArray = [];
		for( var i = 0; i < slidersMulti.length; i++) {(function(i){
			if(slidersMulti[i].getElementsByClassName('slider__input').length > 1) slidersMultiArray.push(new SliderMulti(slidersMulti[i]));
		})(i);}
		if(slidersMultiArray.length > 0) {
			var resizingId = false,
        customEvent = new CustomEvent('update-slider-multi-value');
      
      window.addEventListener('resize', function() {
        clearTimeout(resizingId);
        resizingId = setTimeout(doneResizing, 500);
      });

      function doneResizing() {
        for( var i = 0; i < slidersMultiArray.length; i++) {
          (function(i){slidersMultiArray[i].element.dispatchEvent(customEvent)})(i);
        };
      };
		}
	}
}());
if(!Util) function Util () {};

Util.hasClass = function(el, className) {
  return el.classList.contains(className);
};

Util.addClass = function(el, className) {
  var classList = className.split(' ');
  el.classList.add(classList[0]);
  if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
  var classList = className.split(' ');
  el.classList.remove(classList[0]);
  if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
  if(bool) Util.addClass(el, className);
  else Util.removeClass(el, className);
};

Util.setAttributes = function(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName('body')[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};


Util.getIndexInArray = function(array, el) {
  return Array.prototype.indexOf.call(array, el);
};


Util.cssSupports = function(property, value) {
  return CSS.supports(property, value);
};

Util.extend = function() {
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
    deep = arguments[0];
    i++;
  }

  var merge = function (obj) {
    for ( var prop in obj ) {
      if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
        if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
          extended[prop] = extend( true, extended[prop], obj[prop] );
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  for ( ; i < length; i++ ) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;
};

// File#: _2_slideshow-preview-mode
// Usage: codyhouse.co/license
(function() {
	var SlideshowPrew = function(opts) {
		this.options = Util.extend(SlideshowPrew.defaults , opts);
		this.element = this.options.element;
		this.list = this.element.getElementsByClassName('js-slideshow-pm__list')[0];
		this.items = this.list.getElementsByClassName('js-slideshow-pm__item');
		this.controls = this.element.getElementsByClassName('js-slideshow-pm__control-wrapper'); 
		this.selectedSlide = 0;
		this.autoplayId = false;
		this.autoplayPaused = false;
		this.navigation = false;
		this.navCurrentLabel = false;
		this.ariaLive = false;
		this.moveFocus = false;
		this.animating = false;
		this.supportAnimation = Util.cssSupports('transition');
		this.itemWidth = false;
		this.itemMargin = false;
		this.containerWidth = false;
		this.resizeId = false;
		// we will need this to implement keyboard nav
		this.firstFocusable = false;
		this.lastFocusable = false;
		// fallback for browsers not supporting flexbox
		initSlideshow(this);
		initSlideshowEvents(this);
		initAnimationEndEvents(this);
		Util.addClass(this.element, 'slideshow-pm--js-loaded');
	};

	SlideshowPrew.prototype.showNext = function(autoplay) {
		showNewItem(this, this.selectedSlide + 1, 'next', autoplay);
	};

	SlideshowPrew.prototype.showPrev = function() {
		showNewItem(this, this.selectedSlide - 1, 'prev');
	};

	SlideshowPrew.prototype.showItem = function(index) {
		showNewItem(this, index, false);
	};

	SlideshowPrew.prototype.startAutoplay = function() {
		var self = this;
		if(this.options.autoplay && !this.autoplayId && !this.autoplayPaused) {
			self.autoplayId = setInterval(function(){
				self.showNext(true);
			}, self.options.autoplayInterval);
		}
	};

	SlideshowPrew.prototype.pauseAutoplay = function() {
		var self = this;
		if(this.options.autoplay) {
			clearInterval(self.autoplayId);
			self.autoplayId = false;
		}
	};

	function initSlideshow(slideshow) { // basic slideshow settings
		// if no slide has been selected -> select the first one
		if(slideshow.element.getElementsByClassName('slideshow-pm__item--selected').length < 1) Util.addClass(slideshow.items[0], 'slideshow-pm__item--selected');
		slideshow.selectedSlide = Util.getIndexInArray(slideshow.items, slideshow.element.getElementsByClassName('slideshow-pm__item--selected')[0]);
		// now set translate value to the container element
		setTranslateValue(slideshow);
		setTranslate(slideshow);
		resetSlideshowNav(slideshow, 0, slideshow.selectedSlide);
		setFocusableElements(slideshow);
		// if flexbox is not supported, set a width for the list element
		if(!flexSupported) resetSlideshowFlexFallback(slideshow);
		// now add class to animate while translating
		setTimeout(function(){Util.addClass(slideshow.list, 'slideshow-pm__list--has-transition');}, 50);
		// add arai-hidden to not selected slides
		for(var i = 0; i < slideshow.items.length; i++) {
			(i == slideshow.selectedSlide) ? slideshow.items[i].removeAttribute('aria-hidden') : slideshow.items[i].setAttribute('aria-hidden', 'true');
		}
		// create an element that will be used to announce the new visible slide to SR
		var srLiveArea = document.createElement('div');
		Util.setAttributes(srLiveArea, {'class': 'sr-only js-slideshow-pm__aria-live', 'aria-live': 'polite', 'aria-atomic': 'true'});
		slideshow.element.appendChild(srLiveArea);
		slideshow.ariaLive = srLiveArea;
	};

	function initSlideshowEvents(slideshow) {
		// if slideshow navigation is on -> create navigation HTML and add event listeners
		if(slideshow.options.navigation) {
			var navigation = document.createElement('ol'),
				navChildren = '';
			
			navigation.setAttribute('class', slideshow.options.navClass);
			for(var i = 0; i < slideshow.items.length; i++) {
				var className = (i == slideshow.selectedSlide) ? 'class="'+slideshow.options.navItemClass+' '+slideshow.options.navItemClass+'--selected js-slideshow-pm__nav-item"' :  'class="'+slideshow.options.navItemClass+' js-slideshow-pm__nav-item"',
					navCurrentLabel = (i == slideshow.selectedSlide) ? '<span class="sr-only js-slideshow-pm__nav-current-label">Current Item</span>' : '';
				navChildren = navChildren + '<li '+className+'><button class="reset '+slideshow.options.navBtnClass+'"><span class="sr-only">'+ (i+1) + '</span>'+navCurrentLabel+'</button></li>';
			}

			navigation.innerHTML = navChildren;
			slideshow.navCurrentLabel = navigation.getElementsByClassName('js-slideshow-pm__nav-current-label')[0]; 
			slideshow.element.appendChild(navigation);
			slideshow.navigation = slideshow.element.getElementsByClassName('js-slideshow-pm__nav-item');

			navigation.addEventListener('click', function(event){
				navigateSlide(slideshow, event, true);
			});
			navigation.addEventListener('keyup', function(event){
				navigateSlide(slideshow, event, (event.key.toLowerCase() == 'enter'));
			});
		}
		// slideshow arrow controls
		if(slideshow.controls.length > 0) {
			slideshow.controls[0].addEventListener('click', function(event){
				event.preventDefault();
				slideshow.showPrev();
				updateAriaLive(slideshow);
			});
			slideshow.controls[1].addEventListener('click', function(event){
				event.preventDefault();
				slideshow.showNext(false);
				updateAriaLive(slideshow);
			});
		}
		// navigate slideshow when clicking on preview
		if(slideshow.options.prewNav) {
			slideshow.element.addEventListener('click', function(event){
				var item = event.target.closest('.js-slideshow-pm__item');
				if(item && !Util.hasClass(item, 'slideshow-pm__item--selected')) {
					slideshow.showItem(Util.getIndexInArray(slideshow.items, item));
				}
			});
		}
		// swipe events
		if(slideshow.options.swipe) {
			//init swipe
			new SwipeContent(slideshow.element);
			slideshow.element.addEventListener('swipeLeft', function(event){
				slideshow.showNext(false);
			});
			slideshow.element.addEventListener('swipeRight', function(event){
				slideshow.showPrev();
			});
		}
		// autoplay
		if(slideshow.options.autoplay) {
			slideshow.startAutoplay();
			// pause autoplay if user is interacting with the slideshow
			slideshow.element.addEventListener('mouseenter', function(event){
				slideshow.pauseAutoplay();
				slideshow.autoplayPaused = true;
			});
			slideshow.element.addEventListener('focusin', function(event){
				slideshow.pauseAutoplay();
				slideshow.autoplayPaused = true;
			});
			slideshow.element.addEventListener('mouseleave', function(event){
				slideshow.autoplayPaused = false;
				slideshow.startAutoplay();
			});
			slideshow.element.addEventListener('focusout', function(event){
				slideshow.autoplayPaused = false;
				slideshow.startAutoplay();
			});
		}
		// keyboard navigation
		initKeyboardEvents(slideshow);
		// reset on resize
    window.addEventListener('resize', function(event){
    	slideshow.pauseAutoplay();
      clearTimeout(slideshow.resizeId);
      slideshow.resizeId = setTimeout(function(){
        resetSlideshowResize(slideshow);
        setTimeout(function(){slideshow.startAutoplay();}, 60);
      }, 250)
    });
	};

	function initKeyboardEvents(slideshow) {
		// tab on selected slide -> if last focusable -> move to prev or next arrow
		// tab + shift selected slide -> if first focusable -> move to container
		if(slideshow.controls.length > 0) {
			// tab+shift on prev arrow -> move focus to last focusable element inside the selected slide (or to the slider container)
			slideshow.controls[0].addEventListener('keydown', function(event){
				if( (event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab') && event.shiftKey ) moveFocusToLast(slideshow);
			});
			// tab+shift on next arrow -> if first slide selectes -> move focus to last focusable element inside the selected slide (or to the slider container)
			slideshow.controls[1].addEventListener('keydown', function(event){
				if( (event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab') && event.shiftKey && (slideshow.selectedSlide == 0)) moveFocusToLast(slideshow);
			});
		}
		// check tab is pressed when focus is inside selected slide
		slideshow.element.addEventListener('keydown', function(event){
			if( event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' ) {
				var target = event.target.closest('.js-slideshow-pm__item');
				if(target && Util.hasClass(target, 'slideshow-pm__item--selected')) moveFocusOutsideSlide(slideshow, event);
				else if(target || Util.hasClass(event.target, 'js-slideshow-pm') && !event.shiftKey) moveFocusToSelectedSlide(slideshow);
			} 
		});

		// detect tab moves to slideshow 
		window.addEventListener('keyup', function(event){
			if( event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab') {
				var target = event.target.closest('.js-slideshow-prew__item');
				if(target || Util.hasClass(event.target, 'js-slideshow-prew') && !event.shiftKey) moveFocusToSelectedSlide(slideshow);
			}
		});
	};

	function moveFocusToLast(slideshow) {
		event.preventDefault();
		if(slideshow.lastFocusable)	{
			slideshow.lastFocusable.focus();
		} else {
			Util.moveFocus(slideshow.element);
		}
	};

	function moveFocusToSelectedSlide(slideshow) { // focus is inside a slide that is not selected
		event.preventDefault();
		if(slideshow.firstFocusable)	{
			slideshow.firstFocusable.focus();
		} else if(slideshow.controls.length > 0) {
			(slideshow.selectedSlide == 0) ? slideshow.controls[1].getElementsByTagName('button')[0].focus() : slideshow.controls[0].getElementsByTagName('button')[0].focus();
		} else if(slideshow.options.navigation) {
			slideshow.navigation.getElementsByClassName('js-slideshow-pm__nav-item')[0].getElementsByTagName('button')[0].focus();
		}
	};

	function moveFocusOutsideSlide(slideshow, event) {
		if(event.shiftKey && slideshow.firstFocusable && event.target == slideshow.firstFocusable) {
			// shift+tab -> focus was on first foucusable element inside selected slide -> move to container
			event.preventDefault();
			Util.moveFocus(slideshow.element);
		} else if( !event.shiftKey && slideshow.lastFocusable && event.target == slideshow.lastFocusable) {
			event.preventDefault();
			
			if(slideshow.selectedSlide != 0) slideshow.controls[0].getElementsByTagName('button')[0].focus();
			else slideshow.controls[1].getElementsByTagName('button')[0].focus();
		}
	};

	function initAnimationEndEvents(slideshow) {
		slideshow.list.addEventListener('transitionend', function(){
			setTimeout(function(){ // add a delay between the end of animation and slideshow reset - improve animation performance
				resetAnimationEnd(slideshow);
			}, 100);
		});
	};

	function resetAnimationEnd(slideshow) {
		if(slideshow.moveFocus) Util.moveFocus(slideshow.items[slideshow.selectedSlide]);
		slideshow.items[slideshow.selectedSlide].removeAttribute('aria-hidden');
		slideshow.animating = false;
		slideshow.moveFocus = false;
		slideshow.startAutoplay();
	};

	function navigateSlide(slideshow, event, keyNav) { 
		// user has interacted with the slideshow navigation -> update visible slide
		var target = event.target.closest('.js-slideshow-pm__nav-item');
		if(keyNav && target && !Util.hasClass(target, slideshow.options.navItemClass+'--selected')) {
			slideshow.showItem(Util.getIndexInArray(slideshow.navigation, target));
			slideshow.moveFocus = true;
			updateAriaLive(slideshow);
		}
	};

	function showNewItem(slideshow, index, bool, autoplay) {
		if(slideshow.animating && slideshow.supportAnimation) return;
		if(autoplay) {
			if(index < 0) index = slideshow.items.length - 1;
			else if(index >= slideshow.items.length) index = 0;
		}
		if(index < 0 || index >= slideshow.items.length) return;
		slideshow.animating = true;
		Util.removeClass(slideshow.items[slideshow.selectedSlide], 'slideshow-pm__item--selected');
		slideshow.items[slideshow.selectedSlide].setAttribute('aria-hidden', 'true'); //hide to sr element that is exiting the viewport
		Util.addClass(slideshow.items[index], 'slideshow-pm__item--selected');
		resetSlideshowNav(slideshow, index, slideshow.selectedSlide);
		slideshow.selectedSlide = index;
		setTranslate(slideshow);
		slideshow.pauseAutoplay();
		setFocusableElements(slideshow);
		if(!transitionSupported) resetAnimationEnd(slideshow);
		emitSlideshowEvent(slideshow, 'newSlide');
	};

	function updateAriaLive(slideshow) {
		slideshow.ariaLive.innerHTML = 'Item '+(slideshow.selectedSlide + 1)+' of '+slideshow.items.length;
	};

	function resetSlideshowResize(slideshow) {
		Util.removeClass(slideshow.list, 'slideshow-pm__list--has-transition');
		setTimeout(function(){
			setTranslateValue(slideshow);
			setTranslate(slideshow);
			Util.addClass(slideshow.list, 'slideshow-pm__list--has-transition');
		}, 30)
	};

	function setTranslateValue(slideshow) {
		var itemStyle = window.getComputedStyle(slideshow.items[slideshow.selectedSlide]);

		slideshow.itemWidth = parseFloat(itemStyle.getPropertyValue('width'));
		slideshow.itemMargin = parseFloat(itemStyle.getPropertyValue('margin-right'));
		slideshow.containerWidth = parseFloat(window.getComputedStyle(slideshow.element).getPropertyValue('width'));
	};

	function setTranslate(slideshow) {
		var translate = parseInt(((slideshow.itemWidth + slideshow.itemMargin) * slideshow.selectedSlide * (-1)) + ((slideshow.containerWidth - slideshow.itemWidth)*0.5));
    slideshow.list.style.transform = 'translateX('+translate+'px)';
    slideshow.list.style.msTransform = 'translateX('+translate+'px)';
  };

  function resetSlideshowNav(slideshow, newIndex, oldIndex) {
  	if(slideshow.navigation) {
			Util.removeClass(slideshow.navigation[oldIndex], slideshow.options.navItemClass+'--selected');
			Util.addClass(slideshow.navigation[newIndex], slideshow.options.navItemClass+'--selected');
			slideshow.navCurrentLabel.parentElement.removeChild(slideshow.navCurrentLabel);
			slideshow.navigation[newIndex].getElementsByTagName('button')[0].appendChild(slideshow.navCurrentLabel);
		}
		if(slideshow.controls.length > 0) {
			Util.toggleClass(slideshow.controls[0], 'slideshow-pm__control-wrapper--active', newIndex != 0);
			Util.toggleClass(slideshow.controls[1], 'slideshow-pm__control-wrapper--active', newIndex != (slideshow.items.length - 1));
  	}
  };

  function setFocusableElements(slideshow) {
  	//get all focusable elements inside the selected slide
		var allFocusable = slideshow.items[slideshow.selectedSlide].querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary');
		getFirstVisible(slideshow, allFocusable);
		getLastVisible(slideshow, allFocusable);
  };

  function getFirstVisible(slideshow, elements) {
  	slideshow.firstFocusable = false;
		//get first visible focusable element inside the selected slide
		for(var i = 0; i < elements.length; i++) {
			if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
				slideshow.firstFocusable = elements[i];
				return true;
			}
		}
  };

  function getLastVisible(slideshow, elements) {
  	//get last visible focusable element inside the selected slide
  	slideshow.lastFocusable = false;
		for(var i = elements.length - 1; i >= 0; i--) {
			if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
				slideshow.lastFocusable = elements[i];
				return true;
			}
		}
  };

  function resetSlideshowFlexFallback(slideshow) {
		slideshow.list.style.width = ((slideshow.items.length+1)*(slideshow.itemMargin+slideshow.itemWidth))+'px';
		for(var i = 0; i < slideshow.items.length; i++) {slideshow.items[i].style.width = slideshow.itemWidth+'px';}
  };

	function emitSlideshowEvent(slideshow, eventType) {
    if(eventType == 'newSlide') {
      var detail = slideshow.selectedSlide;
    }
    slideshow.element.dispatchEvent(new CustomEvent(eventType, {detail: detail}));
  };

	SlideshowPrew.defaults = {
    element : '',
    navigation : true,
    autoplay : false,
    autoplayInterval: 5000,
    prewNav: false,
    swipe: false,
		navClass: 'slideshow-pm__navigation',
		navItemClass: 'slideshow-pm__nav-item',
		navBtnClass: 'slideshow-pm__nav-btn'
  };

  window.SlideshowPrew = SlideshowPrew;
	
	// initialize the slideshowsPrew objects
	var slideshowsPrew = document.getElementsByClassName('js-slideshow-pm'),
		flexSupported = Util.cssSupports('align-items', 'stretch'),
		transitionSupported = Util.cssSupports('transition');
	if( slideshowsPrew.length > 0 ) {
		for( var i = 0; i < slideshowsPrew.length; i++) {
			(function(i){
				var navigation = (slideshowsPrew[i].getAttribute('data-navigation') && slideshowsPrew[i].getAttribute('data-navigation') == 'off') ? false : true,
					autoplay = (slideshowsPrew[i].getAttribute('data-autoplay') && slideshowsPrew[i].getAttribute('data-autoplay') == 'on') ? true : false,
					autoplayInterval = (slideshowsPrew[i].getAttribute('data-autoplay-interval')) ? slideshowsPrew[i].getAttribute('data-autoplay-interval') : 5000,
					prewNav = (slideshowsPrew[i].getAttribute('data-pm-nav') && slideshowsPrew[i].getAttribute('data-pm-nav') == 'on' ) ? true : false, 
					swipe = (slideshowsPrew[i].getAttribute('data-swipe') && slideshowsPrew[i].getAttribute('data-swipe') == 'on') ? true : false,
					navClass = slideshowsPrew[i].getAttribute('data-pm-nav-class') ? slideshowsPrew[i].getAttribute('data-pm-nav-class') : 'slideshow-pm__navigation',
					navItemClass = slideshowsPrew[i].getAttribute('data-pm-nav-item-class') ? slideshowsPrew[i].getAttribute('data-pm-nav-item-class') : 'slideshow-pm__nav-item',
					navBtnClass = slideshowsPrew[i].getAttribute('data-pm-nav-btn-class') ? slideshowsPrew[i].getAttribute('data-pm-nav-btn-class') : 'slideshow-pm__nav-btn';
				new SlideshowPrew({element: slideshowsPrew[i], navigation: navigation, autoplay : autoplay, autoplayInterval : autoplayInterval, swipe : swipe, prewNav: prewNav, navClass: navClass, navItemClass: navItemClass, navBtnClass: navBtnClass});
			})(i);
		}
	}

}());
// File#: _3_advanced-filter
// Usage: codyhouse.co/license
(function() {
  // the AdvFilter object is used to handle: 
  // - number of results
  // - form reset
  // - filtering sections label (to show a preview of the option selected by the users)
  var AdvFilter = function(element) {
    this.element = element; 
    this.form = this.element.getElementsByClassName('js-adv-filter__form');
    this.resultsList = this.element.getElementsByClassName('js-adv-filter__gallery')[0];
    this.resultsCount = this.element.getElementsByClassName('js-adv-filter__results-count');
    initAdvFilter(this);
  };

  function initAdvFilter(filter) {
    if(filter.form.length > 0) {
      // reset form
      filter.form[0].addEventListener('reset', function(event){
        setTimeout(function(){
          resetFilters(filter);
          resetGallery(filter);
        });
      });
      // update section labels on form change
      filter.form[0].addEventListener('change', function(event){
        var section = event.target.closest('.js-adv-filter__item');
        if(section) resetSelection(filter, section);
        else if( event.target.classList.contains('js-adv-filter__form') ) {
          // reset the entire form lables
          var sections = filter.form[0].getElementsByClassName('js-adv-filter__item');
          for(var i = 0; i < sections.length; i++) resetSelection(filter, sections[i]);
        }
      });
    }

    // reset results count
    if(filter.resultsCount.length > 0) {
      filter.resultsList.addEventListener('filter-selection-updated', function(event){
        updateResultsCount(filter);
      });
    }
  };

  function resetFilters(filter) {
    // check if there are custom form elemets - reset appearance
    // custom select
    var customSelect = filter.element.getElementsByClassName('js-select');
    if(customSelect.length > 0) {
      for(var i = 0; i < customSelect.length; i++) customSelect[i].dispatchEvent(new CustomEvent('select-updated'));
    }
    // custom slider
    var customSlider = filter.element.getElementsByClassName('js-slider');
    if(customSlider.length > 0) {
      for(var i = 0; i < customSlider.length; i++) customSlider[i].dispatchEvent(new CustomEvent('slider-updated'));
    }
  };

  function resetSelection(filter, section) {
    // change label value based on input types
    var labelSelection = section.getElementsByClassName('js-adv-filter__selection');
    if(labelSelection.length == 0) return;
    // select
    var select = section.getElementsByTagName('select');
    if(select.length > 0) {
      labelSelection[0].textContent = getSelectLabel(section, select[0]);
      return;
    }
    // input number
    var number = section.querySelectorAll('input[type="number"]');
    if(number.length > 0) {
      labelSelection[0].textContent = getNumberLabel(section, number);
      return;
    }
    // input range
    var slider = section.querySelectorAll('input[type="range"]');
    if(slider.length > 0) {
      labelSelection[0].textContent = getSliderLabel(section, slider);
      return;
    }
    // radio/checkboxes
    var radio = section.querySelectorAll('input[type="radio"]'),
      checkbox = section.querySelectorAll('input[type="checkbox"]');
    if(radio.length > 0) {
      labelSelection[0].textContent = getInputListLabel(section, radio);
      return;
    } else if(checkbox.length > 0) {
      labelSelection[0].textContent = getInputListLabel(section, checkbox);
      return;
    }
  };

  function getSelectLabel(section, select) {
    if(select.multiple) {
      var label = '',
        counter = 0;
      for (var i = 0; i < select.options.length; i++) {
        if(select.options[i].selected) {
          label = label + '' + select.options[i].text;
          counter = counter + 1;
        } 
        if(counter > 1) label = section.getAttribute('data-multi-select-text').replace('{n}', counter);
      }
      return label;
    } else {
      return select.options[select.selectedIndex].text;
    }
  };

  function getNumberLabel(section, number) {
    var counter = 0;
    for(var i = 0; i < number.length; i++) {
      if(number[i].value != number[i].min) counter = counter + 1;
    }
    if(number.length > 1) { // multiple input number in this section
      if(counter > 0) {
        return section.getAttribute('data-multi-select-text').replace('{n}', counter);
      } else {
        return section.getAttribute('data-default-text');
      }
      
    } else {
      if(number[0].value == number[0].min) return section.getAttribute('data-default-text');
      else return section.getAttribute('data-number-format').replace('{n}', number[0].value);
    }
  };

  function getSliderLabel(section, slider) {
    var label = '',
      labelFormat = section.getAttribute('data-number-format');
    for(var i = 0; i < slider.length; i++) {
      if(i != 0 ) label = label+' - ';
      label = label + labelFormat.replace('{n}', slider[i].value);
    }
    return label;
  };

  function getInputListLabel(section, inputs) {
    var counter = 0;
      label = '';
    for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].checked) {
        var labelElement = inputs[i].parentNode.getElementsByTagName('label');
        if(labelElement.length > 0) label = labelElement[0].textContent;
        counter = counter + 1;
      }
    }
    if(counter > 1) return section.getAttribute('data-multi-select-text').replace('{n}', counter);
    else if(counter == 0 ) return section.getAttribute('data-default-text');
    else return label;
  };

  function resetGallery(filter) {
    // emit change event + reset filtering 
    filter.form[0].dispatchEvent(new CustomEvent('change'));
    filter.resultsList.dispatchEvent(new CustomEvent('update-filter-results'));
  };

  function updateResultsCount(filter) {
    var resultItems = filter.resultsList.children,
      counter = 0;
    for(var i = 0; i < resultItems.length; i++) {
      if(isVisible(resultItems[i])) counter = counter + 1;
    }
    filter.resultsCount[0].textContent = counter;
  };

  function isVisible(element) {
		return (element.offsetWidth || element.offsetHeight || element.getClientRects().length);
	};
  
  //initialize the AdvFilter objects
	var advFilter = document.getElementsByClassName('js-adv-filter');
	if( advFilter.length > 0 ) {
		for( var i = 0; i < advFilter.length; i++) {
			(function(i){new AdvFilter(advFilter[i]);})(i);
		}
  }

  // Remove the code below if you want to use a custom filtering function (e.g., you need to fetch your results from a database)
  
  // The code below is used for filtering of page content (animation of DOM elements, no fetching results from database).  
  // It uses the Filter component (https://codyhouse.co/ds/components/app/filter) - you can modify the custom filtering functions based on your needs
  // Check the info page of the component for info on how to use it: https://codyhouse.co/ds/components/info/filter
  var gallery = document.getElementById('adv-filter-gallery');
  if(gallery) {
    new Filter({
      element: gallery, // this is your gallery element
      priceRange: function(items){ // this is the price custom function
        var filteredArray = [],
          minVal = document.getElementById('slider-min-value').value,
          maxVal = document.getElementById('slider-max-value').value;
        for(var i = 0; i < items.length; i++) {
          var price = parseInt(items[i].getAttribute('data-price'));
          filteredArray[i] = (price >= minVal) && (price <= maxVal);
        } 
        return filteredArray;
      },
      indexValue: function(items){ // this is the index custom function
        var filteredArray = [],
          value = document.getElementById('index-value').value;
        for(var i = 0; i < items.length; i++) {
          var index = parseInt(items[i].getAttribute('data-sort-index'));
          filteredArray[i] = index >= value;
        } 
        return filteredArray;
      },
      searchInput: function(items) {
        var filteredArray = [],
          value = document.getElementById('search-products').value;
        for(var i = 0; i < items.length; i++) {
          var searchFilter = items[i].getAttribute('data-search');
          filteredArray[i] = searchFilter == '' || searchFilter.toLowerCase().indexOf(value.toLowerCase()) > -1;
        } 
        return filteredArray;
      }
    });
  }
}());