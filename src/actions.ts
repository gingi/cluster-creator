import { ClusterNodeType, IClusterNode } from "./models/Cluster";

export enum Actions {
    EDIT_SCHEDULER = "EDIT_SCHEDULER",
    ADD_NODE = "ADD_NODE",
    EDIT_NODE = "EDIT_NODE"
}

export function editScheduler(scheduler: string) {
    return { type: Actions.EDIT_SCHEDULER, scheduler };
}

export function addNode(node: IClusterNode, type: ClusterNodeType) {
    return { type: Actions.ADD_NODE, node, nodeType: type };
}

export function
editNode(node: IClusterNode, type: ClusterNodeType, index: number) {
    return { index, node, nodeType: type, type: Actions.EDIT_NODE };
}