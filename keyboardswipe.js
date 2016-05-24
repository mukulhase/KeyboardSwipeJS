/**
 * Created by mukulhase on 5/31/16.
 */
(function () {
    var keyboardswipe = {
        keyboardMap: {
            '1': [1, 0],
            '2': [2, 0],
            '3': [3, 0],
            '4': [4, 0],
            '5': [5, 0],
            '6': [6, 0],
            '7': [7, 0],
            '8': [8, 0],
            '9': [9, 0],
            '0': [10, 0],
            'q': [0.5, 1],
            'w': [1.5, 1],
            'e': [2.5, 1],
            'r': [3.5, 1],
            't': [4.5, 1],
            'y': [5.5, 1],
            'u': [6.5, 1],
            'i': [7.5, 1],
            'o': [8.5, 1],
            'p': [9.5, 1],
            '[': [10.5, 1],
            ']': [11.5, 1],
            'a': [0.8, 2],
            's': [1.8, 2],
            'd': [2.8, 2],
            'f': [3.8, 2],
            'g': [4.8, 2],
            'h': [5.8, 2],
            'j': [6.8, 2],
            'k': [7.8, 2],
            'l': [8.8, 2],
            ';': [9.8, 2],
            '\'': [10.8, 2],
            'z': [1.3, 3],
            'x': [2.3, 3],
            'c': [3.3, 3],
            'v': [4.3, 3],
            'b': [5.3, 3],
            'n': [6.3, 3],
            'm': [7.3, 3],
            ',': [8.3, 3],
            '.': [9.3, 3],
            '/': [10.3, 3]
        },
        state: false,
        beginning: [],
        displacement: [],
        timer: 0,
        events: {
            'right': new Event('keyboardSwipeRight'),
            'left': new Event('keyboardSwipeLeft'),
            'up': new Event('keyboardSwipeUp'),
            'down': new Event('keyboardSwipeDown')
        },
        init: function () {
            this.state = false;
            this.beginning = [];
            this.displacement = [];
            this.timer = 0;
            document.addEventListener("keypress", this.handler.bind(this));
        },
        handler: function (e) {
            var position = this.keyboardMap[String.fromCharCode(e.keyCode)];
            if(!position)return;
            if (this.state == false) {
                this.state = true;
                this.beginning = position;
            }
            if (this.timer) {
                clearTimeout(this.timer);
            }
            var that = this;
            this.timer = setTimeout(function () {
                that.state = false;
                that.gestureComplete();
            }, 200);
            this.displacement = [this.beginning[0] - position[0], this.beginning[1] - position[1]]
        },
        gestureComplete: function () {
            if (Math.abs(this.displacement[0]) > Math.abs(this.displacement[1])) {
                if (this.displacement[0] < 0) {
                    document.dispatchEvent(this.events["right"]);
                } else {
                    document.dispatchEvent(this.events["left"]);
                }
            } else {
                if (this.displacement[1] < 0) {
                    document.dispatchEvent(this.events["down"]);
                } else {
                    document.dispatchEvent(this.events["up"]);
                }
            }
        }

    };
    keyboardswipe.init();
})();