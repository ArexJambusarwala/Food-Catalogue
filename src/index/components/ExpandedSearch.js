import React, { useCallback, useRef, useState } from 'react';
import '../styles/expandedsearch.css'
import StickySearch from './StickySearch'
import ResultItems from './ResultItems'

const ExpandedSearch = React.memo(() => {
    const ExpandedSearchWrapper = useRef(null);
    const [resultItemsOpacity, setResultItemsOpacity] = useState(1);
    const showExpandedSearchWrapper = useCallback(() => {
        ExpandedSearchWrapper.current.style.display = "block";
    }, []);
    const hideExpandedSearchWrapper = useCallback(() => {
        ExpandedSearchWrapper.current.style.display = "none";
    }, []);
    return(
        <div id="expanded-search-wrapper" ref={ExpandedSearchWrapper}>
            <StickySearch showExpandedSearchWrapper={showExpandedSearchWrapper} 
                hideExpandedSearchWrapper={hideExpandedSearchWrapper} 
                setResultItemsOpacity={setResultItemsOpacity}/>
            <ResultItems resultItemsOpacity={resultItemsOpacity}/>
        </div>
    )
});

export default ExpandedSearch;