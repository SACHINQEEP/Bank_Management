export default function signupMail(fullname:string, mail: string, otp:number){
    return `<h1>We are very happy to have in our family Mr/Miss ${fullname}</h1> 
    <p>Kinldy verify your email ${mail} and otp ${otp} </p>
    `
}