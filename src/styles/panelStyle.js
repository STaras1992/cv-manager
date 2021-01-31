import { SIDE_PANEL_WIDTH_WIDE, SIDE_PANEL_WIDTH_SHORT, HEADER_MARGIN } from '../consts/measures.js';
import { LIME } from '../consts/colors.js';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', //'flex-start
    alignItems: 'center',
    marginTop: HEADER_MARGIN,
    marginLeft: SIDE_PANEL_WIDTH_SHORT,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  addButtonContainer: {
    marginTop: '50px',
    marginBottom: '50px',
  },
  expanded: {
    marginLeft: `calc(${SIDE_PANEL_WIDTH_WIDE}px + 10px)`,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  loading: {
    textAlign: 'center',
    '& svg': {
      color: LIME,
    },
  },
  hide: {
    display: 'none',
  },
});

export default styles;
