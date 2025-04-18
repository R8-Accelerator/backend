import React from 'react';
import { Box } from '@strapi/design-system/Box';
import { Checkbox } from '@strapi/design-system/Checkbox';
import { useIntl } from 'react-intl';

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
        Own data only
      </Checkbox>
    </Box>
  );
};

export default OwnDataOnlyField;
