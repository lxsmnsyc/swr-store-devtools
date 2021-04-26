import React from 'react';
import ThemeSettings from './ThemeSettings';

import './Settings.css';

export default function Settings(): JSX.Element {
  return (
    <div className="Settings">
      <ThemeSettings />
    </div>
  );
}
