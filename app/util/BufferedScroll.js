import EventEmitter from './EventEmitter'

/**
 * If you imagine scrollX and scrollY as a point in a tiled grid with each tile
 * having dimensions gridW x gridH, this class will only propagate scroll events
 * from the containerElem if the scroll position is in a new tile.
 */
class BufferedScroll extends EventEmitter {

  constructor(targetElem, gridW, gridH) {
    if (gridW < 1 || gridH < 1) {
      throw new Error(`Invalid grid size (${gridW}, ${gridH}). Grid size must be > 0`);
    }
    super();
    this._targetElem = targetElem;
    this._gridW = gridW;
    this._gridH = gridH;
    this._lastCol = -1;
    this._lastRow = -1;
  };

  addListener(type, listener) {
    super.addListener(type, listener);
    if (type === 'scroll' && this.listenerCount(type) === 1) {
      this._targetElem.addEventListener('scroll', this._handleScroll);
    }
  };

  removeListener(type, listener) {
    super.removeListener(type, listener);
    if (type === 'scroll' && this.listenerCount(type) === 0) {
      this._targetElem.removeEventListener('scroll', this._handleScroll);
    }
  };

  removeAllListeners(type) {
    super.removeAllListeners(type);
    if (type === 'scroll') {
      this._targetElem.removeEventListener('scroll', this._handleScroll);
    }
  };

  setGridW(gridW) {
    this._gridW = gridW;
  };

  setGridH(gridH) {
    this._gridH = gridH;
  };

  _scrollX = () => this._targetElem.scrollLeft || this._targetElem.scrollX;

  _scrollY = () => this._targetElem.scrollTop || this._targetElem.scrollY;

  _col = (x) => Math.floor(x / this._gridW);

  _row = (y) => Math.floor(y / this._gridH);

  _curCol = () => this._col(this._scrollX());

  _curRow = () => this._row(this._scrollY());

  _handleScroll = (evt) => {
    const col = this._curCol();
    const row = this._curRow();
    if (this._lastCol !== col || this._lastRow !== row) {
      this._lastCol = col;
      this._lastRow = row;
      this.emit('scroll', evt);
    }
  };
}

export default BufferedScroll;

