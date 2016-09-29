import React from "react"
import {createDevTools} from "redux-devtools"
import Dispatcher from 'redux-devtools-dispatch'
import DockMonitor from "redux-devtools-dock-monitor"
import Inspector from 'redux-devtools-inspector';
import MultipleMonitors from 'redux-devtools-multiple-monitors'

const THEME = 'nicinabox';

const actionCreators = {
};

export default createDevTools(
  <DockMonitor
      toggleVisibilityKey="ctrl-h"
      changePositionKey="ctrl-w"
      changeMonitorKey="ctrl-m"
      defaultIsVisible={false}>
    <MultipleMonitors>
      <Inspector theme={THEME} />
      <Dispatcher actionCreators={actionCreators} />
    </MultipleMonitors>
  </DockMonitor>
);

