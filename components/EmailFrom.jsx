import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

function EmailForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSubjectChange = (a) => setSubject(a.target.value);
  const handleMessageChange = (b) => setMessage(b.target.value);

  const emailError = email === "";
  const subjectError = subject === "";
  const messageError = message === "";

  return (
    <FormControl
      bg="white"
      textAlign="center"
      padding="5"
      isInvalid={emailError || subjectError || messageError}
      boxShadow="dark-lg"
    >
      <FormLabel htmlFor="subject">Subject</FormLabel>
      <Input
        id="subject"
        type="subject"
        value={subject}
        onChange={handleSubjectChange}
        placeholder="Subject"
      />
      {!subjectError ? (
        <FormHelperText>Enter Subject.</FormHelperText>
      ) : (
        <FormErrorMessage>Subject is required.</FormErrorMessage>
      )}
      <FormLabel htmlFor="recipient-email">Email</FormLabel>
      <Input
        id="recipient-email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Recipient's Email"
      />
      {!emailError ? (
        <FormHelperText>Enter the recipients email.</FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
      <FormLabel htmlFor="message">Message</FormLabel>
      <Textarea
        id="message"
        type="message"
        value={message}
        onChange={handleMessageChange}
        placeholder="Type your message here."
      />
      {!messageError ? (
        <FormHelperText>Enter a message..</FormHelperText>
      ) : (
        <FormErrorMessage>Message is required.</FormErrorMessage>
      )}
      <Button
        mt={4}
        colorScheme="green"
        // isLoading={props.isSubmitting}
        type="submit"
      >
        Send Email
      </Button>
    </FormControl>
  );
}
export default EmailForm;
