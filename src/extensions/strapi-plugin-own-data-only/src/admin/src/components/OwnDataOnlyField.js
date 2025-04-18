import React from 'react';
import { Box } from '@strapi/design-system/Box';
import { Checkbox } from '@strapi/design-system/Checkbox';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

const OwnDataOnlyField = ({ value, onChange, name }) => {
  const { formatMessage } = useIntl();
  
  return (
    <Box paddingTop={2} paddingBottom={2}>
      <Checkbox
        id={name}
        name={name}
        value={value}
        onValueChange={(checked) => {
          onChange({ target: { name, value: checked } });
        }}
      >
        {formatMessage({
          id: 'own-data-only.permission.ownDataOnly',
          defaultMessage: 'Own data only',
        })}
      </Checkbox>
    </Box>
  );
};

OwnDataOnlyField.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

OwnDataOnlyField.defaultProps = {
  value: false,
};

export default OwnDataOnlyField;
