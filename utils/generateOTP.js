function generateOTP(otpLength = 6) {
  let otp = new Array(otpLength)
    .fill(0)
    .map((i) => Math.floor(Math.random() * 9))
    .join("");

  return otp;
}

module.exports = generateOTP;
