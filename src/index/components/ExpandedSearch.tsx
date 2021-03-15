import React from 'react';
import '../styles/expandedsearch.css'
import StickySearch from './StickySearch'
import ResultItems from './ResultItems'

export default function ExpandedSearch() {
    return(
        <div id="expanded-search-wrapper">
            <StickySearch />
            <ResultItems />
        </div>
    )
}