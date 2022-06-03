export default function  userAccount(fullname: string, email:string, accounNumber:string, ) {
return `
    Dear ${fullname}
    Thank you to choosing our Bank Kinldy find the accound Details given below

    ${email}
    ${accounNumber}
    
    Regards
    Bank
`
}