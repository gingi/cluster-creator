import { FluentCustomizations } from "@uifabric/fluent-theme";
import { initializeIcons } from "@uifabric/icons";
import { Customizer } from "office-ui-fabric-react";
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/office-ui-fabric-react/dist/css/fabric.css";
import "./App.css";
import ClusterBuilder from "./ClusterBuilder";
import Layout from "./layout/Layout";

initializeIcons();

const App = () => (
    <Router>
        <Customizer {...FluentCustomizations}>
            <Layout title="Azure CycleCloud">
                <Route exact={true} path="/" component={Main}/>
            </Layout>
        </Customizer>                        
    </Router>
)

const Main = () => (<>
    <h1>New Cluster</h1>
    <ClusterBuilder/>
</>);



export default App;
