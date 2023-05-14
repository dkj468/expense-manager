export const getErrorFromCode = (errorCode) => {
  switch (errorCode) {
    case "EMAIL_NOT_VERIFIED":
      return "Your email id is not verified. Please check your inbox for verification email or contact the support team";
    case "auth/email-already-in-use":
      return "The email address is already in use by another account.";
    default:
      return "An unknown error";
  }
};
