import React from 'react';
import { Checkbox } from '@strapi/design-system/Checkbox';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';

const PermissionsCheckbox = ({ name, value, onChange, ownDataOnly, onOwnDataOnlyChange }) => {
  return (
    <Box padding={2}>
      <Box paddingBottom={2}>
        <Checkbox
          name={name}
          value={value}
          onValueChange={onChange}
        >
          {name}
        </Checkbox>
      </Box>
      {value && (
        <Box paddingLeft={4}>
          <Checkbox
            name={`${name}-own-data-only`}
            value={ownDataOnly}
            onValueChange={onOwnDataOnlyChange}
          >
            Own data only
          </Checkbox>
        </Box>
      )}
    </Box>
  );
};

export default PermissionsCheckbox; 