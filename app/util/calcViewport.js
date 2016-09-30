
/**
 * visibleClientRect specifies the visible rectangle in the client/window
 * coordinate system.
 *
 * Returns a viewport {top, left, width, height} relative to the element's
 * coordinate system.
 */
export default function(visibleClientRect, element, buffer=0) {
  const {top: offY, left: offX} = element.getBoundingClientRect();
  return {
    top: visibleClientRect.top - offY - buffer,
    left: visibleClientRect.left - offX - buffer,
    width: visibleClientRect.width + 2 * buffer,
    height: visibleClientRect.height + 2 * buffer
  };
}

