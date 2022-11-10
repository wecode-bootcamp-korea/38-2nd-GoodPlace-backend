const distanceFormulaForQuery = ( latitude, longitude ) => {
  const DISTANCE_FORMULA_QUERY = `(6371 * acos( cos( radians( ${latitude} ) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( ${longitude} ) ) + sin( radians( ${latitude} ) ) * sin( radians( latitude ) ) ) ) AS distance`;

  return DISTANCE_FORMULA_QUERY;
}

const filterByOptionForQuery = ( optionArray ) => {
  const conversionRegex = optionArray.sort( (a,b) => a-b ).toString().replaceAll(",", ".*");

  if ( optionArray.length === 0 ) {
    return ``;
  } else {
    return `AND REGEXP_LIKE(option_array, '${conversionRegex}')`;
  }
}

const filterBySearchWordForQuery = ( searchWord ) => {
  const filterOfSearchWord = searchWord === 'default' ? `` : `AND (name LIKE '%${searchWord}%' OR address LIKE '%${searchWord}%')`;

  return filterOfSearchWord;
}

const sortByOptionForQuery = ( option ) => {

  const queryOfSortOption = {
    'ascPrice' : `, time_price ASC`,
    'descPrice' : `, time_price DESC`,
    'ascDistance' : `, distance ASC`,
    'descDistance' : `, distance DESC`,
    'default' : ``
  }
  
  return queryOfSortOption[option];
}

const sortByPremiumForQuery = ( option, query ) => {
  const DELETE_COMMA_OF_QUERY = 2;

  const queryOfSortOption = {
    'ascPremium' : `ORDER BY is_premium ASC ${query}`,
    'descPremium' : `ORDER BY is_premium DESC ${query}`,
    'default' : `ORDER BY ${query.slice(DELETE_COMMA_OF_QUERY)}`
  }

  if ( option === 'default' && query === `` ) {
    queryOfSortOption[option] = ``;
  }

  return queryOfSortOption[option];
}

module.exports ={
  distanceFormulaForQuery,
  filterByOptionForQuery,
  sortByOptionForQuery,
  sortByPremiumForQuery,
  filterBySearchWordForQuery
}