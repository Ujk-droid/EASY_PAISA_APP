#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
console.log(chalk.yellow("=============================="));
console.log(chalk.green("$*$*$*$*EASY PAISA APP*$*$*$*$"));
console.log(chalk.yellow("==============================="));
let pin = "99999"; // Ensure pin is a string for comparison
console.log(chalk.green(`*********The pin code is ${pin}*********`));
let amount = 10000;
let ans = await inquirer.prompt([
    {
        name: "pin",
        type: "input",
        message: "Enter your five digit pin code",
    }
]);
if (ans.pin === pin) {
    console.log(chalk.yellow(`Correct pin code`));
    while (true) {
        let options = await inquirer.prompt([
            {
                name: "ans",
                type: "list",
                message: "Please select any option",
                choices: ["check balance", "send money", "bill payments", "easy load", "exit"]
            }
        ]);
        if (options.ans === "check balance") {
            console.log(chalk.yellow(`Your available balance is ${amount}`));
        }
        else if (options.ans === "send money") {
            let sendTo = await inquirer.prompt([{
                    name: "send",
                    type: "list",
                    message: "Please select an option to send money",
                    choices: ["easypaisa", "bank transfer", "cnic transfer"]
                }]);
            if (sendTo.send === "easypaisa") {
                let num = await inquirer.prompt([{
                        type: "input",
                        name: "rcvr",
                        message: "Please enter receiver mobile number"
                    }, {
                        type: "number",
                        name: "money",
                        message: "Please enter amount to send"
                    }]);
                if (num.money > amount) {
                    console.log(chalk.yellow(`Sorry! Your available balance is ${amount}`));
                }
                else {
                    amount -= num.money;
                    console.log(chalk.yellow(`You have successfully transferred ${num.money}rs. Your new balance is ${amount}rs`));
                }
            }
            else if (sendTo.send === "bank transfer") {
                let bankName = await inquirer.prompt([
                    {
                        type: "list",
                        name: "bank",
                        message: "Please select a bank for transfer",
                        choices: ["UBL", "HBL", "Habib Bank", "Bank Al Habib", "Bank Alfalah", "Dubai Islamic Bank", "Faisal Bank", "Allied Bank", "Meezan Bank"]
                    }, {
                        type: "number",
                        name: "cash",
                        message: "Enter an amount to transfer"
                    }
                ]);
                if (bankName.cash > amount) {
                    console.log(chalk.yellow(`Sorry! You have insufficient balance. Your available balance is ${amount}`));
                }
                else {
                    amount -= bankName.cash;
                    console.log(chalk.yellow(`You have successfully transferred ${bankName.cash}rs to ${bankName.bank}. Your new balance is ${amount}rs`));
                }
            }
            else if (sendTo.send === "cnic transfer") {
                let cnc = await inquirer.prompt([{
                        type: "input",
                        name: "nic",
                        message: "Enter CNIC number to send money"
                    }, {
                        type: "number",
                        name: "amt",
                        message: "Enter an amount to send"
                    }]);
                if (cnc.amt > amount) {
                    console.log(chalk.yellow(`Sorry! You have insufficient balance. Your available balance is ${amount}`));
                }
                else {
                    amount -= cnc.amt;
                    console.log(chalk.yellow(`You have successfully transferred ${cnc.amt}rs to CNIC ${cnc.nic}. Your new balance is ${amount}rs`));
                }
            }
        }
        else if (options.ans === "bill payments") {
            let bill = await inquirer.prompt([{
                    name: "bill",
                    type: "list",
                    message: "Please select an option for bill payments",
                    choices: ["KE", "Sui Gas", "Water and Sewerage"]
                }, {
                    name: "amount",
                    type: "confirm",
                    message: "Your bill is 10000. Do you want to pay?"
                }]);
            if (bill.amount) {
                amount -= 10000;
                console.log(chalk.yellow(`Your ${bill.bill} bill is paid. Your new balance is ${amount}rs`));
            }
        }
        else if (options.ans === "easy load") {
            let easyLoad = await inquirer.prompt([{
                    name: "num",
                    type: "input",
                    message: "Please enter a number for easy load"
                }, {
                    name: "load",
                    type: "number",
                    message: "Enter amount for easy load"
                }]);
            if (easyLoad.load > amount) {
                console.log(chalk.yellow(`Sorry, you have insufficient balance. Your balance is ${amount}rs`));
            }
            else {
                amount -= easyLoad.load;
                console.log(chalk.yellow(`Easy load successful. Your new balance is ${amount}rs`));
            }
        }
        else if (options.ans === "exit") {
            console.log(chalk.yellow("Thank you for using Easy Paisa App!"));
            break;
        }
    }
}
else {
    console.log(chalk.yellow(`Sorry! You entered an invalid pin code`));
}
