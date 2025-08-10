const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateMobile = (mobile) => {
    let regex = /^\d{10}$/;
    return regex.test(mobile);
};

export default{
    validateEmail,
    validateMobile
}