import React from 'react';
import { Thead, Th, Tbody, Tr } from '@bootstrap-styled/v4';
import StyledTable from 'components/Table';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import NotMappedList from 'containers/NotMappedPage/NotMapped/NotMappedList';
import messages from '../messages';
export default function NotMapped(props) {
  return (
    <React.Fragment>
      <StyledTable>
        <Thead>
          <Tr>
            <Th>
              <FormattedMessage {...messages.sno} />
            </Th>
            <Th>
              {' '}
              <FormattedMessage {...messages.carrier} />
            </Th>
            <Th>
              {' '}
              <FormattedMessage {...messages.awb} />
            </Th>
            <Th>
              <FormattedMessage {...messages.carrierAccount} />
            </Th>
            <Th>
              <FormattedMessage {...messages.fileExtractedDateTime} />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <NotMappedList
            loading={props.loading}
            error={props.error}
            response={props.response}
            rowStart={props.rowStart}
          />
        </Tbody>
      </StyledTable>
    </React.Fragment>
  );
}
NotMapped.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  response: PropTypes.array,
  rowStart: PropTypes.number,
};
