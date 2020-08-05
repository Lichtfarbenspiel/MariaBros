namespace Platformer {

    export class Timer {

        private timeLeft: number;
        
        constructor(_levelTime: number) {
            this.timeLeft = _levelTime;
        }

        public startTimer(): void {
            let interval = setInterval(() => {
                if (this.timeLeft > 0) 
                    this.timeLeft --;
                // else
                // this.timeLeft = this.timeLeft;
            }, 1000)
        }


    }
}