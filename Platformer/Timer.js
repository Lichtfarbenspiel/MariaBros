"use strict";
var Platformer;
(function (Platformer) {
    class Timer {
        constructor(_levelTime) {
            this.timeLeft = _levelTime;
        }
        startTimer() {
            let interval = setInterval(() => {
                if (this.timeLeft > 0)
                    this.timeLeft--;
                // else
                // this.timeLeft = this.timeLeft;
            }, 1000);
        }
    }
    Platformer.Timer = Timer;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Timer.js.map