import pickBy from 'lodash/pickBy'
import React from "react"
import {createDevTools} from "redux-devtools"
import Dispatcher from 'redux-devtools-dispatch'
import DockMonitor from "redux-devtools-dock-monitor"
import Inspector from 'redux-devtools-inspector';
import MultipleMonitors from 'redux-devtools-multiple-monitors'
import * as actions from '../actions'

const THEME = 'nicinabox';

const actionCreators = pickBy(actions, o => typeof o === 'function');

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

