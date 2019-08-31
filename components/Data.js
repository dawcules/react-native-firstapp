import React from 'react';
import {dataFetch} from './Hook';

// https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json

const Data = () => {
  console.log('DATA WAS HERE');
  const [data, loading] = dataFetch('https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json');
  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
          data.json
        )
      }

    </>
  );
};

export default Data;
