import Cluster, { ClusterNodeType, IClusterNode } from "./models/Cluster";
import Subnet from "./models/Subnet";

export type IClusterStateNode = IClusterNode & {
    type: ClusterNodeType;
    subnet: string;
    stateId: string;
};

export interface IClusterState {
    nodes: IClusterStateNode[];
    subnets: Array<{
        name: string;
    }>;
    scheduler: string;
}

export const getSubnetNodes =
(state: IClusterState, subnet: number, type: ClusterNodeType) =>
    state.nodes.filter(node =>
        node.subnet === `${subnet}` && node.type === type
    );

const nodeStateId = (subnet: any, type: ClusterNodeType, index: number) =>
    `id-${subnet}-${type}-${index}`;

export const makeStateNode = (
    node: IClusterNode,
    type: ClusterNodeType,
    subnetId: string,
    index: number): IClusterStateNode =>
    Object.assign({}, node, {
        stateId: nodeStateId(subnetId, type, index),
        subnet: "0",
        type
    });

export const convertToState = (cluster: Cluster) => {
    const state: IClusterState = {
        nodes: [],
        scheduler: cluster.scheduler,
        subnets: cluster.subnets.map(subnet => Object.assign({}, subnet))
    };
    [ClusterNodeType.NODE, ClusterNodeType.NODE_ARRAY].forEach(type =>
        cluster.subnets.forEach((subnet: Subnet, sIndex: number) =>
            subnet.getByType(type).map((node: IClusterNode, nIndex: number) =>
                state.nodes.push(Object.assign({}, node, {
                    stateId: nodeStateId(sIndex, type, nIndex),
                    subnet: `${sIndex}`,
                    type,
                }))
            )
        )
    );
    return state;
};