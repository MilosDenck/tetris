import { useState } from "react"
import { produce, immerable } from "immer";


export class Tetromino {
    [immerable] = true
    stones: Coordinates[];
    type: number
    center: number

    constructor(type: number){
        this[immerable] = true
        this.type = type
        if(type === 0){
            this.stones = [{x: 3, y: 1}, {x: 4, y: 1},{x: 5, y: 1},{x: 6, y: 1}]
            this.center = 1
        }else if(type === 1){
            this.stones = [{x: 3, y: 0}, {x: 4, y: 0},{x: 4, y: 1},{x: 5, y: 1}]
            this.center = 2
        }else if(type === 2){
            this.stones = [{x: 3, y: 1}, {x: 4, y: 1},{x: 4, y: 0},{x: 5, y: 0}]
            this.center = 2
        }else if(type === 3){
            this.stones = [{x: 3, y: 1}, {x: 4, y: 1},{x: 5, y: 1},{x: 4, y: 0}]
            this.center = 1
        }else if(type == 4){
            this.stones = [{x: 4, y: 1}, {x: 5, y: 1},{x: 4, y: 0},{x: 5, y: 0}]
            this.center = 0
        }else if(type == 5){
            this.stones=[{x: 3, y: 0}, {x: 3, y: 1},{x: 4, y: 1},{x: 5, y: 1}]
            this.center=2
        }else{
            this.stones=[{x: 3, y: 1}, {x: 4, y: 1},{x: 5, y: 1},{x: 5, y: 0}]
            this.center=2
        }
        console.log("new instance of tetromino created")
    }

    clone = (): Tetromino => {
        const newTetronino = new Tetromino(this.type)
        newTetronino.stones = this.stones.map(stone => {return {x: stone.x, y: stone.y}})
        return newTetronino
    }
    
    moveLeft = (field: number[][]) => {
        if(this.isMoveLeftPossible(field)){
            this.stones.forEach(stone => stone.x--)
        }
    }

    moveRight = (field: number[][]) => {
        if(this.isMoveRightPossible(field)){
            this.stones.forEach(stone => stone.x++)
        }
    }

    moveDown = () => {
        this.stones.forEach(stone => stone.y++)
    }

    rotate = (field: number[][]) => {
        if(this.type === 4) return

        let temp = this.stones.map(stone => {
            const rotatedx = stone.y - this.stones[this.center].y + this.stones[this.center].x
            const rotatedy = this.stones[this.center].y-(stone.x - this.stones[this.center].x)
            return{x: rotatedx, y: rotatedy}
        })
        // if(this.type === 0){
        //     if(this.center === 1) this.center = 2
        //     if(this.center === 2) this.center = 1
        // }
        while(temp.some(stone => stone.x < 0)){
            temp.forEach(stone => stone.x++)
        }
        while(temp.some(stone => stone.x > 9)){
            temp.forEach(stone => stone.x--)
        }
        while(temp.some(stone => stone.y < 0)){
            temp.forEach(stone => stone.y++)
        }
        const overlaping = temp.find(stone => field[stone.y][stone.x]===1)
        if(overlaping){
            if(temp.filter( stone => field[stone.y][stone.x]===1).length > 1) return
            const notovlp = temp.find(stone => field[stone.y][stone.x]===0)
            if(!notovlp) return
            if(overlaping.x > notovlp.x) temp.forEach(stone => stone.x--)
            else temp.forEach(stone => stone.x++)
        }

        this.stones = temp
    }

    isMoveLeftPossible = (field: number[][]): boolean => {
        if (this.stones.some(stone => stone.x === 0)) return false
        if (this.stones.some(stone => field[stone.y][stone.x-1] === 1)) return false
        return true
    }

    isMoveRightPossible = (field: number[][]): boolean => {
        if (this.stones.some(stone => stone.x === 9)) return false
        if (this.stones.some(stone => field[stone.y][stone.x+1] === 1)) return false
        return true
    }

    isMoveDownPossible = (field: number[][]): boolean => {
        if (this.stones.some(stone => stone.y > 18)) return false
        if (this.stones.some(stone => field[stone.y+1][stone.x] === 1)) return false
        return true
    }

    isGameLost = (field: number[][]):boolean => {
        return this.stones.some(stone => field[stone.y][stone.x]==1)
    }
}



type Coordinates = {
    x: number,
    y: number
}