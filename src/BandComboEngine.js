import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

import { processBirds, getCriteria, filterBirds } from './engine/helpers';
import {
  generateTypeaheadOptions,
  ColourBlock,
  generateTypeaheadToken,
  generateTypeaheadMenuItemChildren,
} from './engine/typeahead';
import './BandComboEngine.css';

const API_URL = `https://data.keadatabase.nz/birds/?page_size=10000`;

// TODO: move list processing out of render to reduce workload
// TODO: store results with localForage, only refresh if manually refreshed or older than 1 hour
// TODO: store search state in URL as queryString
// TODO: implement on kākā db

const Bird = ({ bird }) => (
  <div className="col-md-3">
    <div className="card mb-3">
      <div className="card-body">
        <div className="card-text">
          <small>{bird.slug}</small>
          <h2 className="h5">{bird.name}</h2>
          <h3 className="h6">{bird.band_combo}</h3>
          <p>
            {bird.primary_band} &middot; {bird.study_area}
          </p>
          <dl className="mb-0">
            {bird.colours && (
              <>
                <dt>Colours</dt>
                {bird.colours.map(colour => (
                  <dd key={colour} className="mr-2 d-inline-block">
                    <ColourBlock key={colour} colour={colour} />
                  </dd>
                ))}
              </>
            )}
            {bird.symbols && (
              <>
                <dt>Symbols</dt>
                {bird.symbols.map(symbol => (
                  <dd key={symbol} className="mr-2 d-inline-block">
                    {symbol}
                  </dd>
                ))}
              </>
            )}
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const Birds = ({ birds }) => (
  <div className="Birds">
    <div className="row">
      {birds.map(bird => (
        <Bird key={bird.slug} bird={bird} />
      ))}
    </div>
  </div>
);

class BandComboEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  componentDidMount() {
    this.props.lazyFetchBirds();
  }

  render() {
    if (this.props.birdsFetch) {
      const { birdsFetch, ...others } = this.props;
      const { selected } = this.state;

      if (birdsFetch.pending) {
        return <span>Loading</span>;
      } else if (birdsFetch.rejected) {
        return <span>Error</span>;
      } else if (birdsFetch.fulfilled) {
        const birds = processBirds(birdsFetch.value.results);
        const criteria = getCriteria(birds);
        const options = generateTypeaheadOptions(criteria);
        const filteredBirds = selected.length > 0 ? filterBirds(birds, selected) : birds;

        return (
          <>
            <button onClick={this.props.lazyFetchBirds} className="btn btn-primary mb-3">
              Refresh
            </button>
            <div className="card mb-3">
              <div className="card-body">
                <div className="card-text">
                  <dl className="mb-0">
                    <dt>Colours</dt>
                    {criteria.colours.map(colour => (
                      <dd key={colour} className="mr-2 d-inline-block">
                        <ColourBlock key={colour} colour={colour} />
                      </dd>
                    ))}
                    <dt>Symbols</dt>
                    {criteria.symbols.map(symbol => (
                      <dd key={symbol} className="mr-2 d-inline-block">
                        {symbol}
                      </dd>
                    ))}
                    <dt>Study Areas</dt>
                    {criteria.studyAreas.map(studyArea => (
                      <dd key={studyArea} className="mr-2 d-inline-block">
                        {studyArea}
                      </dd>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
            <Typeahead
              className="BirdTypeahead mb-3"
              options={options}
              selectHintOnEnter
              highlightOnlyResult
              name="bird"
              placeholder="Type band symbol, colour, name or primary (metal) band"
              id="bird"
              ignoreDiacritics={false}
              maxResults={100}
              paginationText="Display more…"
              multiple
              selected={selected}
              onChange={selected => this.setState({ selected: selected })}
              labelKey={option => option.label}
              renderToken={(...props) => generateTypeaheadToken(...props)}
              renderMenuItemChildren={(...props) => generateTypeaheadMenuItemChildren(...props)}
            />
            <Birds birds={filteredBirds} {...others} />
          </>
        );
      }
    } else return null;
  }
}

export default connect(props => ({
  lazyFetchBirds: () => ({
    birdsFetch: { url: `${API_URL}`, force: true },
  }),
}))(BandComboEngine);
