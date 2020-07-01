import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Typeahead, Token } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

import { getValidatedTokens } from './nzbbtef/nzbbtef';
import colourLibrary from './nzbbtef/colours/library';
import './BandComboEngine.css';

const API_URL = `https://data.keadatabase.nz/birds/?page_size=10000`;

// TODO: move list processing out of render to reduce workload
// TODO: store results with localForage, only refresh if manually refreshed or older than 1 hour
// TODO: store search state in URL as queryString
// TODO: implement on kākā db

const ColourBlock = ({ colour }) => (
  <>
    <div
      className="d-inline-block mr-1"
      style={{
        background: colourLibrary[colour].value,
        width: 10,
        height: 10,
        border: '1px solid #000',
      }}
    />
    {colourLibrary[colour].label}
  </>
);

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

const flattenTokens = tokens =>
  tokens &&
  tokens.reduce(
    (accumulator, tokens) =>
      accumulator.concat((tokens.tokens && flattenTokens(tokens.tokens)) || tokens),
    []
  );

const getColours = tokens => [
  ...new Set(tokens.filter(token => token && token.isColourToken).map(token => token.value)),
];

const getSymbols = tokens => [
  ...new Set(tokens.filter(token => token && token.type === 'symbol').map(token => token.value)),
];

const getNames = birds => birds.filter(bird => bird.name).map(bird => bird.name);

const getPrimaryBands = birds =>
  birds.filter(bird => bird.primary_band).map(bird => bird.primary_band);

const getStudyAreas = birds => [
  ...new Set(birds.filter(bird => bird.study_area).map(bird => bird.study_area)),
];

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
      if (birdsFetch.pending) {
        return <span>Loading</span>;
      } else if (birdsFetch.rejected) {
        return <span>Error</span>;
      } else if (birdsFetch.fulfilled) {
        const birds = birdsFetch.value.results
          .filter(bird => bird.band_combo !== null)
          .map(bird => {
            const tokens = getValidatedTokens(bird.band_combo);
            const flattenedTokens = flattenTokens(tokens);

            return Object.assign(
              {},
              bird,
              {
                tokens: tokens,
                flattenedTokens: flattenTokens(tokens),
              },
              tokens && {
                colours: getColours(flattenedTokens),
                symbols: getSymbols(flattenedTokens),
              }
            );
          });

        const allTokens = birds.map(bird => bird.flattenedTokens).flat();

        // Derived from tokens (part of band combo)
        const symbols = getSymbols(allTokens).sort();
        const colours = getColours(allTokens).sort();

        // Derived from birds (not part of band combo)
        const names = getNames(birds).sort();
        const primaryBands = getPrimaryBands(birds).sort();
        const studyAreas = getStudyAreas(birds).sort();

        const optionTypes = {
          isColour: false,
          isSymbol: false,
          isName: false,
          isPrimaryBand: false,
          isStudyArea: false,
        };

        const options = []
          .concat(
            colours.map(colour =>
              Object.assign(
                {},
                { colour: colour },
                optionTypes,
                { isColour: true },
                colourLibrary[colour]
              )
            )
          )
          .concat(
            symbols.map(symbol =>
              Object.assign({}, { symbol: symbol, label: symbol }, optionTypes, { isSymbol: true })
            )
          )
          .concat(
            names.map(name =>
              Object.assign({}, { name: name, label: name }, optionTypes, { isName: true })
            )
          )
          .concat(
            primaryBands.map(primaryBand =>
              Object.assign({}, { primaryBand: primaryBand, label: primaryBand }, optionTypes, {
                isPrimaryBand: true,
              })
            )
          )
          .concat(
            studyAreas.map(studyArea =>
              Object.assign({}, { studyArea: studyArea, label: studyArea }, optionTypes, {
                isStudyArea: true,
              })
            )
          );

        const filteredBirds =
          this.state.selected.length === 0
            ? birds
            : birds.filter(bird =>
                this.state.selected.every(criteria => {
                  if (criteria.isColour && bird.colours)
                    return bird.colours.includes(criteria.colour);
                  if (criteria.isSymbol && bird.symbols)
                    return bird.symbols.includes(criteria.symbol);
                  if (criteria.isName && bird.name) return criteria.name === bird.name;
                  if (criteria.isPrimaryBand && bird.primary_band)
                    return criteria.primaryBand === bird.primary_band;
                  if (criteria.isStudyArea && bird.study_area)
                    return criteria.studyArea === bird.study_area;
                  return false;
                })
              );

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
                    {colours.map(colour => (
                      <dd key={colour} className="mr-2 d-inline-block">
                        <ColourBlock key={colour} colour={colour} />
                      </dd>
                    ))}
                    <dt>Symbols</dt>
                    {symbols.map(symbol => (
                      <dd key={symbol} className="mr-2 d-inline-block">
                        {symbol}
                      </dd>
                    ))}
                    <dt>Study Areas</dt>
                    {studyAreas.map(studyArea => (
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
              selected={this.state.selected}
              onChange={selected => this.setState({ selected: selected })}
              labelKey={option => option.label}
              renderToken={(option, props, index) => {
                if (option.label)
                  return (
                    <Token
                      onRemove={props.onRemove}
                      option={option}
                      key={index}
                      className={
                        (option.isColour && 'token-colour') ||
                        (option.isSymbol && 'token-symbol') ||
                        (option.isName && 'token-name') ||
                        (option.isPrimaryBand && 'token-primaryBand') ||
                        (option.isStudyArea && 'token-studyArea')
                      }
                    >
                      {option.isColour ? <ColourBlock colour={option.colour} /> : option.label}
                    </Token>
                  );
                else
                  return (
                    <Token onRemove={props.onRemove} option={option}>
                      <>{option}</>
                    </Token>
                  );
              }}
              renderMenuItemChildren={(option, props, index) => {
                if (option.label)
                  return (
                    <>
                      {option.isColour ? <ColourBlock colour={option.colour} /> : option.label}
                      <small className="ml-2">
                        (
                        {(option.isColour && 'Colour') ||
                          (option.isSymbol && 'Symbol') ||
                          (option.isName && 'Name') ||
                          (option.isPrimaryBand && 'Primary Band') ||
                          (option.isStudyArea && 'Study Area')}
                        )
                      </small>
                    </>
                  );
                else return <>{option}</>;
              }}
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
