import * as React from "react";
import { ClusterSectionType } from "./ClusterSection";
import { getSubnetNodes, IClusterStateNode } from "./ClusterState";
import { ClusterNodeType } from "./models/Cluster";
import NodeEditor from "./NodeEditor";
import "./SubnetPanel.css";

export const SubnetPanel = (props: any) => {
    const {
        cluster, subnetIndex, subnet, onEditNode, onAddNode, makeClusterSection 
    } = props;

    const sectionTypes = {};
    sectionTypes[ClusterNodeType.NODE] = ClusterSectionType.NODE;
    sectionTypes[ClusterNodeType.NODE_ARRAY] =
        ClusterSectionType.NODE_ARRAY;

    const subnetSection = (type: ClusterNodeType) => {
        const nodes = getSubnetNodes(cluster, subnetIndex, type);
        const onAdd = (node: IClusterStateNode) => onAddNode(node, type);
        const onEdit = (node: any, index: number) => onEditNode(node, type, nodes[index].stateId);
        return makeClusterSection({
            cluster,
            editor: NodeEditor,
            multiple: true,
            onAdd,
            onEdit,
            parameters: nodes,
            type: sectionTypes[type]
        });
    };
    return (
        <div className="SubnetPanel ms-bgColor-neutralLight">
            <div className="SubnetPanel-subnet">Subnet {subnet.name}</div>
            <div>{subnetSection(ClusterNodeType.NODE)}</div>
            <div>{subnetSection(ClusterNodeType.NODE_ARRAY)}</div>
        </div>
    );
};
