#! /usr/bin/env node

import inquirer from "inquirer"
import {differenceInSeconds, setSeconds} from "date-fns"
import chalk from "chalk"

const response = await inquirer.prompt([
    {
        type : "number",
        name : "userInput",
        message : "Please enter the seconds:",
        validate : (input)=>{
            if (isNaN(input)) {
                return "Please enter the valid seconds in number"
            }
            else if (input > 60) {
                return "Seconds must be less than or equals to 60"
            } 
            else {
                return true;
            }
        }
    }
]);

let input = response.userInput;

function startTimer(value : number) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + value);
    //To get the time in correct format
    const intervalTime = new Date(initialTime);             

    setInterval((()=>{
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(intervalTime, currentTime);

        if (timeDifference <= 0) {
            console.log(chalk.italic.bold.redBright("TIMER IS EXPIRED!"));
            process.exit();
        }

        const min = Math.floor(timeDifference % (3600 * 24) / 3600);
        const sec = Math.floor(timeDifference % 60);

        console.log(`${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`);
    }),1000)
}

startTimer(response.userInput);