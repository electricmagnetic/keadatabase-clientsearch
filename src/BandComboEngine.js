import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { Typeahead, MenuItem, Menu, Token, ClearButton } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

import { getValidatedTokens } from './nzbbtef/nzbbtef';
import colourLibrary from './nzbbtef/colours/library';

const API_URL = `http://localhost:8000/band_combos/`;

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

const BandCombo = ({ bandCombo }) => (
  <div className="col-md-3">
    <div className="card mb-3">
      <div className="card-body">
        <div className="card-text">
          <small>{bandCombo.bird}</small>
          <h2 className="h5">{bandCombo.name}</h2>
          <dl className="mb-0">
            {bandCombo.colours && (
              <>
                <dt>Colours</dt>
                {bandCombo.colours.map(colour => (
                  <dd key={colour} className="mr-2 d-inline-block">
                    <ColourBlock key={colour} colour={colour} />
                  </dd>
                ))}
              </>
            )}
            {bandCombo.symbols && (
              <>
                <dt>Symbols</dt>
                {bandCombo.symbols.map(symbol => (
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

const BandCombos = ({ bandCombos }) => (
  <div className="BandCombos">
    <div className="row">
      {bandCombos.map(bandCombo => (
        <BandCombo key={bandCombo.bird} bandCombo={bandCombo} />
      ))}
    </div>
  </div>
);

const flatten = array =>
  array && array.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

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

class BandComboEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  componentDidMount() {
    this.props.lazyFetchBandCombos();
  }

  render() {
    if (this.props.bandCombosFetch) {
      const { bandCombosFetch, ...others } = this.props;
      if (bandCombosFetch.pending) {
        return <span>Loading</span>;
      } else if (bandCombosFetch.rejected) {
        return <span>Error</span>;
      } else if (bandCombosFetch.fulfilled) {
        const bandCombos = bandCombosFetch.value.map(bandCombo => {
          const tokens = getValidatedTokens(bandCombo.name);
          const flattenedTokens = flattenTokens(tokens);

          return Object.assign(
            {},
            bandCombo,
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

        const allTokens = flatten(bandCombos.map(bandCombo => bandCombo.flattenedTokens));
        const symbols = getSymbols(allTokens).sort();
        const colours = getColours(allTokens).sort();

        const options = []
          .concat(symbols.map(symbol => Object.assign({}, { symbol: symbol, label: symbol }, {isSymbol: true, isColour: false})))
          .concat(colours.map(colour => Object.assign({}, { colour: colour }, {isColour: true, isSymbol: false}, colourLibrary[colour])));

        const filteredBandCombos = bandCombos.filter(bandCombo => (
          this.state.selected.length > 0 ? this.state.selected.reduce((accumulator, currentValue) => {
            if (currentValue.isColour && bandCombo.colours) return (bandCombo.colours.includes(currentValue.colour)) && accumulator;
            else if (currentValue.isSymbol && bandCombo.symbols) return (bandCombo.symbols.includes(currentValue.symbol)) && accumulator;
            else return accumulator;
          }, true) : true
        ))

        return (
          <>
            <button onClick={this.props.lazyFetchBandCombos} className="btn btn-primary mb-3">Refresh</button>
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
                  </dl>
                </div>
              </div>
            </div>
            <Typeahead
              className="BandComboTypeahead mb-3"
              options={options}
              selectHintOnEnter
              highlightOnlyResult
              name="bandCombo"
              placeholder="Type band symbol or colour"
              id="bandCombo"
              ignoreDiacritics={false}
              maxResults={100}
              paginationText="Display more…"
              multiple
              selected={this.state.selected}
              onChange={selected => this.setState({selected: selected})}
              renderToken={(option, props, index) => {
                if(option.isColour) return <Token onRemove={props.onRemove} option={option} key={index} className="token-colour"><ColourBlock colour={option.colour} /></Token>;
                else if (option.isSymbol) return <Token onRemove={props.onRemove} option={option} key={index} className="token-symbol"><strong>{option.label}</strong></Token>;
                else return <Token onRemove={props.onRemove} option={option}><>{option}</></Token>;
              }}
              renderMenuItemChildren={(option, props, index) => {
                if (option.isColour) return <><ColourBlock colour={option.colour} /><small className="ml-2">(Colour)</small></>;
                else if (option.isSymbol) return <>{ option.label }<small className="ml-2">(Symbol)</small></>;
                else return <>{option}</>;
              }}
            />
            <BandCombos bandCombos={filteredBandCombos} {...others} />
          </>
        );
      }
    } else return null;
  }
}

export default connect(props => ({
  lazyFetchBandCombos: () => ({
    bandCombosFetch: { url: `${API_URL}`, force: true },
  }),
}))(BandComboEngine);
