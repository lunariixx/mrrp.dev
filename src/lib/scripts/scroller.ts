export class Scroller {
    public target_element;
    public text;
    public max_length;
    public trail_chars;
    public scroll_interval;
    public running;
    public i;
    public steps;
    /**
     * @param target_element Which HTMLElement to write the scroller text to.
     * @param start_text Initial scroller text.
     * @param max_length How many characters to display at a time.
     * @param trail_chars Specify if you want a more fluid scrolling effect.
     * @param update_interval The delay between steps of the scroller (millis).
     */
    constructor(target_element: HTMLElement, start_text: string, max_length: number, trail_chars: number, update_interval: number) {
        this.target_element = target_element
            , this.text = start_text
            , this.max_length = max_length
            , this.trail_chars = trail_chars
            , this.scroll_interval = update_interval
            , this.running = false
            , this.steps = (): number => Math.ceil(this.text.length / this.max_length)
            , this.i = 0;
    }

    setElement(new_element: HTMLElement) {
        this.target_element = new_element;
        this.i = 0;
    }

    setText(new_text: string) {
        this.text = new_text;
        this.i = 0;
    }

    setMaxLength(new_length: number) {
        this.max_length = new_length;
        this.i = 0;
    }

    setTrailChars(new_chars: number) {
        this.trail_chars = new_chars;
        this.i = 0;
    }

    setScrollSpeed(new_speed: number) {
        this.scroll_interval = new_speed;
        this.i = 0;
    }

    async scroll() { // this is for one cycle. when it is finished, it should be called again from a loop to snap the scroller text to the beginning.
        if (this.target_element?.innerText !== null) this.target_element.innerText = this.text.substring(0, this.max_length); // if you want the first segment of text to display immediately.
        for (this.i = 1; this.i <= this.steps(); this.i++) { // set i to 1 if you want the first segment of text to display immediately.
            await new Promise(resolve => {
                setTimeout(() => {
                    let scroller_text = this.text.substring(this.i * this.max_length - this.trail_chars, (this.i + 1) * this.max_length);
                    if (this.target_element?.innerText !== null) this.target_element.innerText = scroller_text;
                    resolve(null);
                }, this.scroll_interval);
            });
        }
        await this.scroll();
    }
}
