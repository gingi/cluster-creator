import { Panel, PanelType, PrimaryButton } from "office-ui-fabric-react";
import * as React from "react";
import { Component, SyntheticEvent } from "react";

export interface IClusterSectionEditorProps {
    isOpen: boolean;
    onDismiss: (event: SyntheticEvent<HTMLElement>) => void;
    onSave: () => void;
    headerText: string;
}

export default function ClusterSectionEditor(WrappedEditor: any) {
    return class Editor extends Component<IClusterSectionEditorProps, {}> {
        public render() {
            return (
                <Panel
                    isOpen={this.props.isOpen}
                    type={PanelType.smallFixedFar}
                    onDismiss={this.props.onDismiss}
                    headerText={this.props.headerText}>
                    <WrappedEditor />
                    <PrimaryButton text="Save" onClick={this.onSave}/>
                </Panel>
            );
        }
        private onSave = () => this.props.onSave()
    }
}
