(function() {
	// Schedule Template - by CodyHouse.co
	function ScheduleTemplate( element ) {
		this.element = element;
		this.timelineItems = this.element.getElementsByClassName('cd-schedule__timeline')[0].getElementsByTagName('li');
		this.timelineStart = getScheduleTimestamp(this.timelineItems[0].textContent);
		this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems[1].textContent) - getScheduleTimestamp(this.timelineItems[0].textContent);
		
		this.topInfoElement = this.element.getElementsByClassName('cd-schedule__top-info')[0];
		this.singleEvents = this.element.getElementsByClassName('cd-schedule__event');
		
		this.model = this.element.getElementsByClassName('cd-schedule-model')[0];
		this.modelHeader = this.element.getElementsByClassName('cd-schedule-model__header')[0];
		this.modelHeaderBg = this.element.getElementsByClassName('cd-schedule-model__header-bg')[0];
		this.modelClose = this.model.getElementsByClassName('cd-schedule-model__close')[0];
		this.modelDate = this.model.getElementsByClassName('cd-schedule-model__date')[0];
		this.modelEventName = this.model.getElementsByClassName('cd-schedule-model__name')[0];
		this.coverLayer = this.element.getElementsByClassName('cd-schedule__cover-layer')[0];

		this.modelMaxWidth = 800;
		this.modelMaxHeight = 480;

		this.animating = false;
		this.supportAnimation = Util.cssSupports('transition');

		this.initSchedule();
	};

	ScheduleTemplate.prototype.initSchedule = function() {
		this.scheduleReset();
		this.initEvents();
	};

	ScheduleTemplate.prototype.scheduleReset = function() {
		// according to the mq value, init the style of the template
		var mq = this.mq(),
			loaded = Util.hasClass(this.element, 'js-schedule-loaded'),
			modelOpen = Util.hasClass(this.model, 'cd-schedule-model--open');
		if( mq == 'desktop' && !loaded ) {
			Util.addClass(this.element, 'js-schedule-loaded');
			this.placeEvents();
			modelOpen && this.checkEventModal(modelOpen);
		} else if( mq == 'mobile' && loaded) {
			//in this case you are on a mobile version (first load or resize from desktop)
			Util.removeClass(this.element, 'cd-schedule--loading js-schedule-loaded');
			this.resetEventsStyle();
			modelOpen && this.checkEventModal();
		} else if( mq == 'desktop' && modelOpen ) {
			//on a mobile version with model open - need to resize/move model window
			this.checkEventModal(modelOpen);
			Util.removeClass(this.element, 'cd-schedule--loading');
		} else {
			Util.removeClass(this.element, 'cd-schedule--loading');
		}
	};

	ScheduleTemplate.prototype.resetEventsStyle = function() {
		// remove js style applied to the single events
		for(var i = 0; i < this.singleEvents.length; i++) {
			this.singleEvents[i].removeAttribute('style');
		}
	};

	ScheduleTemplate.prototype.placeEvents = function() {
		// on big devices - place events in the template according to their time/day
		var self = this,
			slotHeight = this.topInfoElement.offsetHeight;
		for(var i = 0; i < this.singleEvents.length; i++) {
			var anchor = this.singleEvents[i].getElementsByTagName('a')[0];
			var start = getScheduleTimestamp(anchor.getAttribute('data-start')),
				duration = getScheduleTimestamp(anchor.getAttribute('data-end')) - start;

			var eventTop = slotHeight*(start - self.timelineStart)/self.timelineUnitDuration,
				eventHeight = slotHeight*duration/self.timelineUnitDuration;

			this.singleEvents[i].setAttribute('style', 'top: '+(eventTop-1)+'px; height: '+(eventHeight +1)+'px');
		}

		Util.removeClass(this.element, 'cd-schedule--loading');
	};

	ScheduleTemplate.prototype.initEvents = function() {
		var self = this;
		for(var i = 0; i < this.singleEvents.length; i++) {
			// open model when user selects an event
			this.singleEvents[i].addEventListener('click', function(event){
				event.preventDefault();
				if(!self.animating) self.openModal(this.getElementsByTagName('a')[0]);
			});
		}
		//close model window
		this.modelClose.addEventListener('click', function(event){
			event.preventDefault();
			if( !self.animating ) self.closeModal();
		});
		this.coverLayer.addEventListener('click', function(event){
			event.preventDefault();
			if( !self.animating ) self.closeModal();
		});
	};

	ScheduleTemplate.prototype.openModal = function(target) {
		var self = this;
		var mq = self.mq();
		this.animating = true;

		//update event name and time
		this.modelEventName.textContent = target.getElementsByTagName('em')[0].textContent;
		this.modelDate.textContent = target.getAttribute('data-start')+' - '+target.getAttribute('data-end');
		this.model.setAttribute('data-event', target.getAttribute('data-event'));


		Util.addClass(this.model, 'cd-schedule-model--open');
		
		setTimeout(function(){
			//fixes a flash when an event is selected - desktop version only
			Util.addClass(target.closest('li'), 'cd-schedule__event--selected');
		}, 10);

		if( mq == 'mobile' ) {
			self.model.addEventListener('transitionend', function cb(){
				self.animating = false;
				self.model.removeEventListener('transitionend', cb);
			});
		} else {
			var eventPosition = target.getBoundingClientRect(),
				eventTop = eventPosition.top,
				eventLeft = eventPosition.left,
				eventHeight = target.offsetHeight,
				eventWidth = target.offsetWidth;

			var windowWidth = window.innerWidth,
				windowHeight = window.innerHeight;

			var modelWidth = ( windowWidth*.8 > self.modelMaxWidth ) ? self.modelMaxWidth : windowWidth*.8,
				modelHeight = ( windowHeight*.8 > self.modelMaxHeight ) ? self.modelMaxHeight : windowHeight*.8;

			var modelTranslateX = parseInt((windowWidth - modelWidth)/2 - eventLeft),
				modelTranslateY = parseInt((windowHeight - modelHeight)/2 - eventTop);
			
			var HeaderBgScaleY = modelHeight/eventHeight,
				BodyBgScaleX = modelWidth;

			//change model height/width and translate it
			self.model.setAttribute('style', 'top:'+eventTop+'px;left:'+eventLeft+'px;height:'+modelHeight+'px;width:'+modelWidth+'px;transform: translateY('+modelTranslateY+'px) translateX('+modelTranslateX+'px)');
			//set modelHeader width
			self.modelHeader.setAttribute('style', 'width:' + modelWidth + 'px');
			//set modelBody left margin
			//change model modelHeaderBg height/width and scale it
			self.modelHeaderBg.setAttribute('style', 'height: ' + eventHeight + 'px; width: ' + modelWidth + 'px; transform: scaleY(' + HeaderBgScaleY + ')');
			
			self.modelHeaderBg.addEventListener('transitionend', function cb(){
				//wait for the  end of the modelHeaderBg transformation and show the model content
				self.animating = false;
				Util.addClass(self.model, 'cd-schedule-model--animation-completed');
				self.modelHeaderBg.removeEventListener('transitionend', cb);
			});
		}

		//if browser do not support transitions -> no need to wait for the end of it
		this.animationFallback();
	};

	ScheduleTemplate.prototype.closeModal = function() {
		var self = this;
		var mq = self.mq();

		var item = self.element.getElementsByClassName('cd-schedule__event--selected')[0],
			target = item.getElementsByTagName('a')[0];

		this.animating = true;

		if( mq == 'mobile' ) {
			Util.removeClass(this.model, 'cd-schedule-model--open');
			self.model.addEventListener('transitionend', function cb(){
				Util.removeClass(self.model, 'cd-schedule-model--content-loaded');
				Util.removeClass(item, 'cd-schedule__event--selected');
				self.animating = false;
				self.model.removeEventListener('transitionend', cb);
			});
		} else {
			var eventPosition = target.getBoundingClientRect(),
				eventTop = eventPosition.top,
				eventLeft = eventPosition.left,
				eventHeight = target.offsetHeight,
				eventWidth = target.offsetWidth;

			var modelStyle = window.getComputedStyle(self.model),
				modelTop = Number(modelStyle.getPropertyValue('top').replace('px', '')),
				modelLeft = Number(modelStyle.getPropertyValue('left').replace('px', ''));

			var modelTranslateX = eventLeft - modelLeft,
				modelTranslateY = eventTop - modelTop;

			Util.removeClass(this.model, 'cd-schedule-model--open cd-schedule-model--animation-completed');

			//change model width/height and translate it
			self.model.style.width = eventWidth+'px';self.model.style.height = eventHeight+'px';self.model.style.transform = 'translateX('+modelTranslateX+'px) translateY('+modelTranslateY+'px)';

			// self.modelHeaderBg.setAttribute('style', 'transform: scaleY(1)');
			self.modelHeaderBg.style.transform = 'scaleY(1)';

			self.modelHeaderBg.addEventListener('transitionend', function cb(){
				//wait for the  end of the modelHeaderBg transformation and reset model style
				Util.addClass(self.model, 'cd-schedule-model--no-transition');
				setTimeout(function(){
					self.model.removeAttribute('style');
					self.modelHeader.removeAttribute('style');
					self.modelHeaderBg.removeAttribute('style');
				}, 10);
				setTimeout(function(){
					Util.removeClass(self.model, 'cd-schedule-model--no-transition');
				}, 20);
				self.animating = false;
				Util.removeClass(self.model, 'cd-schedule-model--content-loaded');
				Util.removeClass(item, 'cd-schedule__event--selected');
				self.modelHeaderBg.removeEventListener('transitionend', cb);
			});
		}

		//if browser do not support transitions -> no need to wait for the end of it
		this.animationFallback();
	};

	ScheduleTemplate.prototype.checkEventModal = function(modelOpen) {
		// this function is used on resize to reset events/model style
		this.animating = true;
		var self = this;
		var mq = this.mq();
		if( mq == 'mobile' ) {
			//reset model style on mobile
			self.model.removeAttribute('style');
			self.modelBody.removeAttribute('style');
			self.modelHeader.removeAttribute('style');
			self.modelHeaderBg.removeAttribute('style');
			self.modelBodyBg.removeAttribute('style');
			Util.removeClass(self.model, 'cd-schedule-model--no-transition');
			self.animating = false;	
		} else if( mq == 'desktop' && modelOpen) {
			Util.addClass(self.model, 'cd-schedule-model--no-transition cd-schedule-model--animation-completed');
			var item = self.element.getElementsByClassName('cd-schedule__event--selected')[0],
				target = item.getElementsByTagName('a')[0];

			var eventPosition = target.getBoundingClientRect(),
				eventTop = eventPosition.top,
				eventLeft = eventPosition.left,
				eventHeight = target.offsetHeight,
				eventWidth = target.offsetWidth;

			var windowWidth = window.innerWidth,
				windowHeight = window.innerHeight;

			var modelWidth = ( windowWidth*.8 > self.modelMaxWidth ) ? self.modelMaxWidth : windowWidth*.8,
				modelHeight = ( windowHeight*.8 > self.modelMaxHeight ) ? self.modelMaxHeight : windowHeight*.8;

			var HeaderBgScaleY = modelHeight/eventHeight,
				BodyBgScaleX = (modelWidth - eventWidth);


			setTimeout(function(){
				self.model.setAttribute('style', 'top:'+(windowHeight/2 - modelHeight/2)+'px;left:'+(windowWidth/2 - modelWidth/2)+'px;height:'+modelHeight+'px;width:'+modelWidth+'px;transform: translateY(0) translateX(0)');
				//change model modelBodyBg height/width
				self.modelBodyBg.style.height = modelHeight+'px';self.modelBodyBg.style.transform = 'scaleY(1) scaleX('+BodyBgScaleX+')';self.modelBodyBg.style.width = '1px';
				//set modelHeader width
				self.modelHeader.setAttribute('style', 'width:'+eventWidth+'px');
				//set modelBody left margin
				self.modelBody.setAttribute('style', 'margin-left:'+eventWidth+'px');
				//change model modelHeaderBg height/width and scale it
				self.modelHeaderBg.setAttribute('style', 'height: '+eventHeight+'px;width:'+eventWidth+'px; transform:scaleY('+HeaderBgScaleY+');');
			}, 10);

			setTimeout(function(){
				Util.removeClass(self.model, 'cd-schedule-model--no-transition');
				self.animating = false;	
			}, 20);

		}
	};

	ScheduleTemplate.prototype.animationFallback = function() {
		if( !this.supportAnimation ) { // fallback for browsers not supporting transitions
			var event = new CustomEvent('transitionend');
			self.model.dispatchEvent(event);
			self.modelHeaderBg.dispatchEvent(event);
		}
	};

	ScheduleTemplate.prototype.mq = function(){
		//get MQ value ('desktop' or 'mobile') 
		var self = this;
		return window.getComputedStyle(this.element, '::before').getPropertyValue('content').replace(/'|"/g, "");
	};

	function getScheduleTimestamp(time) {
		//accepts hh:mm format - convert hh:mm to timestamp
		time = time.replace(/ /g,'');
		var timeArray = time.split(':');
		var timeStamp = parseInt(timeArray[0])*60 + parseInt(timeArray[1]);
		return timeStamp;
	};

	var scheduleTemplate = document.getElementsByClassName('js-cd-schedule'),	
		scheduleTemplateArray = [],
		resizing = false;
	if( scheduleTemplate.length > 0 ) { // init ScheduleTemplate objects
		for( var i = 0; i < scheduleTemplate.length; i++) {
			(function(i){
				scheduleTemplateArray.push(new ScheduleTemplate(scheduleTemplate[i]));
			})(i);
		}

		window.addEventListener('resize', function(event) { 
			// on resize - update events position and model position (if open)
			if( !resizing ) {
				resizing = true;
				(!window.requestAnimationFrame) ? setTimeout(checkResize, 250) : window.requestAnimationFrame(checkResize);
			}
		});

		window.addEventListener('keyup', function(event){
			// close event model when pressing escape key
			if( event.keyCode && event.keyCode == 27 || event.key && event.key.toLowerCase() == 'escape' ) {
				for(var i = 0; i < scheduleTemplateArray.length; i++) {
					scheduleTemplateArray[i].closeModal();
				}
			}
		});

		function checkResize(){
			for(var i = 0; i < scheduleTemplateArray.length; i++) {
				scheduleTemplateArray[i].scheduleReset();
			}
			resizing = false;
		};
	}
}());