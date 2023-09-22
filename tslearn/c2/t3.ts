interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};

interface Person1 {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom1: Person1 = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

console.log(tom1.id)
