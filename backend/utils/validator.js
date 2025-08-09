const validateEmail = (email) => {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};


const validateMobile = (mobile) => {
    let regex = /^\d{10}$/;
    return regex.test(mobile);
};

export default{
    validateEmail,
    validateMobile
}