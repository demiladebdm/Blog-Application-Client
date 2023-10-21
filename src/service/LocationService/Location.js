const URL = process.env.REACT_APP_API_URL;

// ***** Get IP Adress
export const IpAddress = async ({ setLoading, setIPData }) => {
  try {
    let response = await fetch(
      `http://api.ipstack.com/check?access_key=${process.env.REACT_APP_IP_ADRRSS_API_KEY}`
    );
    let data = await response.json();

    if (response.ok) {
      setLoading(false);
      setIPData(data.country_name);
    }
  } catch (error) {
    alert(`IP Adress Error: ${error}`);
    setLoading(false);
  }
};

// ****** Get Countries
export const GetCountries = async ({ setLoading, setCountries }) => {
  try {
    let response = await fetch(
      `https://api.apilayer.com/number_verification/countries`,
      {
        headers: {
          apikey: process.env.REACT_APP_NUMBER_VALIDATE_API_KEY,
        },
      }
    );
    let data = await response.json();

    if (response.ok) {
      setLoading(false);
      setCountries(data);
    }
  } catch (error) {
    alert(error.message);
    setLoading(false);
  }
};

// ***** Validate number
export const ValidateNumber = async ({
  phoneFull,
  setButtonLoad,
  setValidate,
}) => {
  try {
    setButtonLoad(true);
    let response = await fetch(
      `https://api.apilayer.com/number_verification/validate?number=${phoneFull}`,
      {
        headers: {
          apikey: process.env.REACT_APP_NUMBER_VALIDATE_API_KEY,
        },
      }
    );
    let data = await response.json();

    if (response.ok) {
      setButtonLoad(false);
      setValidate(data);
    }
  } catch (error) {
    alert(error.message);
    setButtonLoad(false);
  }
};

// ******* Send message
export const SendMessage = async ({
  fullName,
  email,
  phone,
  message,
  setSend,
}) => {
  try {
    const datas = { fullName, email, phone, message };
    let response = await fetch(`${URL}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    });

    let data = await response.json();

    if (response.ok) {
      setSend(data);
    }
  } catch (error) {
    alert(error.message);
  }
};
