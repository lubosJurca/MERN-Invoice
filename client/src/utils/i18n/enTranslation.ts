const enTranslation = {
  translation: {
    toast: {
      testUserToast: 'Welcome Test User! You can now explore the app!',
      logoutToast: 'You have been logged out!',
      createInvoiceToastSuccess: 'Invoice created successfully!',
      invoiceErrorToast: 'Something went wrong',
      markAsPaidToast: 'Invoice marked as paid successfully',
      editInvoiceToast: 'Invoice updated successfully',
      deleteInvoiceToast: 'Invoice deleted successfully',
      registerUserToast: 'User registered successfully',
      loginUserToast: 'User logged in successfully',
      loginErrorToast: "User doesn't exist or password is incorrect",
      userAlreadyExistsToast: 'User already exists',
    },
    welcomePage: {
      h1: 'Control Your Invoices',
      span: 'Easily And Efficiently',
      p: 'Effortlessly create, manage, and track your invoices with our all-in-one invoicing tool. Perfect for businesses of all sizes.',
    },
    registerUserForm: {
      title: 'Register User',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      registerBtn: 'Register',
      p: 'Already have an account?',
      link: 'Login',
    },

    loginUserForm: {
      title: 'Login',
      password: 'Password',
      loginBtn: 'Login',
      p: 'Not a member yet?',
      link: 'Register',
    },
    dataTable: {
      created: 'Created',
      dueDate: 'Due Date',
      name: 'Name',
      amount: 'Amount',
    },

    status: {
      pending: 'Pending',
      paid: 'Paid',
      draft: 'Draft',
    },
    footer: {
      p: 'Copyright © 2024 Lubos Jurca. All rights reserved.',
    },

    filterBtns: {
      all: 'All',
      paid: 'Paid',
      pending: 'Pending',
      draft: 'Draft',
    },

    detailPage: {
      buttons: {
        edit: 'Edit',
        delete: 'Delete',
        markAsPaid: 'Mark As Paid',
        markAsPaidShort: 'Paid',
        goBack: 'Go Back',
      },
      error: 'There was an error. Please try again.',
      invoiceDate: 'Invoice Date',
      paymentDue: 'Payment Due',
      billTo: 'Bill To',
      sentTo: 'Sent To',
      grandTotal: 'Grand Total',
      itemTable: {
        name: 'Item Name',
        quantity: 'QTY.',
        price: 'Price',
        total: 'Total',
        caption: 'A list of your items in the invoice.',
      },
    },

    buttons: {
      testUser: 'Test User',
      register: 'Register',
      login: 'Login',
      newInvoiceBtn: 'New Invoice',
      newInvoiceBtnShort: 'New',
      logout: 'Logout',
    },

    noInvoiceComponent: {
      h2: 'There is nothing here',
      pFirst: 'Create a new invoice by clicking the ',
      pLast: 'button and get started',
    },

    form: {
      editInvoiceTitle: 'Edit Invoice',
      editFormBtn: 'Edit & Save',
      title: 'New Invoice',
      billFrom: {
        title: 'Bill From',
        streetAddress: 'Street Address',
        city: 'City',
        postCode: 'Post Code',
        country: 'Country',
      },
      billTo: {
        title: 'Bill To',
        name: 'Name',
        email: 'Email',
        streetAddress: 'Street Address',
        city: 'City',
        postCode: 'Post Code',
        country: 'Country',
      },
      invoiceDate: 'Invoice Date',
      paymentTerms: 'Payment Terms',
      description: 'Description',
      pickADate: 'Pick A Date',
      selectStatus: 'Select Status',
      selectTerms: 'Select Terms',
      itemTable: {
        name: 'Name',
        price: 'Price',
        placeholder: 'Item Name',
        quantity: 'Quantity',
        addItemBtn: 'Add Item',
        total: 'Total',
        noItems: 'No items added yet.',
        btnMessage: 'You must add at least one item to create an invoice.',
        cancelBtn: 'Cancel',
        submitBtn: 'Create New Invoice',
        totalPrice: 'Total Price',
        noItemsAdded: 'No Items Added',
      },
      paymentTermsDays: {
        oneDay: '1 Day',
        sevenDays: '7 Days',
        thirtyDays: '30 Days',
      },
    },

    displayInvoices: {
      invoices_zero: 'No Invoices',
      invoices_one: 'There is 1 invoice total.',
      invoices_two: 'There are 2 invoices total.',
      invoices_three: 'There are 3 invoices total.',
      invoices_four: 'There are 4 invoices total.',
      invoices_other: 'There are {{count}} invoices total.',
    },
  },
};

export default enTranslation;
