import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import toastr from 'toastr';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@bootstrap-styled/v4';
import { Clipboard } from '@styled-icons/fa-regular/Clipboard';

import LoaderIndicator from 'components/Loader';

const ReqCode = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  padding: 15px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  white-space: pre-wrap;
  clear: both;
  margin-top: 10px;
  width: 100%;
`;
const ColHeader = styled.h3`
  clear: both;
  min-height: 20px;
  margin-top: 0;
  & > .btn {
    float: right;
  }
`;
const WCol = styled(Col)`
  && {
    padding-right: 5px;
    padding-left: 5px;
  }
`;
const StyledSpan = styled.span`
  white-space: pre-line;
`;

export default function PopUp({ loading, isShowPopUp, onClose, title, data }) {
  const copyToClipboard = documentTitle => {
    const elm = document.getElementById(documentTitle);
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(elm);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    const message = 'File content copied.';
    toastr.info(message);
  };

  return (
    <React.Fragment>
      <Modal isOpen={isShowPopUp} size="lg">
        <ModalHeader toggle={onClose}> {title} </ModalHeader>
        <ModalBody
          style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}
        >
          <StyledSpan>
            <Row>
              <WCol>
                <ColHeader>
                  {title}
                  <Button
                    data-toggle="tooltip"
                    title="Copy"
                    color="primary"
                    onClick={() => {
                      copyToClipboard('AppRes');
                    }}
                  >
                    <Clipboard size="12" />
                  </Button>
                </ColHeader>
                <ReqCode id="AppRes">
                  {loading === true ? <LoaderIndicator /> : data}
                </ReqCode>
              </WCol>
            </Row>
          </StyledSpan>
        </ModalBody>
        <ModalFooter />
      </Modal>
    </React.Fragment>
  );
}

PopUp.propTypes = {
  loading: PropTypes.bool,
  isShowPopUp: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
