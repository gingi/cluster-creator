import { PrimaryButton } from "office-ui-fabric-react";
import * as React from "react";
import { connect } from "react-redux";
import { addNode, editNode, editScheduler } from "./actions";
import ClusterSection, { ClusterSectionType } from "./ClusterSection";
import ButtonContainer from "./layout/ButtonContainer";
import Cluster, { ClusterNodeType, IClusterNode } from "./models/Cluster";
import NodeEditor from "./NodeEditor";
import SchedulerSelector from "./SchedulerSelector";

export interface IClusterBuilderProps {
    cluster: Cluster;
}

interface IDispatchProps {
    onAddNode: (node: IClusterNode, type: ClusterNodeType) => void;
    onEditScheduler: (scheduler: string) => void;
    onEditNode:
        (node: IClusterNode, type: ClusterNodeType, index: number) => void;
}

const ClusterBuilderComponent = (props: IClusterBuilderProps & IDispatchProps) => {
    const { cluster, onEditScheduler, onEditNode, onAddNode } = props;
    const makeClusterSection = (args: any) => {
        return <ClusterSection {...args} cluster={cluster} />;
    }

    if (!cluster) {
        return <h3>No cluster defined!</h3>;
    }

    const onEditHeadNode = (node: IClusterNode, index: number) =>
        onEditNode(node, ClusterNodeType.HEAD, index);
    
    const onAddHeadNode = (node: IClusterNode) => {
        onAddNode(node, ClusterNodeType.HEAD);
    }

    const onEditComputeNode = (node: IClusterNode, index: number) =>
        onEditNode(node, ClusterNodeType.COMPUTE, index);

    const onAddComputeNode = (node: IClusterNode) => {
        onAddNode(node, ClusterNodeType.COMPUTE);
    }
    
    return (
        <div className="ms-Grid">
            <div>
                {makeClusterSection({
                    editor: SchedulerSelector,
                    onEdit: onEditScheduler,
                    parameters: [cluster.scheduler],
                    type: ClusterSectionType.SCHEDULER,
                })}
            </div>
            <div>
                {makeClusterSection({
                    editor: NodeEditor,
                    multiple: true,
                    onAdd: onAddHeadNode,
                    onEdit: onEditHeadNode,
                    parameters: cluster.headNodes,
                    type: ClusterSectionType.HEAD_NODE,
                })}
            </div>
            <div>
                {makeClusterSection({
                    editor: NodeEditor,
                    multiple: true,
                    onAdd: onAddComputeNode,
                    onEdit: onEditComputeNode,
                    parameters: cluster.computeNodes,
                    type: ClusterSectionType.COMPUTE_NODE,
                })}
            </div>
            <ButtonContainer>
                <PrimaryButton text="Create Cluster" />
            </ButtonContainer>
            {/*
            <pre>{JSON.stringify(cluster)}</pre>
            */}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return { cluster: state.cluster }
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
    return {
        onAddNode:
            (node: IClusterNode, type: ClusterNodeType) =>
                dispatch(addNode(node, type)),
        onEditNode:
            (node: IClusterNode, type: ClusterNodeType, index: number) =>
                dispatch(editNode(node, type, index)),
        onEditScheduler:
            (scheduler: string) => dispatch(editScheduler(scheduler))
    }
};

const ClusterBuilder = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClusterBuilderComponent);

export default ClusterBuilder;