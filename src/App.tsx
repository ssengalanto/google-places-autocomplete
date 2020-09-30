import './styles/main.css';

import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

export const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid classes={{ root: classes.root }} container alignItems="center" justify="center">
      hello
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    padding: theme.spacing(4),
  },
}));
