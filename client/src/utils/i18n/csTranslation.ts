const csTranslation = {
  registerUserForm: {
    username: 'Uživatelské jméno',
    email: 'Email',
    password: 'Heslo',
    confirmPassword: 'Potvrďte heslo',
    registerBtn: 'Registrovat se',
  },
  validation: {
    invalid_type: 'Neplatný typ, očekáváno {{expected}}',
    too_small: 'Hodnota je příliš malá, minimum je {{minimum}} znaků',
    invalid_email: 'Neplatná emailová adresa',
    passwords_do_not_match: 'Hesla se neshodují',
  },
  translation: {
    toast: {
      testUserToast: 'Vítejte! Nyní mužete prozkoumat aplikaci!',
      logoutToast: 'Odhlášení proběhlo úspěšne!',
      createInvoiceToastSuccess: 'Faktura byla vytvořena!',
      invoiceErrorToast: 'Nastala chyba',
      markAsPaidToast: 'Faktura byla označena jako zaplacená!',
      editInvoiceToast: 'Faktura byla aktualizována!',
      deleteInvoiceToast: 'Faktura byla smazána!',
      registerUserToast: 'Registrace proběhla úspěšne!',
      loginUserToast: 'Přihlášení proběhlo úspěšne!',
      loginErrorToast: 'Uživatelské jméno nebo heslo je nesprávné',
      userAlreadyExistsToast: 'Uživatelské jméno již existuje.',
    },
    welcomePage: {
      h1: 'Spravujte své faktury',
      span: 'Jednoduše a efektivně',
      p: 'Snadno vytvářejte, spravujte a sledujte své faktury s naším komplexním nástrojem pro fakturaci. Ideální pro firmy všech velikostí.',
    },
    registerUserForm: {
      title: 'Registrace',
      username: 'Uživatelské jméno',
      password: 'Heslo',
      confirmPassword: 'Potvrzení hesla',
      registerBtn: 'Registrovat se',
      p: 'Už máte účet?',
      link: 'Přihlásit se',
    },

    loginUserForm: {
      title: 'Přihlášení',
      password: 'Heslo',
      loginBtn: 'Přihlásit se',
      p: 'Nemáte účet?',
      link: 'Registrace',
    },

    dataTable: {
      created: 'Vytvořeno',
      dueDate: 'Datum splatnosti',
      name: 'Název',
      amount: 'Částka',
    },

    status: {
      pending: 'Nezaplaceno',
      paid: 'Zaplaceno',
      draft: 'Návrh',
    },

    footer: {
      p: 'Copyright © 2024 Luboš Jurča. Všechna práva vyhrazena.',
    },

    filterBtns: {
      all: 'Vše',
      paid: 'Zaplaceno',
      pending: 'Nezaplaceno',
      draft: 'Návrh',
    },

    buttons: {
      testUser: 'Vyzkoušet aplikaci',
      register: 'Registrace',
      login: 'Přihlásit se',
      logout: 'Odhlásit se',
      newInvoiceBtn: 'Nová faktura',
      newInvoiceBtnShort: 'Nová',
    },

    detailPage: {
      buttons: {
        edit: 'Upravit',
        delete: 'Smazat',
        markAsPaid: 'Označit jako zaplaceno',
        markAsPaidShort: 'Zaplaceno',
        goBack: 'Zpět',
      },
      error: 'Nastala chyba. Zkuste to , prosím, znovu.',
      invoiceDate: 'Datum faktury',
      paymentDue: 'Datum splatnosti',
      billTo: 'Příjemce',
      sentTo: 'Posláno na',
      grandTotal: 'Celkem',
      itemTable: {
        name: 'Název položky',
        quantity: 'Množství',
        price: 'Částka',
        total: 'Celkem',
        caption: 'Seznam položek ve fakturě.',
      },
    },

    noInvoiceComponent: {
      h2: 'Žádná faktura nenalezena',
      pFirst: 'Vytvořte novou fakturu kliknutím na tlacítko',
      pLast: 'a můžete začít.',
    },

    form: {
      editInvoiceTitle: 'Upravit fakturu',
      editFormBtn: 'Upravit & Uložit',
      title: 'Nová faktura',
      billFrom: {
        title: 'Faktura od',
        streetAddress: 'Adresa',
        city: 'Město',
        postCode: 'PSČ',
        country: 'Země',
      },

      billTo: {
        title: 'Faktura pro',
        streetAddress: 'Adresa',
        name: 'Jméno',
        city: 'Město',
        postCode: 'PSČ',
        country: 'Země',
      },
      invoiceDate: 'Datum faktury',
      paymentTerms: 'Podmínky platby',
      description: 'Popis',
      pickADate: 'Vyberte datum',
      selectTerms: 'Vyberte podmínky',
      itemTable: {
        name: 'Název',
        price: 'Částka',
        quantity: 'Množství',
        placeholder: 'Název položky',
        addItemBtn: 'Přidat položku',
        total: 'Celkem',
        noItems: 'Pro vytvoření faktury přidejte alespoň jednu položku.',
        totalPrice: 'Celkem',
        noItemsAdded: 'Žádná položka',
        submitBtn: 'Vytvořit fakturu',
        cancelBtn: 'Zrušit',
      },
      paymentTermsDays: {
        oneDay: '1 den',
        sevenDays: '7 dnů',
        thirtyDays: '30 dní',
      },

      selectStatus: 'Vyberte status',
    },

    displayInvoices: {
      invoices_zero: 'Žádné faktury ',
      invoices_one: 'Nalezena 1 faktura.',
      invoices_two: 'Nalezeny 2 faktury.',
      invoices_three: 'Nalezeny 3 faktury.',
      invoices_four: 'Nalezeny 4 faktury.',
      invoices_other: 'Nalezeno {{count}} faktur.',
    },
  },
};

export default csTranslation;
