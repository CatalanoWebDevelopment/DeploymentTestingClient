import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#1769aa',
      secondary: '#2196f3',
      tertiary: '#4dabf5'
    },
  },
});

export default theme;