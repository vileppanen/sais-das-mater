
export interface Command {
    name: string;
    handler:(...args: any[]) => any;
}