export class Scroller {
	public target_element_id: string;
	public text: string;
	public display_size: number;
	public scroll_step: number;
	private direction: string = "forward";
	private index: number = 0;
	/**
	 * @param target_element Which HTMLElement to write the scroller text to.
	 * @param text Initial scroller text.
	 * @param display_size How many characters to display at a time.
	 * @param scroll_step How many characters to advance by.
	*/
	constructor(target_element_id: string, text: string, display_size: number, scroll_step: number) {
		this.target_element_id = target_element_id,
			this.text = text,
			this.display_size = display_size,
			this.scroll_step = scroll_step;
	}
	setElement(target_element: string) {
		this.target_element_id = target_element;
	}
	setText(text: string) {
		this.text = text;
	}
	setDisplaySize(display_size: number) {
		this.display_size = display_size;
	}
	setScrollStep(step: number) {
		this.scroll_step = step;
	}
	setIndex(index: number) {
		if (index >= 0 && index <= this.text.length)
			this.index = index;
	}
	setDirection(direction: string) {
		if (["forward", "backward"].includes(direction))
			this.direction = direction;
	}
	async scroll(delay?: number) {
		let elem = document.getElementById(this.target_element_id) || undefined;
		return await new Promise(async (resolve) => {
			let steps = Math.max(Math.ceil((this.text.length - this.display_size) / this.scroll_step), 0);
			if (this.direction == "forward" && elem !== undefined)
				elem.innerText = this.text.substring(this.index * this.scroll_step, this.display_size + this.index * this.scroll_step);
			else if (this.direction == "backward" && elem !== undefined)
				elem.innerText = this.text.substring(this.text.length - this.display_size - this.index * this.scroll_step, this.text.length - this.index * this.scroll_step);
			if (this.index >= steps) {
				this.direction = {
					"forward": "backward",
					"backward": "forward"
				}[this.direction] || "";
				this.index = 0;
				typeof delay === "number" && await new Promise(r => setTimeout(r, delay * 2)); // 2 feels nicer
			} else {
				this.index++;
			}
			resolve(null);
		}
		);
	}
}