import { ClusterNodeType, IClusterNode, ISubnet } from "./Cluster";

export default class Subnet implements ISubnet {
    public name: string;
    public nodes: IClusterNode[] = [];
    public nodeArrays: IClusterNode[] = [];
    constructor(name: string) {
        this.name = name;
    }
    public getByType(type: ClusterNodeType): IClusterNode[] {
        switch(type) {
            case ClusterNodeType.NODE:
                return this.nodes;
            case ClusterNodeType.NODE_ARRAY:
                return this.nodeArrays;
            default:
                return [];
        }
    }
}