import { Button, Code, Modal } from '@geist-ui/react';
import React, { useState } from 'react';
import ReactJson from 'react-json-view';

import './Inspector.css';

interface InspectorProps {
  cache: string;
  data: any;
}

export default function Inspector({ cache, data }: InspectorProps): JSX.Element {
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
          <ReactJson
            theme="bright"
            src={data}
            indentWidth={2}
          />
        </Modal.Content>
      </Modal>
    </>
  );
}
