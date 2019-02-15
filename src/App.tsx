import { FluentCustomizations } from "@uifabric/fluent-theme";
import { initializeIcons } from "@uifabric/icons";
import { Customizer } from "office-ui-fabric-react";
import * as React from "react";
import "../node_modules/office-ui-fabric-react/dist/css/fabric.css";
import "./App.css";
import ClusterBuilder from "./ClusterBuilder";
import Layout from "./layout/Layout";
import Cluster from "./models/Cluster";

initializeIcons();



export default class App extends React.Component {
    private cluster: Cluster;
    constructor(props: any) {
        super(props);
        this.cluster = new Cluster();
    }
    public render() {
        return (
            <Customizer {...FluentCustomizations}>
                <Layout title="Azure CycleCloud">
                    <h1>New Cluster</h1>
                    <ClusterBuilder cluster={this.cluster}/>
                </Layout>
            </Customizer>
        );
    }
}