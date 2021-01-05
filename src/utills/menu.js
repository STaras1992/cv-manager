import FileIcon from '@material-ui/icons/InsertDriveFile';
import SubjectIcon from '@material-ui/icons/Subject';
import EventNoteIcon from '@material-ui/icons/EventNote';

const menuItems = [
  { name: 'My CV', icon: <FileIcon />, to: '/cv' },
  { name: 'My summarys', icon: <SubjectIcon />, to: '/cover' },
  { name: 'My templates', icon: <EventNoteIcon />, to: '/template' },
];

export const getMenuItems = () => {
  return menuItems;
};
