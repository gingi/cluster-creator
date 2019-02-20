import { Icon, IconButton } from "office-ui-fabric-react";
import * as React from "react";
import { useState } from "react";
import "./ClusterSection.css";
import createEditor from "./ClusterSectionEditor";
import Cluster from "./models/Cluster";
import MachineTypes from "./models/MachineTypes";
import Schedulers from "./models/Schedulers";


export enum ClusterSectionType {
    SCHEDULER = "Scheduler",
    HEAD_NODE = "Head Node",
    COMPUTE_NODE = "Compute Node"
}

export interface IClusterSectionProps {
    cluster: Cluster;
    type: ClusterSectionType;
    value: any;
    details?: string[];
    onEdit: (values: any) => void;
    editor?: any;
}

function getSectionHelper(props: IClusterSectionProps): SectionHelper {
    let section: SectionHelper;
    switch (props.type) {
        case ClusterSectionType.SCHEDULER:
            section = new SchedulerSectionHelper(props);
            break;
        case ClusterSectionType.HEAD_NODE:
            section = new NodeSectionHelper(props, "Head Node", "TVMonitor");
            break;
        case ClusterSectionType.COMPUTE_NODE:
            section = new NodeSectionHelper(props, "Compute Node", "Stack");
            break;
        default:
            throw new Error(`No such section type ${props.type}`);
    }
    return section;
}

export default function ClusterSection(props: IClusterSectionProps) {
    const helper: SectionHelper = getSectionHelper(props);
    const [editPanelShown, toggleEditPanel] = useState(false);

    const details = helper.renderDetails(props.value);
    const showEditPanel = () => toggleEditPanel(true);
    const hideEditPanel = () => toggleEditPanel(false);
    const saveAndCloseEditPanel = (values: any) => {
        props.onEdit(values);
        hideEditPanel();
    };

    const Editor = helper.editor();
    const iconName = helper.icon();

    return (
        <div className="ClusterSection ms-Grid-col ms-lg6 ms-md6 ms-sm12">
            <h2 className="ClusterSection-label">{helper.name()}</h2>
            <div className="ClusterSection-container ms-bgColor-neutralLight">
                {iconName &&
                    <div className="ClusterSection-icon">
                        <Icon iconName={iconName} />
                    </div>
                }
                <div className="ClusterSection-edit">
                    <IconButton
                        styles={{ root: { backgroundColor: "transparent" }}}
                        iconProps={{ iconName: "Edit" }}
                        aria-label="Edit cluster section"
                        onClick={showEditPanel}/>
                </div>
                <div className="ClusterSection-content">
                    <div className="ClusterSection-value">
                        {helper.renderValue(props.value)}
                    </div>
                    {details.map(
                        (detail, i) => <div key={`detail-${i}`}
                            className="ClusterSection-detail">{detail}</div>)}
                </div>
            </div>
            <Editor
                isOpen={editPanelShown}
                onDismiss={hideEditPanel}
                onSave={saveAndCloseEditPanel}
                headerText={`Edit ${helper.name()}`}
                value={props.value}
            />
        </div>
    );
}

abstract class SectionHelper {
    protected props: IClusterSectionProps;
    protected sectionEditor: any;
    constructor(props: IClusterSectionProps) {
        this.props = props;
        this.sectionEditor = createEditor(props.editor);
    }
    public renderDetails(value: string): string[] { return []; }
    public renderValue(value: string) { return value; }
    public editor() { return this.sectionEditor; }
    public abstract name(): string;
    public icon(): string | undefined { return undefined; }
}

// tslint:disable-next-line: max-classes-per-file
class SchedulerSectionHelper extends SectionHelper {
    private static findScheduler(id: string) {
        return Schedulers.filter(s => s.id === id)[0];
    }
    public name() {
        return "Scheduler";
    }
    public renderDetails(id: string): string[] {
        const scheduler = SchedulerSectionHelper.findScheduler(id);
        if (scheduler) {
            return [ scheduler.label, `Version ${scheduler.version}` ];
        } else {
            return [];
        }
    }
    public renderValue(id: string) {
        const scheduler = SchedulerSectionHelper.findScheduler(id);
        if (scheduler) {
            return scheduler.name;
        }
        return id;
    }
}

// tslint:disable-next-line: max-classes-per-file
class NodeSectionHelper extends SectionHelper {
    private static findMachineType(name: string): any {
        return MachineTypes.filter(mt => mt.name === name)[0];
    }
    private sectionName: string;
    private sectionIcon: string;
    constructor(props: IClusterSectionProps, name: string, icon: string) {
        super(props);
        this.sectionName = name;
        this.sectionIcon = icon;
    }
    public name() { return this.sectionName; }
    public renderValue(node: any) { return node.machineType };
    public renderDetails(node: any): string[] {
        const machineType = NodeSectionHelper.findMachineType(node.machineType);
        return [ `${machineType.cores} vCPUs`, `${machineType.memory} GB RAM` ];
    }
    public icon(): string | undefined { return this.sectionIcon; }
}