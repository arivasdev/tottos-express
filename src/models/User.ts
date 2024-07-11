import { UserInterface } from "@/interfaces/user.interface";

export class User implements UserInterface {
    id: string;
    created_on: string;
    name: string;
    email: string;
    constructor(id: string, created_on: string, name: string, email: string) {
        this.id = id;
        this.created_on = created_on;
        this.name = name;
        this.email = email;
    }
}

