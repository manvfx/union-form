# @union/form

`@union/form` is a dynamic form component for React with TypeScript and Tailwind CSS. It allows you to create flexible and configurable forms with built-in validation.

## Features

- **Dynamic Form Rendering:** Define fields and their properties dynamically.
- **Built-in Validation:** Easily add validation rules for each field.
- **Conditional Rendering:** Render fields based on the state of other fields.
- **Styled with Tailwind CSS:** Easily customize the appearance using Tailwind CSS classes.

## Installation

Install the package via npm:

```bash
npm install @union/form
```

## Usage
Here is an example of how to use the UnionForm component in a React application:

```bash

import React, { useState } from 'react';
import { DynamicForm, FormFieldIdentifier } from '@union/form';

const App: React.FC = () => {
  const [formState, setFormState] = useState({
    firstName: 'Amin Najafi',
    age: 36,
    address: 'New York!',
  });

  const [validations, setValidations] = useState({});
  const [isValid, setIsValid] = useState(false);

  const fields = [
    {
      key: 'firstName',
      identifier: FormFieldIdentifier.TEXT,
      label: 'First Name',
      preemptWidth: 6,
      locale: {
        en: { message: 'First Name' },
        fa: { message: 'نام' },
      },
      rules: [
        {
          criteria: { $ne: 'Bye' },
          message: 'First name must not be Bye!',
        },
        (v) => v === 'Hello' || 'First name must be Hello!',
      ],
    },
    {
      key: 'lastName',
      identifier: FormFieldIdentifier.TEXT,
      label: 'Last Name',
      preemptWidth: 6,
      locale: {
        en: { message: 'Last Name' },
        fa: { message: 'نام خانوادگی' },
      },
    },
    // Add other fields as necessary
  ];

  return (
    <UnionForm
      target={formState}
      fields={fields}
      onUpdateValidations={setValidations}
      onUpdateIsValid={setIsValid}
      locale="fa" // Change to "en" for English
    />
  );
};

export default App;

```