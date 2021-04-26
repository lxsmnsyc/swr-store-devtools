import { Button, Code, Modal } from '@geist-ui/react';
import React, { useState } from 'react';
import Inspector from './Inspector';

import './InspectorModal.css';

interface InspectorProps {
  cache: string;
  data: any;
}

export default function InspectorModal({ cache, data }: InspectorProps): JSX.Element {
  const [state, setState] = useState(false);
  const handler = () => setState(true);
  const closeHandler = () => {
    setState(false);
  };

  return (
    <>
      <Button auto onClick={handler}>View</Button>
      <Modal open={state} onClose={closeHandler}>
        <Modal.Title><Code>{cache}</Code></Modal.Title>
        <Modal.Content className="ModalContent">
          <Inspector data={data} />
        </Modal.Content>
      </Modal>
    </>
  );
}
