import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { Divider, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type CSSObject, type Theme, styled } from '@mui/material/styles';
import { ScrollableStack } from './ScrollableStack';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';
import { useSession } from 'next-auth/react';

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

function SidebarItem({
  href,
  label,
  icon
}: {
  href: string;
  label?: string;
  icon: ReactNode;
}) {
  return (
    <Link rel='noopener noreferrer' href={href}>
      <ListItemButton
        sx={{
          minHeight: 48,
          px: 2.5
        }}
      >
        <Box mr={2}>{icon}</Box>
        {label && (
          <ListItemText
            primary={<Typography fontWeight={600}>{label}</Typography>}
            disableTypography
            color='secondary'
          />
        )}
      </ListItemButton>
    </Link>
  );
}

export default function SideBar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const { data: sessionData } = useSession();

  function closeSidebar() {
    setShowSidebar(false);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant='permanent' open={showSidebar}>
        <ScrollableStack>
          <List>
            <Stack
              direction={!showSidebar ? 'column' : 'row-reverse'}
              alignItems='center'
            >
              <IconButton
                onClick={() => {
                  setShowSidebar(!showSidebar);
                }}
              >
                {!showSidebar ? (
                  <MenuIcon
                    sx={{
                      my: 1
                    }}
                  />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
              {!showSidebar && <Divider sx={{ width: '100%', mb: 2 }} />}
            </Stack>
            {showSidebar && (
              <Stack
                sx={{
                  alignItems: 'center'
                }}
              >
                {sessionData && <Typography
                  color='primary'
                  fontWeight='bold'
                  variant='h6'
                  display='block'
                >
                  {sessionData.user?.name}
                </Typography>}
                {sessionData && <Typography
                  color='secondary'
                  display='block'
                  fontWeight={500}
                  variant='subtitle1'
                >
                  {sessionData.user?.name}
                </Typography>}
                
              </Stack>
            )}
          </List>
          <Stack my={1}>
            <Tooltip title='Add Quiz' placement='right'>
              <ListItem disablePadding onClick={closeSidebar}>
                <SidebarItem
                  href='/create-quiz'
                  label={showSidebar ? 'Add Quiz' : undefined}
                  icon={<AddOutlinedIcon color='primary' />}
                />
              </ListItem>
            </Tooltip>

            <Tooltip title='Import Quiz' placement='right'>
              <ListItem disablePadding onClick={closeSidebar}>
              </ListItem>
            </Tooltip>

            <Tooltip title='My Quizzes' placement='right'>
              <ListItem disablePadding onClick={closeSidebar}>
                <SidebarItem
                  href='/my-quizzes'
                  label={showSidebar ? 'My Quizzes' : undefined}
                  icon={<QuizOutlinedIcon color='primary' />}
                />
              </ListItem>
            </Tooltip>

            <Tooltip title='Account Setting' placement='right'>
              <ListItem disablePadding onClick={closeSidebar}>
                <SidebarItem
                  href='/settings?tab=account'
                  label={showSidebar ? 'Account' : undefined}
                  icon={<SettingsOutlinedIcon color='primary' />}
                />
              </ListItem>
            </Tooltip>

            <Tooltip title='My Reports' placement='right'>
              <ListItem disablePadding onClick={closeSidebar}>
                <SidebarItem
                  href='/my-reports'
                  label={showSidebar ? 'My Reports' : undefined}
                  icon={<AssessmentOutlinedIcon color='primary' />}
                />
              </ListItem>
            </Tooltip>

            <Tooltip title='My Collections' placement='right'>
              <ListItem disablePadding onClick={closeSidebar}>
                <SidebarItem
                  href='/my-collections'
                  label={showSidebar ? 'My Collections' : undefined}
                  icon={<FolderOutlinedIcon color='primary' />}
                />
              </ListItem>
            </Tooltip>

            <Tooltip title='My Groups' placement='right'>
              <ListItem disablePadding onClick={closeSidebar}>
                <SidebarItem
                  href='/my-groups'
                  label={showSidebar ? 'My Groups' : undefined}
                  icon={<GroupOutlinedIcon color='primary' />}
                />
              </ListItem>
            </Tooltip>

            <Tooltip title='My Notifications' placement='right'>
              <ListItem disablePadding onClick={closeSidebar}>
                <SidebarItem
                  href='/my-notifications'
                  label={showSidebar ? 'My Notifications' : undefined}
                  icon={<NotificationsOutlinedIcon color='primary' />}
                />
              </ListItem>
            </Tooltip>
          </Stack>
        </ScrollableStack>
      </Drawer>
    </Box>
  );
}
