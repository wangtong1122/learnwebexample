// declare var jQuery:(selector:string)=>any
// jQuery('sss')
let tom: [string, number] = ['Tom', 25];
console.log(tom[1])
const enum Directions {
    Up,
    Down,
    Left,
    Right
}
console.log(Directions.Down)

type nenum = number
let xx:nenum = 10;
type useObje = {name:string}
type getName = ()=>string
type data=[number,number]
type numOrFunc = nenum|getName
interface IMa{
    name:string
    getName:()=>string
}

const au:IMa={
    name: 'eqeqqe',
    getName: function (): string {
        return this.name
    }
}
console.log('sss',au.getName())