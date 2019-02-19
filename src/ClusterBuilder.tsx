import * as React from "react";
import ClusterSection, { ClusterSectionType } from "./ClusterSection";
import Cluster from "./models/Cluster";
import NodeEditor from "./NodeEditor";
import SchedulerSelector from "./SchedulerSelector";

export interface IClusterBuilderProps {
    cluster: Cluster;
}

export default function ClusterBuilder(props: IClusterBuilderProps) {
    const { cluster } = props;
    const handleSave = () => {
        alert("Saved section!");
    }

    const makeClusterSection = (args: any) => {
        return <ClusterSection {...args} onSave={handleSave} />;
    }

    return (
        <>
            <div className="ms-Grid-row">
                {makeClusterSection({
                    editor: SchedulerSelector,
                    type: ClusterSectionType.SCHEDULER,
                    value: cluster.scheduler,
                })}
            </div>
            <div className="ms-Grid-row">
                {makeClusterSection({
                    details: [
                        "2 vCPUs",
                        "Networking [IP Vnet]"
                    ],
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
        </>
    )
}