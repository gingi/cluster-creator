import * as React from "react";
import { Component } from "react";
import ClusterSection, { ClusterSectionType } from "./ClusterSection";
import Cluster from "./models/Cluster";

export interface IClusterBuilderProps {
    cluster: Cluster;
}

export default class ClusterBuilder extends Component<IClusterBuilderProps, {}> {
    public render() {
        const { cluster } = this.props;
        return (
            <>
                <div className="ms-Grid-row">
                    <ClusterSection
                        type={ClusterSectionType.SCHEDULER}
                        value={cluster.scheduler}
                    />
                </div>
                <div className="ms-Grid-row">
                    <ClusterSection
                        type={ClusterSectionType.HEAD_NODE}
                        value={cluster.headNodes[0]}
                        details={[
                            "2 vCPUs",
                            "Networking [IP Vnet]"
                        ]}
                    />
                </div>
                <div className="ms-Grid-row">
                    <ClusterSection
                        type={ClusterSectionType.COMPUTE_NODE}
                        value={cluster.computeNodes[0]}
                    />
                </div>
            </>
        )
    }
}