import { Action } from "redux";
import { EDIT_SCHEDULER } from "./actions";
import Cluster from "./models/Cluster";

const initialState = {
    cluster: new Cluster()
};

const reducers = [
    function clusterCreator(state = initialState, action: Action) {
        switch (action.type) {
            case EDIT_SCHEDULER:
                return Object.assign({}, state, {
                    cluster: {
                        ...state.cluster,
                        // tslint:disable-next-line: no-string-literal
                        ...action["scheduler"]
                    }
                });
            default:
                return state;
        }
    }
];

export default reducers[0];