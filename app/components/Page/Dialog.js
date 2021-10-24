/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@bootstrap-styled/v4';

export default function Dialog(props) {
  return (
    <React.Fragment>
      <Modal isOpen={props.isShowDialog}>
        <ModalHeader toggle={props.closeHandler}>
          {props.dialogHeader}
        </ModalHeader>
        <ModalBody>
          {props.dialogConfirm}
          {props.dialogContent.map((content, i) => (
            <Content key={i} label={content.label} value={content.value} />
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={props.okHandler}>
            Ok
          </Button>
          <Button color="secondary" onClick={props.closeHandler}>
            Cancle
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

function Content(props) {
  return (
    <React.Fragment>
      <br />
      <label>{props.label}:&nbsp;</label>
      <span>{props.value}</span>
    </React.Fragment>
  );
}
