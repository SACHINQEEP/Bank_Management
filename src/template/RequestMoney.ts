export default function RequestMoney (
  fullname: string,
  name: string,
  email: string,
  account_number: string,
  amount: number,
  otp: number
) {
  return `
<h6> Dear ${fullname} sir/ma'am,</h6>

<p> We have an Requst for Money transfer from ${name} and ${account_number} and payable amount is ${amount}. So Kindly verify the OTP give ${otp} through the given link and complite this transection.</p>


<h6>Regards</h6>
<h6>Bank Management</h6>
`
}
