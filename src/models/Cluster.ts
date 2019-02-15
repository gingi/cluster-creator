import Schedulers from "./Schedulers";

const Defaults = {
    defaultComputNodes: [
        { machineType: "H16R" }
    ],
    defaultHeadNodes: [
        { machineType: "DSv3" }
    ],
    defaultScheduler: Schedulers[0].name,
}

export interface INode {
    machineType: string;
}

export default class Cluster {
    public name: string;
    public category: string;
    public scheduler: string;
    public headNodes: INode[];
    public computeNodes: INode[];

    constructor() {
        this.scheduler = Defaults.defaultScheduler;
        this.headNodes = Defaults.defaultHeadNodes;
        this.computeNodes = Defaults.defaultComputNodes;
    }
}