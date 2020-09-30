import React from 'react';
import PlacesAutocomplete, { PropTypes } from 'react-places-autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocationOnIcon from '@material-ui/icons/LocationOn';

type Props = Omit<PropTypes, 'children'>;

export const AddressAutoComplete: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <PlacesAutocomplete {...props}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Grid classes={{ root: classes.full }}>
          <TextField
            classes={{ root: classes.full }}
            variant="outlined"
            label="Location"
            InputLabelProps={{ shrink: !!props.value }}
            {...getInputProps({
              placeholder: 'Enter Address...',
            })}
            InputProps={{
              autoComplete: 'hidden',
              endAdornment: !loading ? null : (
                <InputAdornment position="end">
                  <CircularProgress size={25} />
                </InputAdornment>
              ),
            }}
          />
          <Grid
            container
            alignItems="center"
            justify="center"
            classes={{ root: classes.suggestionBox }}
          >
            {suggestions.map((suggestion) => {
              const style = suggestion.active
                ? { backgroundColor: '#f7f7f7', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <Grid
                  classes={{ root: classes.options }}
                  container
                  alignItems="center"
                  justify="center"
                  {...getSuggestionItemProps(suggestion, { style })}
                >
                  <Grid item>
                    <LocationOnIcon className={classes.icon} />
                  </Grid>
                  <Grid item xs>
                    <Typography>{suggestion.description}</Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
    </PlacesAutocomplete>
  );
};

const useStyles = makeStyles((theme) => ({
  full: {
    width: '100%',
  },
  suggestionBox: {
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 20,
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
