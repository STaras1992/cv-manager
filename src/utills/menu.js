import FileIcon from '@material-ui/icons/InsertDriveFile';
import SubjectIcon from '@material-ui/icons/Subject';
import EventNoteIcon from '@material-ui/icons/EventNote';

const menuItems = [
  { name: 'My CV', icon: <FileIcon /> },
  { name: 'My summarys', icon: <SubjectIcon /> },
  { name: 'My templates', icon: <EventNoteIcon /> },
];

export const getMenuItems = () => {
  return menuItems;
};
