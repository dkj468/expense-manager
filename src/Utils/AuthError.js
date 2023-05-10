export const getErrorFromCode = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "The email address is already in use by another account.";
    default:
      return "An unknown error";
  }
};
