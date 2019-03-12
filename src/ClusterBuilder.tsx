import { PrimaryButton } from "office-ui-fabric-react";
import * as React from "react";
import { connect } from "react-redux";
import { addNode, editNode, editScheduler } from "./actions";
import ClusterSection, { ClusterSectionType } from "./ClusterSection";
import { IClusterState } from "./ClusterState";
import ButtonContainer from "./layout/ButtonContainer";
import { ClusterNodeType, IClusterNode } from "./models/Cluster";
import SchedulerSelector from "./SchedulerSelector";
import { SubnetPanel } from "./SubnetPanel";

export interface IClusterBuilderProps {
    cluster: IClusterState;
}

interface IDispatchProps {
    onAddNode: (node: IClusterNode, type: ClusterNodeType) => void;
    onEditScheduler: (scheduler: string) => void;
    onEditNode:
        (node: IClusterNode, type: ClusterNodeType, stateId: string) => void;
}

const ClusterBuilderComponent =
(props: IClusterBuilderProps & IDispatchProps) => {
    const { cluster, onEditScheduler, onEditNode, onAddNode } = props;
    const makeClusterSection = (args: any) => {
        return <ClusterSection {...args} cluster={cluster} />;
    }

    if (!cluster) {
        return <h3>No cluster defined!</h3>;
    }

    return (
        <div className="ms-Grid">
            <div>
                {makeClusterSection({
                    cluster,
                    editor: SchedulerSelector,
                    onEdit: onEditScheduler,
                    parameters: [cluster.scheduler],
                    type: ClusterSectionType.SCHEDULER,
                })}
            </div>
            {cluster.subnets.map((subnet, i) =>
                <SubnetPanel
                    cluster={cluster}
                    subnet={subnet}
                    key={i}
                    subnetIndex={i}
                    onAddNode={onAddNode}
                    onEditNode={onEditNode}
                    makeClusterSection={makeClusterSection}
                />
            )}
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
    return { cluster: state }
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
    return {
        onAddNode:
            (node: IClusterNode, type: ClusterNodeType) =>
                dispatch(addNode(node, type)),
        onEditNode:
            (node: IClusterNode, type: ClusterNodeType, stateId: string) =>
                dispatch(editNode(node, type, stateId)),
        onEditScheduler:
            (scheduler: string) => dispatch(editScheduler(scheduler))
    }
};

const ClusterBuilder = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClusterBuilderComponent);

export default ClusterBuilder;