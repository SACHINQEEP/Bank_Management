function userAccount (fullname: string, email: string, accounNumber: string) {
  return `
    Dear ${fullname}
    Thank you to choosing our Bank Kinldy find the accound Details given below

    ${email}
    ${accounNumber}
    
    Regards
    Bank
`
}

function TransectionHistory (
  fullname: string,
  accounNumber: string,
  amountPayed: number
) {
  return `
   <h1> Dear ${fullname} </h1>

    <p>As you have requested amount ${amountPayed} form ${accounNumber} has been transfer to the given account number given 
    if you have any issues Please let us know <p>

    <h1>Regards</h1>
    <h1>Bank</h1>
    `
}

export { userAccount, TransectionHistory }
