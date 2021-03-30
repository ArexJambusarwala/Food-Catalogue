export const {toggle} = {
    toggle() {
        return {
            type: 'TOGGLE'
        };
    }
} 

export const selectExpanded = state => state.expanded.isExpanded

export default function slice (state = {isExpanded: false}, action) {
    switch (action.type) {
        case 'TOGGLE':
            return {isExpanded: !state.isExpanded};
        default:
            return state;
    }
}