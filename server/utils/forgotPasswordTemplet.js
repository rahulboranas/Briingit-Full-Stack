const forgotPasswordTemplet = ({name , otp})=>{
    return `
    <div> 
    <p>Dear, ${name}</p>
    <p>You'r requested a password reset. Please use the following OTP code to reset your password. </p>
      <div style="background-color: yellow;">${otp}</div>
    <p>This is valid for 1 hour only. Enter this otp in the binkeyit website to proceed with resetting your password.</p>
    <br/></br>
    <p>Thanks</p>
    <p>Binkeyit</p>
    </div>
    `
}
export default forgotPasswordTemplet