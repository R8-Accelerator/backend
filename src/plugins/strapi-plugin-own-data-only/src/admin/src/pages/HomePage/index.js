import React from 'react';
import { ContentLayout, HeaderLayout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { Stack } from '@strapi/design-system/Stack';
import { Card, CardBody, CardHeader, CardContent } from '@strapi/design-system/Card';
import { useIntl } from 'react-intl';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <HeaderLayout
        title={formatMessage({
          id: 'own-data-only.plugin.name',
          defaultMessage: 'Own Data Only',
        })}
        subtitle={formatMessage({
          id: 'own-data-only.plugin.description',
          defaultMessage: 'Restrict users to only access their own data',
        })}
      />
      <ContentLayout>
        <Box padding={8}>
          <Stack spacing={4}>
            <Card>
              <CardHeader>
                <Typography variant="beta">
                  {formatMessage({
                    id: 'own-data-only.homepage.title',
                    defaultMessage: 'How to use the Own Data Only plugin',
                  })}
                </Typography>
              </CardHeader>
              <CardBody>
                <CardContent>
                  <Stack spacing={4}>
                    <Typography>
                      {formatMessage({
                        id: 'own-data-only.homepage.description',
                        defaultMessage:
                          'This plugin adds an "Own Data Only" checkbox to the permissions UI in the Strapi admin panel.',
                      })}
                    </Typography>
                    <Typography>
                      {formatMessage({
                        id: 'own-data-only.homepage.instructions',
                        defaultMessage:
                          'To use this feature, go to Settings > Roles, select a role, and you will see the "Own Data Only" checkbox next to the standard permissions (find, findOne, update, delete).',
                      })}
                    </Typography>
                    <Typography>
                      {formatMessage({
                        id: 'own-data-only.homepage.explanation',
                        defaultMessage:
                          'When enabled, users with this role will only be able to access, modify, or delete their own data.',
                      })}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardBody>
            </Card>
          </Stack>
        </Box>
      </ContentLayout>
    </>
  );
};

export default HomePage;
