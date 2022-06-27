import { Subject } from '../events/Subject'

export default function RequestLoan (
  email: string,
  name: string,
  brnach_name: string,
  branch_address: string,
  loan_type: string,
  request_name: string,
  request_number: string,
  user_account: string
) {
  return `
       <h5>To,<h5> 

        <h5>The Bank Manager</h5>
        <h5>${brnach_name}</h5>
        <h5>${branch_address}</h5>

        <h5>Subject: ${Subject}<h5>

        <h5>Dear ${name}</h5>
       <p> This is a request to you kindly accept my loan Request for ${loan_type} and my Loan id
        Please let me know what type of documnet you need if my loan request will be accept<p>

        <h4>Regards</h4>
        <h4>${request_name}</h4>
        <h4>${request_number}</h4>
        <h4>${user_account}</h4>
    `
}
