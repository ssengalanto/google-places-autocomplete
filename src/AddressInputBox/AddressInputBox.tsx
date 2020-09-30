import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import { AddressAutoComplete } from './AddressAutoComplete';
import { useAddressInputBox } from './useAddressInputBox';
import { addressInputBoxFields } from './AddressInputBox.config';

export const AddressInputBox: React.FC = () => {
  const classes = useStyles();
  const {
    models: { query, addressState, error },
    operations: {
      handleAddressSelect,
      handleQueryChange,
      handleAddressChange,
      handleAutocompleteError,
    },
  } = useAddressInputBox();

  return (
    <Grid classes={{ root: classes.container }}>
      <AddressAutoComplete
        debounce={300}
        value={query}
        onChange={handleQueryChange}
        onSelect={handleAddressSelect}
        onError={handleAutocompleteError}
      />
      {error && <Typography classes={{ root: classes.error }}>{error}</Typography>}
      {addressInputBoxFields.map(({ name, label, required }) => (
        <Grid item xs={12} key={name}>
          <TextField
            disabled={addressState.disable}
            classes={{ root: classes.input }}
            required={required}
            name={name}
            label={label}
            InputLabelProps={{ shrink: !!addressState[name] }}
            value={addressState[name]}
            onChange={handleAddressChange}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '500px',
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '100%',
    marginTop: 10,
  },
  error: {
    color: 'red',
  },
}));
