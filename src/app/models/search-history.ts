export class SearchHistory {
    timestamp: string;
    activity: string;
    content: string;

    constructor(timestamp: string, activity: string, content: string) {
        this.timestamp = timestamp;
        this.content =content;
        this.activity = activity;
    }
}