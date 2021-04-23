import { Code, Loading, Table } from '@geist-ui/react';
import React from 'react';
import { useSWRStore } from 'react-swr-store';
import Inspector from './Inspector';
import ResultStatus from './ResultStatus';
import TimeIndicator from './TimeIndicator';
import data from './utils/data-store';
import keys from './utils/key-store';
import { Field } from './utils/read-memory';

function transformData(currentData: Field[]) {
  return currentData
    .slice()
    .sort((prev, next) => next.value.timestamp - prev.value.timestamp)
    .map((value) => ({
      key: <Code>{value.key}</Code>,
      status: <ResultStatus value={value.value.result.status} />,
      data: <Inspector cache={value.key} data={value.value.result} />,
      age: <TimeIndicator value={value.value.timestamp} />,
      validating: value.value.isValidating ? <Loading /> : null,
      listeners: <Code>{value.value.listeners}</Code>,
    }));
}

export default function SWRTable(): JSX.Element {
  const currentKeys = useSWRStore(keys, [], {
    suspense: true,
  });
  const currentData = useSWRStore(data, currentKeys, {
    suspense: true,
  });

  return (
    <Table data={transformData(currentData)}>
      <Table.Column label="key" prop="key" />
      <Table.Column label="status" prop="status" />
      <Table.Column label="data" prop="data" />
      <Table.Column label="age" prop="age" />
      <Table.Column label="validating" prop="validating" />
      <Table.Column label="listeners" prop="listeners" />
    </Table>
  );
}
