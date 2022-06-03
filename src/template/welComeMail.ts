export default function signupMail(
  fullname: string,
  mail: string,
  otp: number
) {
  return `
   <h5> Dear ${fullname}</h5>

   <p> We are very happy to have in our family Mr/Miss ${fullname}
    Kinldy verify your email ${mail} and otp ${otp} <br> or <br> through the given link you are able to verify your email 
    </p>                  
    
    <h5>Regards</h5>
    <h5>Your Bank</h5>

    `;
}
