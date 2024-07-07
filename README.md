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
import { UnionForm } from '@union/form';
import { FormField } from '@union/form/dist/FormTypes';

const App: React.FC = () => {
  const [target, setTarget] = useState({
    firstName: 'Amin Najafi',
    age: 35,
    address: 'New York!',
  });

  const [validations, setValidations] = useState({});
  const [isValid, setIsValid] = useState(false);

  const fields: FormField[] = [
    {
      key: 'firstName',
      identifier: 'text',
      label: 'First Name',
      preemptWidth: 6,
      rules: [
        {
          criteria: { $ne: 'Bye' },
          message: 'First name must not be Bye!',
        },
        {
          validate: v => v === 'Hello' || 'First name must be hello!',
        },
      ],
    },
    {
      key: 'lastName',
      identifier: 'text',
      label: 'Last Name',
      preemptWidth: 6,
    },
    {
      key: 'email',
      identifier: 'text',
      label: 'Email',
      width: 6,
    },
    {
      key: 'age',
      identifier: 'number',
      label: 'Age',
      width: 6,
      rules: [
        {
          validate: v => v < 19 || 'Age must be less than 19',
        },
        {
          validate: v => v > 3 || 'Age must be more than 3',
        },
      ],
    },
    {
      key: 'previousAge',
      identifier: 'text',
      label: 'Previous Age',
      width: 6,
      rules: [
        {
          validate: v => /^\d+$/.test(v) || 'You must only enter digits',
        },
      ],
    },
    {
      vIf: { age: { $gte: 18 } },
      key: 'address',
      identifier: 'textarea',
      label: 'Address',
      width: 12,
      rows: 8,
    },
    {
      key: 'acceptance',
      identifier: 'checkbox',
      label: 'Agree to terms and conditions',
    },
    {
      vIf: { acceptance: true },
      key: 'services',
      identifier: 'checkboxes',
      label: 'Services',
      items: [
        { value: 'home1', title: 'Home 1' },
        { value: 'home2', title: 'Home 2' },
        { value: 'home3', title: 'Home 3' },
      ],
    },
  ];

  return (
    <div className="App">
      <UnionForm
        target={target}
        fields={fields}
        onUpdateValidations={setValidations}
        onUpdateIsValid={setIsValid}
      />
    </div>
  );
};

export default App;
```