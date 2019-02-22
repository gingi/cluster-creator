import { Action } from "redux";
import { Actions } from "./actions";
import Cluster, { ClusterNodeType, IClusterNode } from "./models/Cluster";

const initialState = { cluster: new Cluster() };

const nodeType = (type: ClusterNodeType): string => {
    switch (type) {
        case ClusterNodeType.COMPUTE: return "computeNodes";
        case ClusterNodeType.HEAD: return "headNodes";
    }
}

// tslint:disable: no-string-literal
const reducers = [
    function clusterCreator(state = initialState, action: Action) {
        switch (action.type) {
            case Actions.EDIT_SCHEDULER:
                return Object.assign({}, state, {
                    cluster: {
                        ...state.cluster,
                        ...action["scheduler"]
                    }
                });
            case Actions.EDIT_NODE:
                const nType = nodeType(action["nodeType"]);
                return Object.assign({}, state, {
                    cluster: {
                        ...state.cluster,
                        [nType]: state.cluster[nType].map(
                            (node: IClusterNode, index: number) => {
                                if (index === action["index"]) {
                                    return Object.assign({}, node,
                                        action["node"]);
                                }
                                return node;
                            }
                        )
                    }
                });
            case Actions.ADD_NODE:
                const nType2 = nodeType(action["nodeType"]);
                return Object.assign({}, state, {
                    cluster: {
                        ...state.cluster,
                        [nType2]: state.cluster[nType2].concat(action["node"])
                    }
                });
            default:
                return state;
        }
    }
];

export default reducers[0];