import { PrimaryButton } from "office-ui-fabric-react";
import * as React from "react";
import { connect } from "react-redux";
import { editNode, editScheduler } from "./actions";
import ClusterSection, { ClusterSectionType } from "./ClusterSection";
import ButtonContainer from "./layout/ButtonContainer";
import Cluster, { ClusterNodeType, IClusterNode } from "./models/Cluster";
import NodeEditor from "./NodeEditor";
import SchedulerSelector from "./SchedulerSelector";

export interface IClusterBuilderProps {
    cluster: Cluster;
}

interface IDispatchProps {
    onEditScheduler: (scheduler: string) => void;
    onEditNode:
        (node: IClusterNode, type: ClusterNodeType, index: number) => void;
}

const ClusterBuilderComponent = (props: IClusterBuilderProps & IDispatchProps) => {
    const { cluster, onEditScheduler, onEditNode } = props;
    const makeClusterSection = (args: any) => {
        return <ClusterSection {...args} cluster={cluster} />;
    }

    if (!cluster) {
        return <h3>No cluster defined!</h3>;
    }

    const onEditHeadNode =
        (node: IClusterNode) => onEditNode(node, ClusterNodeType.HEAD, 0);

    const onEditComputeNode =
        (node: IClusterNode) => onEditNode(node, ClusterNodeType.COMPUTE, 0);

    return (
        <>
            <div className="ms-Grid-row">
                {makeClusterSection({
                    editor: SchedulerSelector,
                    onEdit: onEditScheduler,
                    type: ClusterSectionType.SCHEDULER,
                    value: cluster.scheduler,
                })}
            </div>
            <div className="ms-Grid-row">
                {makeClusterSection({
                    editor: NodeEditor,
                    onEdit: onEditHeadNode,
                    type: ClusterSectionType.HEAD_NODE,
                    value: cluster.headNodes[0],
                })}
            </div>
            <div className="ms-Grid-row">
                {makeClusterSection({
                    editor: NodeEditor,
                    onEdit: onEditComputeNode,
                    type: ClusterSectionType.COMPUTE_NODE,
                    value: cluster.computeNodes[0],
                })}
            </div>
            <ButtonContainer>
                <PrimaryButton text="Create Cluster" />
            </ButtonContainer>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return { cluster: state.cluster }
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
    return {
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