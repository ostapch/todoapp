class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(listener);
  }

  emit(eventName) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((listener) => listener());
    }
  }
}

export default new EventEmitter();
