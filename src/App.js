import React, { Component } from 'react';
import { connect } from 'react-refetch';

import BandComboEngine from './BandComboEngine';

const App = () => (
  <main>
    <div className="container my-3">
      <h1>
        Band Combo Engine <small>NZBBTEF PoC</small>
      </h1>
      <BandComboEngine />
    </div>
  </main>
);
export default App;
