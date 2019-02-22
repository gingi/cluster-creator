import * as React from "react";

import { CommunicationColors } from "@uifabric/fluent-theme";

import Footer from "./Footer";
import Header from "./Header";

export default class Layout extends React.Component<{title: string}, {}> {
    public render() {
        return (
            <div className="ms-Fabric App ms-Grid" dir="ltr">
                <div className="ms-Grid-row ms-bgColor-themePrimary"
                    style={{
                        backgroundColor: CommunicationColors.primary,
                        color: "white"
                    }}>
                    <Header title={this.props.title} />
                </div>
                <div className="ms-Grid-row">
                    <div className="App-content ms-Grid-col ms-lg12 ms-md12 ms-sm12">
                        {this.props.children}
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <Footer />
                </div>
            </div>
        );
    }
}