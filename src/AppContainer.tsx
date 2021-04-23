import React from 'react';
import { SWRStoreRoot } from 'react-swr-store';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import AppTitle from './AppTitle';
import SWRStore from './SWRStore';

import './AppContainer.css';

export default function AppContainer(): JSX.Element {
  return (
    <SWRStoreRoot>
      <GeistProvider themeType="dark">
        <CssBaseline />
        <AppTitle />
        <div className="AppContainer">
          <SWRStore />
        </div>
      </GeistProvider>
    </SWRStoreRoot>
  );
}
