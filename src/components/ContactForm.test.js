import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
    
});

test('renders the contact form header', ()=> {
    //arrange
    render(<ContactForm />);
    //screen.debug()
    //act
    const header = screen.getByText(/contact form/i);
    //assert
    expect(header).toBeVisible();
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    //act
    const firstNameInput = screen.getByLabelText(/first name/i);
    //console.log(firstnameInput);
    userEvent.type(firstNameInput, "Mina");
    //screen.debug()

    //assert
    expect(screen.getAllByTestId("error")).toHaveLength(1);  
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    //Arrange
    render(<ContactForm />);
    const firstNameError = screen.getByText(/firstname must have at least 5 characters/i);
    const lastNameError = screen.getByText(/lastname is a required field/i);
    const emailError = screen.getByText(/must be a valid email address/i);
    const submitButton = screen.getByRole("submitButton");

    //Act
    userEvent.click(submitButton);

    //Assert
    expect(firstNameError).toBeVisible();
    expect(lastNameError).toBeVisible();
    expect(emailError).toBeVisible();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    //arrange
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const submitButton = screen.getByRole("button");
    //act
    userEvent.type(firstNameInput, "Bailey");
    userEvent.type(lastNameInput, "Perez");
    userEvent.click(submitButton);
    //assert
    const firstNameError = screen.queryByText(/firstname must have at least 5 characters/i);
    const lastNameError = screen.queryAllByText(/lastname is a required field/i);
    const emailError = screen.getByText(/must be a valid email address/i);

    expect(firstNameError).not.toBeInTheDocument();
    expect(lastNameError).not.toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    //arrange
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email/i);
    //act
    userEvent.type(emailInput, "Doctor@BBC");
    //assert
    const errorMessage = screen.queryAllByText(/email must be a valid email address/i);
    expect(errorMessage).toBeVisible();
});

test('renders "lastName is a required field" if a last name is not entered and the submit button is clicked', async () => {
    //arrange
    render(<ContactForm />);
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button");
    //act
    userEvent.type(firstNameInput, "Bailey");
    userEvent.type(lastNameInput, "");
    userEvent.type(emailInput, "bluebird@gmail.com");
    userEvent.click(submitButton);
    //assert
    const errorMessage = screen.getAllByText(/error: lastname is a required field/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    //arrange
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole("button");
    //act
    userEvent.type(firstNameInput, "Bailey");
    userEvent.type(lastNameInput, "Perez");
    userEvent.type(emailInput, "bluebird@gmail.com");
    userEvent.type(messageInput, "");
    userEvent.click(submitButton);
    //assert
    const firstName = screen.getByTestId("firstnameDisplay");
    const lastName = screen.getByTestId("lastnameDisplay");
    const email = screen.getByTestId("emailDisplay");
    const message = screen.queryByTestId('messageDisplay');
    expect (firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    //arrange
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole("button");
    //act
    userEvent.type(firstNameInput, "Bailey");
    userEvent.type(lastNameInput, "Perez");
    userEvent.type(emailInput, "bluebird@gmail.com");
    userEvent.type(messageInput, "Bow ties are cool");
    userEvent.click(submitButton);
    //assert
    const firstName = screen.getByTestId("firstnameDisplay");
    const lastName = screen.getByTestId("lastnameDisplay");
    const email = screen.getByTestId("emailDisplay");
    const message = screen.queryByTestId('messageDisplay');
    expect (firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message).toBeInTheDocument();
});