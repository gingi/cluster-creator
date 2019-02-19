import { IconButton } from "office-ui-fabric-react";
import * as React from "react";
import { useState } from "react";
import "./ClusterSection.css";
import createEditor from "./ClusterSectionEditor";
import Schedulers from "./models/Schedulers";


export enum ClusterSectionType {
    SCHEDULER = "Scheduler",
    HEAD_NODE = "Head Node",
    COMPUTE_NODE = "Compute Node"
}

export interface IClusterSectionProps {
    type: ClusterSectionType;
    value: any;
    details?: string[];
    onSave: () => void;
    editor?: any;
}

interface ISectionConfig {
    name?: string;
    valueRenderer?: (value: any) => string;
    detailRenderer?: (value: any) => string[];
    Editor?: any;
}

function findScheduler(name: string) {
    return Schedulers.filter(s => s.name === name)[0];
}

function getSectionForType(props: IClusterSectionProps): ISectionConfig {
    const section: ISectionConfig = {};
    switch (props.type) {
        case ClusterSectionType.SCHEDULER:
            section.name = "Scheduler";
            section.detailRenderer = (name: string) => {
                const scheduler = findScheduler(name);
                return [ scheduler.label, `Version ${scheduler.version}` ];
            }
            break;
        case ClusterSectionType.HEAD_NODE:
            section.name = "Head Node";
            section.valueRenderer = (node: any) => node.machineType;
            break;
        case ClusterSectionType.COMPUTE_NODE:
            section.name = "Head Node";
            section.valueRenderer = (node: any) => node.machineType;
            break;
        default:
            section.name = "Undefined";
    }
    section.Editor = createEditor(props.editor);
    return section;
}

export default function ClusterSection(props: IClusterSectionProps) {
    const config: ISectionConfig = getSectionForType(props);
    const [editPanelShown, toggleEditPanel] = useState(false);
    const getSectionDetails = () => {
        if (props.details) {
            return props.details;
        }
        if (config.detailRenderer) {
            return config.detailRenderer(props.value);
        }
        return null;
    }

    const details = getSectionDetails();
    const showEditPanel = () => toggleEditPanel(true);
    const hideEditPanel = () => toggleEditPanel(false);
    const saveAndCloseEditPanel = () => {
        props.onSave();
        hideEditPanel();
    };
    const renderValue = (value: any) => {
        if (config.valueRenderer) {
            return config.valueRenderer(value);
        }
        return value;
    }

    return (
        <div className="ClusterSection ms-Grid-col ms-lg4 ms-md6 ms-sm12">
            <h2 className="ClusterSection-label">{config.name}</h2>
            <div className="ClusterSection-content ms-bgColor-neutralLight">
                <div className="ClusterSection-edit">
                    <IconButton
                        styles={{ root: { backgroundColor: "transparent" }}}
                        iconProps={{ iconName: "Edit" }}
                        aria-label="Edit cluster section"
                        onClick={showEditPanel}/>
                </div>
                <div className="ClusterSection-value">
                    {renderValue(props.value)}
                </div>
                {details && details.map(
                    (detail, i) => <div key={`detail-${i}`}
                        className="ClusterSection-detail">{detail}</div>)}
            </div>
            <config.Editor
                isOpen={editPanelShown}
                onDismiss={hideEditPanel}
                onSave={saveAndCloseEditPanel}
                headerText={`Edit ${config.name}`}
                value={props.value}
            />
        </div>
    );
}