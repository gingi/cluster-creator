import { ClusterNodeType, IClusterNode } from "./models/Cluster";

export enum Actions {
    EDIT_SCHEDULER,
    ADD_NODE,
    EDIT_NODE
}

export function editScheduler(scheduler: string) {
    return { type: Actions.EDIT_SCHEDULER, scheduler };
}

export function addNode(node: IClusterNode) {
    return { type: Actions.ADD_NODE, node };
}

export function editNode(
    node: IClusterNode, type: ClusterNodeType, index: number
) {
    return { index, node, nodeType: type, type: Actions.EDIT_NODE };
}