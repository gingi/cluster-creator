import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";
import * as React from "react";
import { connect } from "react-redux";
import { editScheduler } from "./actions";
import ClusterSection, { ClusterSectionType } from "./ClusterSection";
import Cluster from "./models/Cluster";
import NodeEditor from "./NodeEditor";
import SchedulerSelector from "./SchedulerSelector";

export interface IClusterBuilderProps {
    cluster: Cluster;
}

interface IDispatchProps {
    onEditScheduler: (scheduler: string) => void;
}

const ClusterBuilderComponent = (props: IClusterBuilderProps & IDispatchProps) => {
    const { cluster, onEditScheduler } = props;
    const makeClusterSection = (args: any) => {
        return (
            <ClusterSection
                {...args}
                cluster={cluster} />
        );
    }

    if (!cluster) {
        return <h3>No cluster defined!</h3>;
    }

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
                    type: ClusterSectionType.HEAD_NODE,
                    value: cluster.headNodes[0],
                })}
            </div>
            <div className="ms-Grid-row">
                {makeClusterSection({
                    editor: NodeEditor,
                    type: ClusterSectionType.COMPUTE_NODE,
                    value: cluster.computeNodes[0],
                })}
            </div>
            <div className="ms-Grid-row ButtonPanel">
                <div className="ms-Grid-col">
                    <PrimaryButton text="Create Cluster" />
                    <DefaultButton text="Show Template" />
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return { cluster: state.cluster }
};

const mapDispatchToProps = (dispatch: any):IDispatchProps => {
    return {
        onEditScheduler: (scheduler: string) => dispatch(editScheduler(scheduler))
    }
};


const ClusterBuilder = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClusterBuilderComponent);

export default ClusterBuilder;