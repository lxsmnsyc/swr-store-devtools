import { Spinner, Tabs } from '@geist-ui/react';
import React, { Suspense } from 'react';
import SWRTable from './SWRTable';
import { EcmasonViewSettings } from './models/EcmasonViewSettings';
import Settings from './Settings';

import './SWRStore.css';

export default function SWRStore(): JSX.Element {
  return (
    <EcmasonViewSettings.Provider>
      <div className="SWRStore">
        <Tabs initialValue="1" className="SWRStoreTabs">
          <Tabs.Item label="view" value="1">
            <Suspense fallback={<Spinner size="large" />}>
              <SWRTable />
            </Suspense>
          </Tabs.Item>
          <Tabs.Item label="settings" value="2">
            <Settings />
          </Tabs.Item>
        </Tabs>
      </div>
    </EcmasonViewSettings.Provider>
  );
}
