import { Box, Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { HiUpload } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import { ROUTES_PATH } from '~/constants';
import { AuthenticateModal } from '~/features';
import { Logo } from '../Icons';
import PopperMenu from './components/PopperMenu';
import Search from './components/Search';

const Header = ({ t }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <Box className="container">
      {isOpen && <AuthenticateModal isOpen={isOpen} onClose={onClose} />}
      <Box display="flex" justifyContent="space-between" alignItems="center" p="0.5rem 0">
        <Link to={ROUTES_PATH.home}>
          <Logo width="11.8rem" height="5rem" />
        </Link>

        {/* search */}
        <Search />

        {/* actions */}
        <Box display="flex" gap="1.6rem" alignItems="center">
          <Button
            leftIcon={<HiUpload />}
            variant="outline-default"
            sx={{
              '& .chakra-button__icon': {
                mr: '8px',
              },
            }}
          >
            {t('header.action.btn-1')}
          </Button>
          <Button onClick={onOpen}>{t('header.action.btn-2')}</Button>
          <PopperMenu />
        </Box>
      </Box>
    </Box>
  );
};

export default withTranslation()(Header);
