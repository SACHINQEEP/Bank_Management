export default function  userAccount(fullname: string, email:string, accounNumber:string, branch: string) {
return `
    <h1>Dear ${fullname}</h>
    <p>Thank you to choosing our Bank Kinldy find the accound Details given below</p>

    <h5>${email}</h5>
    <h5>${accounNumber}</h5>
    <h5>${branch}</h5>


    <p>Regards</p>
    <p>Bank</p>
`
}