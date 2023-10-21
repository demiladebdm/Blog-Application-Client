// ****** Get IP address
export const IpAddress = async ({ setLoading, setIpData }) => {
  try {
    let response = await fetch(
      `http://api.ipstack.com/check?access_key=${process.env.REACT_APP_IP_ADRRESS_API_KEY}`
    );
    let data = await response.json();

    if (response.ok) {
      setLoading(false);
      setIpData(data.country_name);
    }
  } catch (error) {
    alert(`IP address Error: ${error}`);
  }
};

// *********** Get Countries
export const GetContries = async ({ setLoading, setCountries }) => {
  try {
    let response = await fetch(
      `https://api.apilayer.com/number_verification/countries`,
      {
        headers: {
          apikey: process.env.REACT_APP_NUMBER_VELIDATE_API_KEY,
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

// *********** Send email
export const SendEmail = async ({
  fullName,
  email,
  phone,
  message,
  setSend,
}) => {
  try {
    const datas = { fullName, email, phone, message };
    let response = await fetch(`http://localhost:5000/send`, {
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
