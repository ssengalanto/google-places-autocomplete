/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useCallback, useState } from 'react';
import { geocodeByAddress } from 'react-places-autocomplete';

import { AddressState } from './AddressInputBox.config';

export type useAddressInputBox = ReturnType<typeof useAddressInputBox>;

const formFields: { [key: string]: keyof google.maps.GeocoderAddressComponent } = {
  street_number: 'short_name',
  route: 'long_name', // addressLine1
  administrative_area_level_1: 'short_name', // state
  locality: 'long_name', // city
  postal_code: 'short_name', // zipCode
};

export const useAddressInputBox = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [addressState, setAddressState] = useState<AddressState>({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    disable: true,
  });

  const handleQueryChange = useCallback(
    (value: string) => {
      if (error) setError('');
      setQuery(value);
    },
    [error],
  );

  const handleAutocompleteError = useCallback((status: string, clearSuggestions: () => void) => {
    if (status === 'ZERO_RESULTS') {
      setError("Hi, seems like we can't autocomplete your address, Please try again.");
      clearSuggestions();
    }

    clearSuggestions();
  }, []);

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { name, value } }) => {
      setAddressState({
        ...addressState,
        [name]: value,
      });
    },
    [addressState],
  );

  const handleAddressSelect = useCallback(
    async (value: string) => {
      const place = await geocodeByAddress(value);

      const fields = place[0].address_components.reduce((acc, cur) => {
        const addressType = cur.types[0];
        if (formFields[addressType]) {
          const val = cur[formFields[addressType]];
          if (val instanceof Array) {
            acc[addressType] = val.join(' ');
          } else {
            acc[addressType] = val;
          }
        }
        return acc;
      }, {} as { [key: string]: string });

      setQuery(value);

      setAddressState({
        ...addressState,
        addressLine1:
          fields.street_number && fields.route ? `${fields.street_number} ${fields.route}` : '',
        city: fields.locality || '',
        state: fields.administrative_area_level_1 || '',
        zipCode: fields.postal_code || '',
        disable: false,
      });
      setError('');
    },
    [addressState],
  );

  return {
    models: { query, addressState, error },
    operations: {
      handleQueryChange,
      handleAddressChange,
      handleAddressSelect,
      handleAutocompleteError,
    },
  };
};
