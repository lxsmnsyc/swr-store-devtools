import React from 'react';
import { Text } from '@geist-ui/react';
import { formatDistanceToNow } from 'date-fns';

interface TimeIndicatorProps {
  value: number;
}

export default function TimeIndicator({ value }: TimeIndicatorProps): JSX.Element {
  if (value) {
    const message = formatDistanceToNow(new Date(value), {
      includeSeconds: true,
    });

    return <Text small>{message}</Text>;
  }

  return <></>;
}
