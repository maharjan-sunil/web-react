/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@bootstrap-styled/v4';
import history from 'utils/history';

import PageTitle from 'components/PageTitle';
import PageTitleText from 'components/PageTitleText';
import LinkButton from 'components/LinkButton';

export function PageHeader(props) {
  const params = window.location.href.split('?')[1];
  useEffect(() => {
    if (params) {
      props.handler({
        isShowFilter: true,
        filterText: 'Hide Filter',
      });
    }
  }, []);

  return (
    <React.Fragment>
      <PageTitle>
        <PageTitleText>{props.pageTitle}</PageTitleText>
        {props.handler && (
          <Button onClick={props.handler} className="mr-1">
            {props.filterText}
          </Button>
        )}
        {props.createUrl && (
          <React.Fragment>
            <LinkButton tag={Link} to={props.createUrl} className="mr-1">
              Create
            </LinkButton>
          </React.Fragment>
        )}
        {props.editUrl && (
          <React.Fragment>
            <LinkButton tag={Link} to={props.editUrl} className="mr-1">
              Edit
            </LinkButton>
          </React.Fragment>
        )}
        {props.back && (
          <React.Fragment>
            <LinkButton onClick={() => history.goBack()}>Back</LinkButton>
          </React.Fragment>
        )}
      </PageTitle>
    </React.Fragment>
  );
}
