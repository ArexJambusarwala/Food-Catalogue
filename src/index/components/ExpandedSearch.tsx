import React, { useState } from 'react';
import '../styles/expandedsearch.css'
import StickySearch from './StickySearch'
import ResultItems from './ResultItems'

const ExpandedSearch = React.memo(() => {
    const [expandedSearchWrapperDisplay, setExpandedSearchWrapperDisplay] = useState("block");
    const [resultItemsOpacity, setResultItemsOpacity] = useState(1);
    return(
        <div id="expanded-search-wrapper" style = {{display: expandedSearchWrapperDisplay}}>
            <StickySearch setExpandedSearchWrapperDisplay = {setExpandedSearchWrapperDisplay} 
                setResultItemsOpacity = {setResultItemsOpacity}/>
            <ResultItems resultItemsOpacity = {resultItemsOpacity}/>
        </div>
    )
});

export default ExpandedSearch