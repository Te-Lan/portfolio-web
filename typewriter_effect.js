var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el.querySelector('.wrap'); // Target the .wrap span for text manipulation
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isFading = false; // Use this flag to manage fading
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (!this.isFading) {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        this.el.innerHTML = this.txt + '<span class="cursor"></span>'; // Add cursor span
    }

    var that = this;
    var delta = 30 - Math.random() * 5;

    if (!this.isFading && this.txt === fullTxt && !this.cursorAdded) {
        this.cursorAdded = true; // Ensure the cursor logic runs only once per cycle
        setTimeout(function() {
            that.isFading = true;
            that.el.parentElement.className = 'typewrite fade'; // Start fade, cursor will fade too
            setTimeout(function() {
                that.el.parentElement.className = 'typewrite'; // Reset class
                that.txt = ''; // Clear text
                that.loopNum++;
                that.isFading = false;
                that.cursorAdded = false; // Reset cursor logic for the next cycle
                that.tick();
            }, 500); // Ensure this matches CSS animation duration
        }, this.period); // Pause with cursor blinking before fade-out
    } else if (!this.isFading) {
        setTimeout(function() {
            that.tick();
        }, delta);
    }
};


window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};

