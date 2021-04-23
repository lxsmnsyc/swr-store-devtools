import { Spinner } from '@geist-ui/react';
import React, { Suspense } from 'react';
import SWRTable from './SWRTable';

import './SWRStore.css';

export default function SWRStore(): JSX.Element {
  return (
    <div className="SWRStore">
      <Suspense fallback={<Spinner size="large" />}>
        <SWRTable />
      </Suspense>
    </div>
  );
}
