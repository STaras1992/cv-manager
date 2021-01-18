import FileIcon from '@material-ui/icons/InsertDriveFile';
import SubjectIcon from '@material-ui/icons/Subject';
import EventNoteIcon from '@material-ui/icons/EventNote';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';

const menuItems = [
  { name: 'Home', icon: <HomeIcon />, to: '/' },
  { name: 'Send mail', icon: <EmailIcon />, to: '/email' },
  { name: 'My CV', icon: <FileIcon />, to: '/cv' },
  { name: 'My covers', icon: <SubjectIcon />, to: '/cover' },
  { name: 'My templates', icon: <EventNoteIcon />, to: '/template' },
];

export const getMenuItems = () => {
  return menuItems;
};
