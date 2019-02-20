import { INode } from "./models/Cluster";

export const EDIT_SCHEDULER = "EDIT_SCHEDULER";
export const ADD_NODE = "ADD_NODE";
export const EDIT_NODE = "EDIT_NODE";

export function editScheduler(scheduler: string) {
    return { type: EDIT_SCHEDULER, scheduler };
}

export function addNode(node: INode) {
    return { type: ADD_NODE, node };
}

export function editNode(node: INode) {
    return { type: EDIT_NODE, node };
}