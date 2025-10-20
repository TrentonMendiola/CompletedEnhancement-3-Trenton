//Define client interface
export interface Client {
    //each client will have a name, choice (either 1 or 2), and id string
    name: string;
    choice: '1' | '2';
    _id?: string;
}

//Reference
//https://www.mongodb.com/resources/languages/mean-stack-tutorial By MongoDB