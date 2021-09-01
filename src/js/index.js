(function () {
    class Timer {
        constructor() {
            this._milliSeconds = 0;
            this._seconds = 0;
            this._minutes = 0;
            this._lapCount = 1;
        }
        zeros(number) {
            if (number <= 9) {
                return "0" + number;
            }
            return number;
        }
        incTime() {
            this._milliSeconds++;
            if (this._milliSeconds > 99) {
                this._milliSeconds = 0;
                this._seconds++;
                if (this._seconds >= 60) {
                    this._seconds = 0;
                    this._minutes++;
                }
            }
        }
        incLap() {
            this._lapCount++;
        }

        get lapCount() {
            return this._lapCount;
        }

        get milliSeconds() {
            return this.zeros(this._milliSeconds);
        }

        get seconds() {
            return this.zeros(this._seconds);
        }

        get minutes() {
            return this.zeros(this._minutes);
        }

        get time() {
            return `${this.minutes}:${this.seconds}:${this.milliSeconds}`
        }
    }

    const StopWatch = {
        init() {
            this.count = 0;
            this.Timer = new Timer();
            this.eapp__timer = document.querySelector(".app__timer");
            this.eStart = document.querySelector('.app__controls__start');
            this.eLap = document.querySelector('.app__controls__lap');
            this.eLapsContainer = document.querySelector('.app__laps');
            this.eStart.addEventListener('click', (e) => {
                this.start(e)
            });
            this.eLap.addEventListener('click', (e) => {
                this.lap(e);
            })
        },
        displayWatch() {
            this.eapp__timer.textContent = this.Timer.time;
            this.eapp__timer.setAttribute('datetime', this.Timer.time);
        },
        update() {
            this.Timer.incTime();
            this.displayWatch();
        },
        lap() {
            if (this.counter) {
                this.Timer.incLap();
                this.eLapsContainer.insertAdjacentHTML('beforeend',
                    `<li class="app__lap">
                <span class="app__lap-count">Tour ${this.Timer.lapCount - 1}</span>
                <time class="app__lap-value" datatype="${this.Timer.time}">${this.Timer.time}</time>
            </li>`
                );
                this.eLapsContainer.scrollTop = this.eLapsContainer.scrollHeight;
            } else {
                this.reset();
            }
        },
        reset() {
            this.Timer = new Timer();
            this.eLapsContainer.innerHTML = '';
            this.displayWatch();
            [this.eLap.textContent, this.eLap.dataset.alternate] = [this.eLap.dataset.alternate, this.eLap.textContent];
        },
        start(e) {
            e.preventDefault();
            if (this.counter) {
                clearInterval(this.counter);
                this.counter = 0;
                [this.eLap.textContent, this.eLap.dataset.alternate] = [this.eLap.dataset.alternate, this.eLap.textContent];
            } else {
                this.counter = window.setInterval(this.update.bind(this), 10);
                if (this.Timer.lapCount) {
                    [this.eLap.textContent, this.eLap.dataset.alternate] = [this.eLap.dataset.alternate, this.eLap.textContent];
                }
            }

            [this.eStart.textContent, this.eStart.dataset.alternate] = [this.eStart.dataset.alternate, this.eStart.textContent];
            this.eStart.classList.toggle('running')
        },

    }
    StopWatch.init();
})();