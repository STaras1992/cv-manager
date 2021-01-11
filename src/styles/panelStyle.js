import { SIDE_PANEL_WIDTH_WIDE, SIDE_PANEL_WIDTH_SHORT, HEADER_MARGIN } from '../consts/measures.js';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: HEADER_MARGIN,
    marginLeft: SIDE_PANEL_WIDTH_SHORT,
    '& .MuiListItem-root': {},
    // [theme.breakpoints.down('xs')]: {
    //   marginLeft: '70px',
    // },
  },
  addButtonContainer: {
    marginTop: '50px',
  },
  expanded: {
    marginLeft: `calc(${SIDE_PANEL_WIDTH_WIDE}px + 10px)`,
    [theme.breakpoints.down('xs')]: {
      marginLeft: SIDE_PANEL_WIDTH_SHORT,
    },
  },
});

export default styles;
