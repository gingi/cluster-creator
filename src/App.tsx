import * as React from "react";

import { FluentCustomizations } from "@uifabric/fluent-theme";
import { Customizer } from "office-ui-fabric-react";

import Layout from "./layout/Layout";

import "../node_modules/office-ui-fabric-react/dist/css/fabric.css";
import "./App.css";
import ClusterSection from "./ClusterSection";

export default class App extends React.Component {
    public render() {
        return (
            <Customizer {...FluentCustomizations}>
                <Layout title="Azure CycleCloud">
                    <h1>New Cluster</h1>
                    <div className="ms-Grid-row">
                        <ClusterSection
                            name="Scheduler"
                            value="Univa Grid Engine (UGE)"
                            details={["Version 6.2u8"]}
                        />
                    </div>
                    <div className="ms-Grid-row">
                        <ClusterSection
                            name="Head Node"
                            value="DSv3"
                            details={[
                                "2 vCPUs",
                                "Networking [IP Vnet]"
                            ]}
                        />
                    </div>
                    <div className="ms-Grid-row">
                        <ClusterSection
                            name="Compute Node"
                            value="H16R"
                        />
                    </div>
                </Layout>
            </Customizer>
        );
    }
}