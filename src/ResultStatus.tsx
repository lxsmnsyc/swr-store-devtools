import { Check, Loader, X } from '@geist-ui/react-icons';
import React from 'react';

interface ResultStatusProps {
  value: string;
}

export default function ResultStatus({ value }: ResultStatusProps): JSX.Element {
  switch (value) {
    case 'success':
      return <Check color="#39ff14" />;
    case 'failure':
      return <X color="#ff073a" />;
    case 'pending':
      return <Loader color="#FF4105" />;
    default:
      return <></>;
  }
}
