import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '500px',
    width: '100%',
    position: 'relative',
  },
  full: {
    width: '100%',
  },
  suggestionBox: {
    position: 'absolute',
  },
  options: {
    padding: theme.spacing(2),
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  input: {
    width: '100%',
    marginTop: 10,
  },
}));
