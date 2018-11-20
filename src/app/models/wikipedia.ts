export class Wikipedia {
    word: string;
    description: string;
    link:string;
    constructor(
        word: string,
        description: string,
        link:string) {
        this.word = word;
        this.description = description;
        this.link = link;
    }
}
