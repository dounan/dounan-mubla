class EventEmitter {  

  constructor() {
    this._listeners = new Map();
  };

  addListener(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('addListener only takes instances of Function');
    }
    if (!this._listeners.has(type)) {
      this._listeners.set(type, []);
    }
    this._listeners.get(type).push(listener);
  };

  /**
   * Remove the first instance of the listener.
   *
   * If a listener is added multiple times, removeListener must also be called
   * multiple times.
   */
  removeListener(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }
    const arr = this._listeners.get(type);
    if (!arr) return;
    const i = arr.indexOf(listener);
    if (i < 0) return;
    arr.splice(i, 1);
    if (arr.length === 0) {
      this._listeners.delete(type);
    }
  };

  removeAllListeners(type) {
    this._listeners.delete(type);
  };

  listenerCount(type) {
    const arr = this._listeners.get(type);
    if (!arr) return 0;
    return arr.length;
  };

  emit(type, ...args) {
    const arr = this._listeners.get(type);
    if (!arr) return;
    for (let listener of arr) {
      listener(...args);
    }
  };
}

export default EventEmitter;

