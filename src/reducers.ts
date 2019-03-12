import { Action } from "redux";
import { Actions } from "./actions";
import { convertToState, IClusterState, makeStateNode } from "./ClusterState";
import { createCluster } from "./models/Cluster";

const createClusterState = (): IClusterState => {
    return convertToState(createCluster());
}

const initialState = createClusterState();

// tslint:disable: no-string-literal
const reducers = [
    function clusterCreator(state = initialState, action: Action) {
        switch (action.type) {
            case Actions.EDIT_SCHEDULER:
                return Object.assign({}, state, {
                    ...action["scheduler"]
                });
            case Actions.EDIT_NODE:
                return Object.assign({}, state, {
                    nodes: state.nodes.map((node: any) => 
                        (node.stateId === action["stateId"] &&
                            node.type === action["nodeType"] &&
                            node.subnet === "0") ?
                            Object.assign({}, node, action["node"]) :
                            node)
                    });
            case Actions.ADD_NODE:
                const count = state.nodes.filter(node =>
                    node.subnet === "0" && node.type === action["nodeType"]
                ).length;
                return Object.assign({}, state, {
                    nodes: state.nodes.concat(makeStateNode(
                        action["node"], action["nodeType"], "0", count
                    ))
                });
            default:
                return state;
        }
    }
];

export default reducers[0];