export class AsyncAlarmClock {
	public interval;
	public ticker: (...args: any) => any;
	public clearTimer?: (...args: any) => any;
	private looping: boolean = true; // internal condition to break the asynchronous setTimeout based for-loop.
	private timer_running: boolean = false;
	/**
	 * @param interval number of ms between each tick.
	 * @param ticker function to be called every tick.
	 * @member clearTimer internal function to be called when the timer should end.
	 */
	constructor(interval: number, ticker: (...args: any) => any) {
		this.interval = interval;
		this.ticker = ticker;
	}
	async setTimer() {
		if (this.timer_running) return "Timer already running...";
		this.looping = true;
		return await new Promise(async (resolve_main) => {
			this.timer_running = true;
			this.clearTimer = (...args) => {
				this.timer_running = false;
				this.looping = false;
				resolve_main(args);
			}
			for (; this.looping; await new Promise(resolve_loop => setTimeout(resolve_loop, this.interval))) {
				typeof this.ticker === "function" && await this.ticker();
			}
		});
	}
	setInterval(new_interval: number) {
		this.interval = new_interval;
	}
}